¡Hecho, Gustavo! Te dejo exactamente en ese orden los archivos base para MCP. Copiá/pegá tal cual en tu repo.

1) /tools/mcp/.env.example
# === LINEAR ===
LINEAR_API_KEY=lin_api_xxx
LINEAR_TEAM_ID=TINCHO   # abreviatura/equipo destino en Linear

# === GITHUB ===
GITHUB_TOKEN=ghp_xxx
GITHUB_OWNER=tu-org-o-user
GITHUB_REPO=tincho

# === PATHS DE ARTEFACTOS ===
OPENAPI_PATH=./apps/api/openapi.yaml
PRISMA_SCHEMA_PATH=./prisma/schema.prisma
REQUIREMENTS_PATH=./docs/requisitos.md
OUTPUT_DIR=./tools/mcp/output

# === OPCIONALES ===
DEFAULT_ASSIGNEE=gustavo@ejemplo.com
DEFAULT_LABELS=feature,auto,gherkin
PROJECT_PREFIX=TIN-    # prefijo para títulos de issues

2) /tools/mcp/playbooks/backlog_from_requirements.json
{
  "$schema": "https://mcp.example/schema/playbook.v1.json",
  "name": "backlog_from_requirements",
  "description": "Genera historias Gherkin y crea issues en Linear a partir de requisitos.",
  "inputs": {
    "requirementsPath": {"default": "${REQUIREMENTS_PATH}"},
    "teamId": {"default": "${LINEAR_TEAM_ID}"},
    "assignee": {"default": "${DEFAULT_ASSIGNEE}"},
    "labels": {"default": "${DEFAULT_LABELS}"},
    "projectPrefix": {"default": "${PROJECT_PREFIX}"},
    "outputDir": {"default": "${OUTPUT_DIR}"}
  },
  "steps": [
    {
      "id": "read-reqs",
      "server": "filesystem",
      "action": "readFile",
      "args": { "path": "${requirementsPath}" },
      "out": "reqText"
    },
    {
      "id": "parse-gherkin",
      "server": "llm",
      "action": "prompt",
      "args": {
        "templatePath": "./tools/mcp/prompts/gherkin.md",
        "vars": { "requirements": "{{reqText}}" }
      },
      "out": "gherkinDoc"
    },
    {
      "id": "write-gherkin",
      "server": "filesystem",
      "action": "writeFile",
      "args": {
        "path": "${outputDir}/backlog_gherkin.md",
        "content": "{{gherkinDoc}}"
      }
    },
    {
      "id": "split-scenarios",
      "server": "llm",
      "action": "prompt",
      "args": {
        "prompt": "Del siguiente documento Gherkin, crea una lista JSON de historias, cada una con: title, description, acceptanceCriteria (array), labels (array). Documento:\n\n{{gherkinDoc}}"
      },
      "out": "storiesJson"
    },
    {
      "id": "create-issues",
      "server": "linear",
      "action": "createIssues",
      "args": {
        "teamId": "${teamId}",
        "assignee": "${assignee}",
        "labels": "${labels}",
        "stories": "{{storiesJson}}",
        "titlePrefix": "${projectPrefix}"
      },
      "out": "issueResults"
    },
    {
      "id": "save-issues",
      "server": "filesystem",
      "action": "writeFile",
      "args": {
        "path": "${outputDir}/created_issues.json",
        "content": "{{issueResults}}"
      }
    }
  ]
}

3) /tools/mcp/prompts/gherkin.md
# Objetivo
Transformar requisitos en **historias Gherkin limpias**, accionables y sin ambigüedad.

## Instrucciones para el modelo
- Sintetiza **Features** por área (Catálogo, Carrito, Checkout, Pagos, Envíos, Órdenes).
- Para cada Feature, crea **3–7 Scenarios** máximo, cada uno atómico.
- Usa **Given/When/Then** claros, con datos concretos (SKU, cantidades, moneda ARS).
- Incluye **Reglas (Rules)** cuando apliquen (p.ej., stock, moneda, validaciones).
- Añade sección **Acceptance Criteria** por Feature (bullet points verificables).
- Respeta el dominio local (Argentina, ARS, “birome/lapicera”, MP, Andreani).

## Formato de salida
- Un solo documento Markdown.
- Estructura por Feature:
  - Título (H2)
  - Contexto breve (1–2 líneas)
  - **Rules** (opcional)
  - **Scenarios** (G/W/T)
  - **Acceptance Criteria** (bullets)

