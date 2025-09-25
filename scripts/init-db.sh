#!/bin/bash
set -e

# Configurar variables de entorno
export DATABASE_URL="postgresql://postgres:postgres@localhost:5433/tienda-libreria"
export SHADOW_DATABASE_URL="postgresql://postgres:postgres@localhost:5433/tienda-libreria_shadow"

# Crear la base de datos principal si no existe
psql -h localhost -p 5433 -U postgres -d postgres -c "SELECT 1 FROM pg_database WHERE datname = 'tienda-libreria'" | grep -q 1 || \
  psql -h localhost -p 5433 -U postgres -d postgres -c "CREATE DATABASE \"tienda-libreria\";"

# Crear la base de datos shadow si no existe
psql -h localhost -p 5433 -U postgres -d postgres -c "SELECT 1 FROM pg_database WHERE datname = 'tienda-libreria_shadow'" | grep -q 1 || \
  psql -h localhost -p 5433 -U postgres -d postgres -c "CREATE DATABASE \"tienda-libreria_shadow\";"

# Ejecutar migraciones
echo "Ejecutando migraciones..."
npx prisma migrate dev --name init

echo "¡Base de datos configurada correctamente!"
