# Stack Tecnológico - Librería Arco Iris

Este documento detalla la pila tecnológica actual del sistema de gestión para Librería Arco Iris, incluyendo versiones y comandos de instalación.

## Visión General

Sistema de gestión integral para Librería Arco Iris, una tienda online especializada en artículos de librería, libros y útiles escolares con control de stock en tiempo real.

## Entorno de Desarrollo

- [x] **Node.js**: v22 LTS

```bash
# Instalar usando nvm (recomendado)
nvm install --lts
nvm use --lts
node -v
```

- [x] **npm**: última estable

```bash
npm i -g npm@latest
npm -v
```

## Frontend

- [x] **Svelte**: ^5.0.0
- [x] **SvelteKit**: ^2.0.0
- [x] **TypeScript**: ^5.6.0
- [x] **Vite**: ^6.0.0
- [x] **Tailwind CSS**: ^4.0.0
  - @tailwindcss/typography
  - @tailwindcss/forms

```bash
# Instalar dependencias frontend
npm install svelte@latest @sveltejs/kit@latest typescript@latest vite@latest
npm install -D tailwindcss@latest @tailwindcss/typography@latest @tailwindcss/forms@latest
```

## Backend

- [x] **Node.js**: ^22.0.0
- [x] **Express**: ^4.18.0
- [x] **TypeScript**: ^5.6.0
- [x] **Prisma**: ^6.0.0
- [x] **JWT**: ^9.0.0 (para autenticación)
- [x] **Bcrypt**: ^5.1.0 (para hashing de contraseñas)

```bash
# Instalar dependencias backend
npm install @prisma/client express jsonwebtoken bcrypt
npm install -D @types/express @types/jsonwebtoken @types/bcrypt
```

## Base de Datos

- [x] **PostgreSQL**: 16.0+
- [x] **Prisma ORM**: ^6.0.0
- [x] **Extensiones**:
  - CITEXT (para búsquedas case-insensitive)

```bash
# Inicializar Prisma
npx prisma generate
npx prisma migrate dev
```

## Infraestructura

- [x] **Docker**: ^24.0.0
- [x] **Docker Compose**: ^2.20.0
- [x] **Redis**: ^7.0.0 (para caché y sesiones)
- [x] **Nginx**: ^1.25.0 (como reverse proxy)

## Herramientas de Desarrollo

- [x] **ESLint**: ^9.0.0
- [x] **Prettier**: ^3.0.0
- [x] **Husky**: ^9.0.0 (para git hooks)
- [x] **Commitlint**: ^19.0.0 (para convención de commits)

```bash
# Configurar pre-commit hooks
npx husky install
npx husky add .husky/pre-commit "npm run lint"
```

## Despliegue

- **Entorno de Producción**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Monitoreo**: Prometheus + Grafana (opcional)

## Requisitos del Sistema

- **Sistema Operativo**: Linux/macOS/Windows (con WSL2)
- **Docker**: 24.0+
- **RAM Mínima**: 4GB (8GB recomendado)
- **Espacio en Disco**: 2GB libres

## Comandos Útiles

```bash
# Iniciar entorno de desarrollo
docker-compose up -d

# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente de Prisma
npx prisma generate

# Iniciar servidor de desarrollo
npm run dev
```


- [x] TanStack Query (Svelte Query): ^5.0.0

npm i @tanstack/svelte-query@latest


- [x] Zod: ^3.23.0

npm i zod@latest


- [x] Svelte adapters (según deploy):
  - [x] Vercel: @sveltejs/adapter-vercel@latest
  - [ ] Cloudflare: @sveltejs/adapter-cloudflare@latest

## Backend (API & Jobs)

- [x] NestJS: ^10.x

npm i @nestjs/common@latest @nestjs/core@latest @nestjs/platform-express@latest reflect-metadata rxjs@latest
npm i -D @nestjs/cli@latest @nestjs/schematics@latest


- [x] Prisma ORM: ^5.14.0

# CLI + client
npm i -D prisma@latest
npm i @prisma/client@latest

# Regenerar cliente
npx prisma generate


- [x] Class Validator / Transformer (DTOs):

npm i class-validator@latest class-transformer@latest


- [x] BullMQ (jobs) + Redis client:

npm i bullmq@latest ioredis@latest


- [x] Swagger/OpenAPI:

npm i @nestjs/swagger@latest swagger-ui-express@latest


- [x] Seguridad:

npm i helmet@latest cookie-parser@latest jsonwebtoken@latest argon2@latest

## Búsqueda, Datos y Automatización

- [ ] Meilisearch (SDK JS):

npm i meilisearch@latest


- [ ] n8n (operaciones / automatización): se usa como servicio Docker (ver más abajo).

- [ ] Tesseract.js (OCR en jobs o servicio dedicado):

npm i tesseract.js@latest

## Observabilidad y Calidad

- [x] Sentry (FE/BE):

# FE
npm i @sentry/svelte@latest
# BE
npm i @sentry/node@latest @sentry/profiling-node@latest


- [x] Logging (API):

npm i pino@latest pino-pretty@latest


## Testing

- [x] Testing

# Unit API/FE
npm i -D vitest@latest @vitest/coverage-v8@latest
# e2e API
npm i -D supertest@latest
# e2e FE
npm i -D playwright@latest


## Lint & Format

- [x] Lint & Format

npm i -D eslint@latest @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest eslint-plugin-svelte@latest eslint-config-prettier@latest
npm i -D prettier@latest prettier-plugin-svelte@latest prettier-plugin-tailwindcss@latest

