import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

const JWT_SECRET = env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '7d';

export function generateToken(payload: { userId: string; role: string }): string {
  return jwt.sign(
    {
      userId: payload.userId,
      role: payload.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string): { userId: string; role: string } {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
    return {
      userId: decoded.userId,
      role: decoded.role,
    };
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}
