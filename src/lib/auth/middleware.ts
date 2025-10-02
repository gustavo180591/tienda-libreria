import { verifyToken } from './jwt';
import type { RequestEvent } from '@sveltejs/kit';

export async function authenticate(event: RequestEvent) {
  const authHeader = event.request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No se proporcionó un token de autenticación');
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const { userId, role } = verifyToken(token);
    event.locals.user = { id: userId, role };
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
}

export function authorize(event: RequestEvent, roles: string[] = []) {
  if (!event.locals.user) {
    throw new Error('No autenticado');
  }

  if (roles.length > 0 && !roles.includes(event.locals.user.role)) {
    throw new Error('No autorizado');
  }
}
