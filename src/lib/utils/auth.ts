import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { get } from 'svelte/store';

/**
 * Redirige al usuario a la página de login si no está autenticado
 * @param {string} redirectTo - Ruta a la que redirigir después del login (opcional)
 */
export function requireAuth(redirectTo?: string) {
  const { user } = get(page).data;
  
  if (!user) {
    const redirectPath = redirectTo || window.location.pathname;
    goto(`/auth/login?redirectTo=${encodeURIComponent(redirectPath)}`);
    return false;
  }
  
  return true;
}

/**
 * Redirige al usuario a la página de inicio si ya está autenticado
 * @param {string} redirectTo - Ruta a la que redirigir (por defecto: '/')
 */
export function redirectIfAuthenticated(redirectTo = '/') {
  const { user } = get(page).data;
  
  if (user) {
    goto(redirectTo);
    return true;
  }
  
  return false;
}

/**
 * Verifica si el usuario tiene un rol específico
 * @param {string} role - Rol a verificar
 * @returns {boolean} - True si el usuario tiene el rol, false en caso contrario
 */
export function hasRole(role: string): boolean {
  const { user } = get(page).data;
  return user?.role === role;
}

/**
 * Verifica si el usuario tiene al menos uno de los roles especificados
 * @param {string[]} roles - Roles a verificar
 * @returns {boolean} - True si el usuario tiene al menos uno de los roles, false en caso contrario
 */
export function hasAnyRole(roles: string[]): boolean {
  const { user } = get(page).data;
  return roles.includes(user?.role);
}

/**
 * Almacena el token JWT en el almacenamiento local
 * @param {string} token - Token JWT
 */
export function storeAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
}

/**
 * Obtiene el token JWT del almacenamiento local
 * @returns {string | null} - Token JWT o null si no existe
 */
export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
}

/**
 * Elimina el token JWT del almacenamiento local
 */
export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
}

/**
 * Verifica si el usuario está autenticado
 * @returns {Promise<boolean>} - True si el usuario está autenticado, false en caso contrario
 */
export async function checkAuth(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/check');
    const data = await response.json();
    return data.authenticated === true;
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    return false;
  }
}
