import { json, type RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const { compare } = bcrypt;
import jwt from 'jsonwebtoken';
const { sign } = jwt;
import { JWT_SECRET } from '$env/static/private';

const prisma = new PrismaClient();

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return json(
        { message: 'Email y contraseña son requeridos' },
        { status: 400 }
      );
    }

    // Find user with admin role
    const user = await prisma.user.findFirst({
      where: { 
        email,
        role: 'ADMIN' // Only allow users with ADMIN role to log in
      }
    });

    // Verify user exists and password is correct
    if (!user || !(await compare(password, user.passwordHash))) {
      return json(
        { message: 'Credenciales inválidas o no tiene permisos de administrador' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Set HTTP-only cookie with the token
    return json(
      { message: 'Inicio de sesión exitoso' },
      {
        headers: {
          'Set-Cookie': `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800` // 8 hours
        }
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return json(
      { message: 'Error en el servidor' },
      { status: 500 }
    );
  }
};
