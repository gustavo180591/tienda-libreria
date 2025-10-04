# Objetivo
Transformar requisitos en **historias Gherkin limpias**, accionables y sin ambigüedad.

## Instrucciones para el modelo
- Sintetiza **Features** por área (Catálogo, Carrito, Checkout, Pagos, Envíos, Órdenes).
- Para cada Feature, crea **3–7 Scenarios** máximo, cada uno atómico.
- Usa **Given/When/Then** claros, con datos concretos (SKU, cantidades, moneda ARS).
- Incluye **Reglas (Rules)** cuando apliquen (p.ej., stock, moneda, validaciones).
- Añade sección **Acceptance Criteria** por Feature (bullet points verificables).
- Respeta el dominio local (Argentina, ARS, "birome/lapicera", MP, Andreani).

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
