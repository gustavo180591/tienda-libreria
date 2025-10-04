# Etapa de desarrollo
FROM node:20-alpine AS development

WORKDIR /usr/src/app

# Instalar dependencias de desarrollo
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

# Copiar el resto de la aplicación
COPY . .

# Puerto expuesto para desarrollo
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Etapa de construcción para producción
FROM node:20-alpine AS builder

# Instalar dependencias de compilación necesarias
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Instalar dependencias
COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline --no-audit --progress=false

# Copiar el resto de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM --platform=linux/amd64 node:20-alpine@sha256:8b1bff8b7361fa4aecbca356353f7b402b4fd0a6ddaccb319d578297a9a8c59e AS runner

WORKDIR /usr/src/app

# Configuración de seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 && \
    chown -R nextjs:nodejs /usr/src/app

# Instalar solo dependencias de producción
ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --only=production --prefer-offline --no-audit --progress=false

# Copiar la aplicación construida desde la etapa de construcción
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/build ./build
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/node_modules ./node_modules

# Cambiar al usuario no-root
USER nextjs

# Puerto expuesto
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]