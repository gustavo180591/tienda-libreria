import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { User } from '@prisma/client';

// Estado inicial basado en el almacenamiento local
const storedUser = browser ? JSON.parse(localStorage.getItem('user') || 'null') : null;

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!storedUser,
  user: storedUser,
  loading: false,
  error: null
};

export type AuthStore = Writable<AuthState> & {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: { email: string; password: string; firstName?: string; lastName?: string }) => Promise<void>;
  checkAuth: () => Promise<boolean>;
};

function createAuthStore(): AuthStore {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    set,
    update,
    login: async (email: string, password: string) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al iniciar sesión');
        }

        // Actualizar el estado
        update(state => ({
          ...state,
          isAuthenticated: true,
          user: data.user,
          loading: false,
          error: null
        }));

        // Guardar en localStorage
        if (browser) {
          localStorage.setItem('user', JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        }

        return data.user;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        update(state => ({ ...state, loading: false, error: errorMessage }));
        throw error;
      }
    },

    // Cerrar sesión
    logout: async () => {
      try {
        await fetch('/api/auth/logout', { method: 'POST' });
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      } finally {
        // Limpiar el estado
        set({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null
        });

        // Limpiar el almacenamiento local
        if (browser) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    },

    // Registrar un nuevo usuario
    register: async (userData: { email: string; password: string; firstName?: string; lastName?: string }) => {
      update(state => ({ ...state, loading: true, error: null }));
      
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al registrar el usuario');
        }

        // Actualizar el estado
        update(state => ({
          ...state,
          isAuthenticated: true,
          user: data.user,
          loading: false,
          error: null
        }));

        // Guardar en localStorage
        if (browser) {
          localStorage.setItem('user', JSON.stringify(data.user));
          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        }

        return data.user;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        update(state => ({ ...state, loading: false, error: errorMessage }));
        throw error;
      }
    },

    // Verificar autenticación
    checkAuth: async () => {
      update(state => ({ ...state, loading: true }));
      
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Error al verificar autenticación');
        }

        // Actualizar el estado
        update(state => ({
          ...state,
          isAuthenticated: data.authenticated,
          user: data.user || null,
          loading: false,
          error: null
        }));

        // Sincronizar con localStorage
        if (browser) {
          if (data.authenticated && data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        }

        return data.authenticated;
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        
        // En caso de error, asumir que no está autenticado
        update(state => ({
          ...state,
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Error al verificar autenticación'
        }));

        // Limpiar el almacenamiento local
        if (browser) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }

        return false;
      }
    }
  };
}

export const auth = createAuthStore();

// Add type for the $auth store subscription
declare global {
  var $auth: AuthState;
}

// Verificar autenticación al cargar la aplicación
if (browser) {
  auth.checkAuth();
}
