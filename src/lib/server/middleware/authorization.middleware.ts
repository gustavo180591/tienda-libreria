import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { Role } from '@prisma/client';

type AllowedRoles = Role | Role[];

/**
 * Middleware para verificar roles de usuario
 * @param event - Evento de la solicitud
 * @param allowedRoles - Rol o roles permitidos
 * @throws {Error} 403 si el usuario no tiene los permisos necesarios
 */
export function authorize(event: RequestEvent, allowedRoles: AllowedRoles): void {
  const user = event.locals.user;
  
  if (!user) {
    throw error(401, 'No autorizado: Usuario no autenticado');
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  
  if (!roles.includes(user.role)) {
    throw error(403, 'Acceso denegado: Permisos insuficientes');
  }
}

/**
 * Middleware para verificar si el usuario es el propietario del recurso
 * @param event - Evento de la solicitud
 * @param resourceOwnerId - ID del propietario del recurso
 * @param allowAdmins - Si es true, los administradores pueden acceder a cualquier recurso
 * @throws {Error} 403 si el usuario no es el propietario del recurso
 */
export function isOwner(
  event: RequestEvent, 
  resourceOwnerId: string, 
  allowAdmins = true
): void {
  const user = event.locals.user;
  
  if (!user) {
    throw error(401, 'No autorizado: Usuario no autenticado');
  }

  if (allowAdmins && user.role === 'ADMIN') {
    return; // Los administradores tienen acceso completo
  }

  if (user.id !== resourceOwnerId) {
    throw error(403, 'Acceso denegado: No eres el propietario de este recurso');
  }
}

/**
 * Middleware para verificar múltiples condiciones de autorización
 * @param event - Evento de la solicitud
 * @param options - Opciones de autorización
 * @throws {Error} 403 si no se cumple ninguna condición de autorización
 */
type AuthOptions = {
  roles?: AllowedRoles;
  isOwnerOf?: string;
  allowAdmins?: boolean;
};

export function checkAuthorization(
  event: RequestEvent,
  options: AuthOptions = {}
): void {
  const { roles, isOwnerOf, allowAdmins = true } = options;
  const user = event.locals.user;

  if (!user) {
    throw error(401, 'No autorizado: Usuario no autenticado');
  }

  // Verificar si el usuario es administrador y tiene acceso completo
  if (allowAdmins && user.role === 'ADMIN') {
    return;
  }

  // Verificar roles si se especificaron
  if (roles) {
    const requiredRoles = Array.isArray(roles) ? roles : [roles];
    if (requiredRoles.includes(user.role)) {
      return;
    }
  }

  // Verificar propiedad del recurso si se especificó
  if (isOwnerOf) {
    if (user.id === isOwnerOf) {
      return;
    }
  }

  // Si no se cumple ninguna condición de autorización
  throw error(403, 'Acceso denegado: Permisos insuficientes');
}