## Requisitos de entrada
{{requirements}}

## Plantilla mínima
## Feature: <Nombre>
Contexto: <1–2 líneas>

Rules:
- <Regla 1>
- <Regla 2>

Scenario: <Caso atómico>
  Given <estado inicial>
  And <opcional>
  When <acción>
  Then <resultado verificable>

Acceptance Criteria:
- <criterio 1>
- <criterio 2>

4) /tools/mcp/prompts/tdd.md
# Objetivo
Generar **esqueletos de pruebas** (unit y e2e) para Carrito→Checkout→Orden, coherentes con OpenAPI y Prisma.

## Instrucciones
- Usar **Vitest** para unit y **Supertest** para e2e (API NestJS).
- Cubrir: precios `Decimal(14,2)`, `quantity > 0`, stock, currency ARS, `lineTotal = unitPrice * quantity`.
- Mockear dependencias externas (Mercado Pago, carriers) con stubs.
- Extraer endpoints desde `openapi.yaml`; tipos dominio desde `schema.prisma`.

## Entradas
- OpenAPI: {{openapiPath}}
- Prisma: {{prismaSchemaPath}}

## Archivos a generar (como ejemplo)
- `/apps/api/test/unit/cart.service.spec.ts`
- `/apps/api/test/e2e/checkout.e2e.spec.ts`
- `/apps/api/test/unit/order.total.spec.ts`

## Plantilla (unit)
```ts
import { describe, it, expect } from 'vitest';
import { calcLineTotal, calcOrderTotals } from '../../src/domain/totals';

describe('totals', () => {
  it('lineTotal = unitPrice * quantity (Decimal)', () => {
    const r = calcLineTotal('1299.90', 2);
    expect(r).toBe('2599.80');
  });
});

Plantilla (e2e)
import request from 'supertest';
import { app } from '../../src/main';

describe('Checkout E2E', () => {
  it('crea orden desde carrito guest', async () => {
    const agent = request(app.getHttpServer());
    await agent.post('/cart/items').send({ variantId: 'sku-123', quantity: 2 }).expect(201);
    const order = await agent.post('/checkout').send({ shippingAddress: {/*…*/} }).expect(201);
    expect(order.body.number).toBeDefined();
  });
});


---

### 5) `/tools/mcp/prompts/pr.md`
```md
# Plantilla de Pull Request

## ¿Qué se hizo?
- <resumen>

## Motivación
- <problema / user story / ticket>

## Cambios
- API: <endpoints, contratos>
- FE: <screens, estados>
- DB: <migraciones Prisma>
- Infra: <si aplica>

## Riesgos y mitigaciones
- <riesgo 1> → <mitigación>
- <riesgo 2> → <mitigación>

## Checklist
- [ ] Tests unit
- [ ] Tests e2e
- [ ] Lint/Typecheck
- [ ] Migraciones ejecutadas
- [ ] OpenAPI actualizado + SDK regenerado
- [ ] Screenshots/Recordings (si UI)

## Notas de release
- Added: …
- Changed: …
- Fixed: …
- Security: …

6) /tools/mcp/servers/linear.config.json y /tools/mcp/servers/github.config.json

linear.config.json

{
  "name": "linear",
  "type": "linear",
  "baseUrl": "https://api.linear.app",
  "auth": { "type": "env", "var": "LINEAR_API_KEY" },
  "defaults": {
    "teamId": "${LINEAR_TEAM_ID}"
  },
  "capabilities": ["createIssues", "updateIssue", "addComment", "listIssues"]
}


github.config.json

{
  "name": "github",
  "type": "github",
  "baseUrl": "https://api.github.com",
  "auth": { "type": "env", "var": "GITHUB_TOKEN" },
  "defaults": {
    "owner": "${GITHUB_OWNER}",
    "repo": "${GITHUB_REPO}"
  },
  "capabilities": ["createPullRequest", "commentPullRequest", "listPullRequests", "createRelease"]
}


Si tu cliente MCP requiere un manifest global, creá /tools/mcp/servers/_manifest.json:

{
  "servers": [
    { "path": "./tools/mcp/servers/linear.config.json" },
    { "path": "./tools/mcp/servers/github.config.json" },
    { "name": "filesystem", "type": "filesystem" },
    { "name": "llm", "type": "llm" }
  ]
}