## Infra & Contenedores (Docker)

- [x] Infra & Contenedores (Docker)

Tip: fijamos tags estables. Revisa los changelogs antes de saltar de major.

# docker-compose.yml (extracto)
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: tincho
    ports: ["5432:5432"]
    volumes: ["pgdata:/var/lib/postgresql/data"]

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  meilisearch:
    image: getmeilisearch/meilisearch:v1.7
    environment:
      MEILI_MASTER_KEY: ${MEILI_MASTER_KEY}
    ports: ["7700:7700"]
    volumes: ["meili_data:/meili_data"]

  n8n:
    image: n8nio/n8n:1.74.0
    environment:
      N8N_HOST: localhost
      N8N_PORT: 5678
    ports: ["5678:5678"]
    volumes: ["n8n_data:/home/node/.n8n"]

  api:
    build: ./apps/api
    environment:
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: ${REDIS_URL}
    ports: ["3000:3000"]
    depends_on: [postgres, redis]

  web:
    build: ./apps/web
    ports: ["5173:5173"]
    depends_on: [api]

volumes:
  pgdata:
  meili_data:
  n8n_data:


## Servicios clave y versiones recomendadas

- [x] PostgreSQL: 16-alpine
- [x] Redis: 7-alpine
- [ ] Meilisearch: v1.7
- [ ] n8n: 1.74.0 (o latest estable de tu registry)
- [x] API/WEB: build desde Dockerfile (Node 20 base)

PostgreSQL: 16-alpine

Redis: 7-alpine

Meilisearch: v1.7

n8n: 1.74.0 (o latest estable de tu registry)

API/WEB: build desde Dockerfile (Node 22 base)

Scripts de Proyecto Sugeridos (root package.json)
{
  "scripts": {
    "dev:web": "npm --prefix apps/web run dev",
    "dev:api": "npm --prefix apps/api run start:dev",
    "dev:all": "concurrently -k \"npm:dev:api\" \"npm:dev:web\"",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "lint": "eslint .",
    "format": "prettier --write .",
    "test": "vitest run",
    "test:ui": "playwright test",
    "openapi:gen": "nest build && node tools/generate-openapi-sdk.mjs"
  }
}


Añadí concurrently si querés levantar FE y BE juntos:

npm i -D concurrently@latest

Scripts de Actualización

Actualizar deps (prod y dev)

npm update
npm update --save-dev
npm i -g npm@latest
npx npm-check-updates


Post-actualización obligatoria (Prisma, FE/BE)

# Prisma
npx prisma generate
npx prisma migrate deploy

# Reinstalar y limpiar
rm -rf node_modules package-lock.json
npm i

# Verificación rápida
npm run lint
npm run test
npm run dev

Checklists por Componente
Prisma / DB

Mantener dinero en Decimal(14,2).

Correr migrate dev en local y migrate deploy en CI/CD.

Backups automáticos diarios (7/30 días).

SvelteKit / FE

Revisar Core Web Vitals al subir Vite o Svelte.

Regenerar SDK desde OpenAPI tras cambios de API.

NestJS / API

Mantener DTOs y Swagger sincronizados.

Revisar Helmet, CORS y rate-limits tras upgrades.

Meilisearch

Re-indexar catálogos tras upgrades mayores.

Revisar sinónimos (birome/lapicera/bolígrafo) y facets.

n8n

Exportar flows en JSON antes de cambio de versión.

Probar con Pin los nodos críticos post-upgrade.

Observabilidad

Sentry: versionar releases y verificar source maps.

Prometheus/Grafana: que no rompan exporters/dashboards.

Verificación Post-Actualización (End-to-End)
# 1) Infra local
docker compose up -d postgres redis meilisearch n8n

# 2) Migraciones
npm run db:deploy

# 3) Indexar búsqueda
node tools/meili-seed.mjs

# 4) Iniciar API + WEB
npm run dev:all

# 5) Pruebas
npm run test
npm run test:ui

# 6) Smoke manual
# - Crear producto/variante
# - Añadir al carrito (guest)
# - Checkout -> Orden
# - Webhook MP (sandbox)
# - Búsqueda: "lapicera", "birome"

Notas Importantes

Antes de actualizar

Rama chore/deps-YYYYMMDD

Leer breaking changes de cada paquete/contenedor

Hacer dump de DB y export de n8n flows

Después de actualizar

Correr tests (unit, e2e API/FE)

Validar Swagger y regenerar SDK FE

Reindexar Meilisearch si aplica

En caso de incidentes

Revert con git + restaurar backup DB

Volver a último tag estable de imágenes

Abrir ticket con notas (causa, fix, follow-ups)

Variables de Entorno (mínimas)
# DB & ORM
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/tincho?schema=public

# Search
MEILI_MASTER_KEY=changeme
MEILI_HTTP_ADDR=localhost:7700

# Redis / Jobs
REDIS_URL=redis://localhost:6379

# Sentry
SENTRY_DSN=<dsn>

# Auth
JWT_SECRET=<strong-secret>
COOKIE_DOMAIN=localhost

# Mercado Pago
MP_ACCESS_TOKEN=<sandbox-token>
MP_WEBHOOK_SECRET=<secret>

# n8n
N8N_HOST=localhost
N8N_PORT=5678

Política de Versionado

Semver para librerías; pin contenedores por major estable.

OpenAPI versionado (/v1, /v1.1) con SDK regenerado en CI.

Cada upgrade mayor requiere smoke plan + rollback plan.