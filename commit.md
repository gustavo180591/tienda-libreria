# Generador de mensaje de commit — Conventional Commits

**Objetivo**  
Redacta un mensaje de commit **conforme a Conventional Commits** a partir de la información disponible en *Source Control → Changes* (rutas de archivo y diffs).

**Salida requerida (devuelve SOLO el mensaje final, sin explicaciones ni bloques de código):**
- Primera línea (título): `<type>[optional scope]: <resumen conciso>` (≤ 72 caracteres, modo imperativo, sin punto final).
- Cuerpo: viñetas o párrafos cortos **agrupados por tipo** (`feat`, `fix`, `perf`, `refactor`, `style`, `docs`, `test`, `chore`). Indica impactos y motivación.
- Sección `BREAKING CHANGES:` **solo si aplica**, explicando qué rompe y cómo migrar.
- Footers opcionales: `Refs: #<id>`, `Closes: #<id>`, `Co-authored-by: <Nombre> <email>`.

---

## Reglas
1. **Idioma:** español técnico, directo y preciso.
2. **Tipos admitidos:** `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`, `perf`.
3. **Orden sugerido (si hay varios tipos):** `feat`, `fix`, `perf`, `refactor`, `style`, `docs`, `test`, `chore`.
4. **Scope (opcional):** deriva del módulo/carpeta principal afectado (p. ej., `book-detail`, `api`, `ui`, `build`, `db`).  
   - Si hay un módulo dominante, úsalo.  
   - Si hay cambios muy dispersos, omite el scope en el título y refleja los módulos en el cuerpo.
5. **Cuerpo:** resume el *qué* y el *por qué*; cuando sirva, indica *cómo* (p. ej., “evita crash en…”, “reduce renders…”, “uniforma estilos…”).
6. **Longitud:** líneas razonables (ideal ~72–100 chars). Sin adornos ni prosa innecesaria.

## Heurísticas para clasificar
- **feat:** nuevas funcionalidades, endpoints, props públicas, flags.  
- **fix:** bugs, errores lógicos, validaciones, nulos, errores de compilación.  
- **perf:** memoización, reducción de complejidad, lazy-load, cache.  
- **refactor:** cambios internos sin alterar comportamiento externo.  
- **style:** formato, nombres, comentarios, CSS sin impacto funcional.  
- **docs:** `.md`, comentarios de API, guías.  
- **test:** `.spec/.test`, fixtures, mocks, cobertura.  
- **chore:** tooling, `package.json`, CI, Docker, Vite, linters, deps.

## Detectar BREAKING CHANGES
Incluye la sección **solo** si hay ruptura de compatibilidad (API pública renombrada/eliminada, cambios en contratos de tipos, rutas o eventos, migraciones de datos obligatorias, configuración requerida nueva). Explica impacto y pasos de migración.

---

## Formato de salida (exacto)
<type>[optional scope]: <resumen conciso del cambio>

<Si hay múltiples tipos, organizar en secciones>
feat:

<viñeta 1 explicando la mejora y motivación/beneficio>

<viñeta 2 (opcional)>

fix:

<viñeta 1 explicando el problema y la solución>

<viñeta 2 (opcional)>

perf:

<viñeta 1 con la optimización y su efecto medible (si aplica)>

refactor:

<viñeta 1 describiendo la reestructuración sin cambios funcionales>

style:

<viñeta 1 sobre formateo/estilos sin impacto funcional>

docs:

<viñeta 1 sobre documentación actualizada o añadida>

test:

<viñeta 1 sobre pruebas añadidas/ajustadas y cobertura>

chore:

<viñeta 1 sobre tareas de mantenimiento, CI/CD, deps>

BREAKING CHANGES:

<qué rompe, por qué y cómo migrar> // incluir sección solo si aplica

Refs: <#ids opcionales>
Closes: <#ids opcionales>
Co-authored-by: <Nombre> <email> // opcional

arduino
Copiar código

**Importante:** Devuelve **solo** el mensaje final de commit (sin este prompt, sin encabezados y sin bloques de código).