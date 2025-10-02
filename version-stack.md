# Stack Tecnológico - Versiones Recomendadas

Este documento detalla las versiones recomendadas para el stack tecnológico del proyecto y los comandos necesarios para realizar las actualizaciones.

## Entorno de Ejecución
- **Node.js**: v22.20.0 (LTS)
  ```bash
  # Actualizar Node.js (usando nvm)
  nvm install --lts
  nvm use --lts
  ```

## Dependencias Principales

### Frontend
- **Svelte**: ^5.0.0
  ```bash
  npm install svelte@latest
  ```

- **SvelteKit**: ^2.23.0
  ```bash
  npm install @sveltejs/kit@latest
  ```

- **TypeScript**: ^5.5.4
  ```bash
  npm install -D typescript@latest
  ```

- **Vite**: ^6.2.0
  ```bash
  npm install -D vite@latest
  ```

- **Tailwind CSS**: ^4.0.0
  ```bash
  npm install -D tailwindcss@latest @tailwindcss/typography@latest @tailwindcss/forms@latest
  ```

### Backend
- **Prisma**: ^5.14.0
  ```bash
  # Actualizar CLI y cliente
  npm install -D prisma@latest
  npm install @prisma/client@latest
  
  # Regenerar cliente después de actualizar
  npx prisma generate
  ```

## Herramientas de Desarrollo

- **ESLint**: ^9.18.0
  ```bash
  npm install -D eslint@latest @typescript-eslint/parser@latest @typescript-eslint/eslint-plugin@latest
  ```

- **Prettier**: ^3.4.2
  ```bash
  npm install -D prettier@latest prettier-plugin-svelte@latest prettier-plugin-tailwindcss@latest
  ```

- **ESLint plugins**:
  ```bash
  npm install -D eslint-plugin-svelte@latest eslint-config-prettier@latest
  ```

## Scripts de Actualización

Para actualizar todas las dependencias a sus últimas versiones estables:

```bash
# Actualizar dependencias de producción
npm update

# Actualizar dependencias de desarrollo
npm update --save-dev

# Actualizar globalmente
npm install -g npm@latest

# Verificar actualizaciones disponibles
npx npm-check-updates
```

## Verificación Post-Actualización

Después de actualizar, ejecuta:

```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar que todo funcione
npm run check
npm run dev
```

## Notas Importantes

1. **Antes de actualizar**:
   - Haz commit de tus cambios actuales
   - Crea una rama para las actualizaciones
   - Revisa los cambios importantes (breaking changes) en las notas de versión

2. **Después de actualizar**:
   - Ejecuta las pruebas
   - Verifica que la aplicación se compila correctamente
   - Revisa la consola del navegador en busca de advertencias o errores

3. **En caso de problemas**:
   - Consulta la documentación oficial de cada paquete
   - Revisa los issues abiertos en los repositorios oficiales
   - Si es necesario, revierte los cambios usando git

Mantén este archivo actualizado con cada cambio importante en las versiones del stack tecnológico.
