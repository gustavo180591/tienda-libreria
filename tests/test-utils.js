import { PrismaClient } from '@prisma/client';
import { expect } from 'vitest';
import { createServer } from '../src/server';

const prisma = new PrismaClient();

// Configuración global para las pruebas
global.beforeAll(async () => {
  // Inicializar la base de datos de prueba
  await prisma.$connect();
  // Limpiar datos de prueba
  await prisma.$transaction([
    prisma.orderItem.deleteMany({}),
    prisma.order.deleteMany({}),
    prisma.productVariant.deleteMany({}),
    prisma.product.deleteMany({}),
    prisma.user.deleteMany({}),
  ]);
});

global.afterAll(async () => {
  await prisma.$disconnect();
});

// Helper para autenticación
const createTestUser = async (userData = {}) => {
  return prisma.user.create({
    data: {
      email: userData.email || `test-${Date.now()}@example.com`,
      password: userData.password || 'password123',
      firstName: userData.firstName || 'Test',
      lastName: userData.lastName || 'User',
      role: userData.role || 'CUSTOMER',
      emailVerified: userData.emailVerified ?? true,
    },
  });
};

export { prisma, createTestUser };
