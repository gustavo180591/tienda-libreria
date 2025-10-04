import { prisma } from '$lib/server/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { z } from 'zod';
import type { Role } from '@prisma/client';

// Esquemas de validación con Zod
const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  firstName: z.string().min(2, 'El nombre es requerido').optional(),
  lastName: z.string().min(2, 'El apellido es requerido').optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

// Configuración JWT
const JWT_SECRET = env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = env.JWT_EXPIRES_IN || '7d';

export class AuthService {
  /**
   * Registra un nuevo usuario
   */
  async register(userData: z.infer<typeof registerSchema>): Promise<App.AuthResponse> {
    try {
      // Validar datos de entrada
      const validation = registerSchema.safeParse(userData);
      if (!validation.success) {
        return {
          success: false,
          error: validation.error.issues.map(issue => issue.message).join(', ')
        };
      }

      const { email, password, firstName, lastName } = validation.data;

      // Verificar si el usuario ya existe
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return {
          success: false,
          error: 'El correo electrónico ya está en uso'
        };
      }

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Crear el usuario
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          firstName,
          lastName,
          role: 'CUSTOMER', // Rol por defecto
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });

      // Generar token JWT
      const token = this.generateToken(user);

      return {
        success: true,
        user,
        token,
      };
    } catch (error) {
      console.error('Error en el registro:', error);
      return {
        success: false,
        error: 'Error al registrar el usuario'
      };
    }
  }

  /**
   * Inicia sesión de un usuario
   */
  async login(credentials: z.infer<typeof loginSchema>): Promise<App.AuthResponse> {
    try {
      // Validar datos de entrada
      const validation = loginSchema.safeParse(credentials);
      if (!validation.success) {
        return {
          success: false,
          error: 'Credenciales inválidas'
        };
      }

      const { email, password } = validation.data;

      // Buscar usuario por email
      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          passwordHash: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });

      // Verificar si el usuario existe y la contraseña es correcta
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return {
          success: false,
          error: 'Credenciales inválidas'
        };
      }

      // Generar token JWT (sin incluir la contraseña)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...userWithoutPassword } = user;
      const token = this.generateToken(userWithoutPassword);

      return {
        success: true,
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      return {
        success: false,
        error: 'Error al iniciar sesión'
      };
    }
  }

  /**
   * Genera un token JWT
   */
  private generateToken(user: { id: string; email: string; role: Role }): string {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    
    // Asegurarse de que JWT_SECRET esté definido
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET no está definido en las variables de entorno');
    }
    
    // Usar un valor por defecto seguro para expiresIn
    const options: jwt.SignOptions = {
      expiresIn: '24h' // Valor por defecto de 24 horas
    };
    
    // Si JWT_EXPIRES_IN es un número, usarlo como segundos
    const expiresInNum = Number(JWT_EXPIRES_IN);
    if (!isNaN(expiresInNum) && expiresInNum > 0) {
      options.expiresIn = expiresInNum;
    }
    
    return jwt.sign(payload, JWT_SECRET, options);
  }

  /**
   * Verifica un token JWT
   */
  verifyToken(token: string): App.JwtPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as App.JwtPayload;
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return null;
    }
  }

  /**
   * Obtiene el usuario actual basado en el token
   */
  async getCurrentUser(userId: string) {
    try {
      return await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });
    } catch (error) {
      console.error('Error al obtener el usuario actual:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
