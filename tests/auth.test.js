import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma, createTestUser } from './test-utils';
import { createServer } from '../src/server';

const TEST_PORT = 3001;
const API_BASE_URL = `http://localhost:${TEST_PORT}/api`;

let server;
let testUser;

describe('Auth API', () => {
  beforeAll(async () => {
    // Iniciar el servidor de prueba
    server = createServer().listen(TEST_PORT);
    
    // Crear un usuario de prueba
    testUser = await createTestUser({
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });
  });

  afterAll(async () => {
    // Cerrar el servidor de prueba
    await new Promise(resolve => server.close(resolve));
  });

  describe('POST /auth/register', () => {
    it('debería registrar un nuevo usuario exitosamente', async () => {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'nuevo@usuario.com',
          password: 'password123',
          firstName: 'Nuevo',
          lastName: 'Usuario',
        }),
      });

      expect(response.status).toBe(201);
      const data = await response.json();
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('email', 'nuevo@usuario.com');
    });
  });

  describe('POST /auth/login', () => {
    it('debería autenticar al usuario con credenciales válidas', async () => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toHaveProperty('token');
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('email', 'test@example.com');
    });

    it('debería fallar con credenciales inválidas', async () => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'contraseñaincorrecta',
        }),
      });

      expect(response.status).toBe(401);
    });
  });
});
