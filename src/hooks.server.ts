import { authService } from '$lib/server/services/auth.service';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { checkAuthorization } from '$lib/server/middleware/authorization.middleware';

type Role = 'ADMIN' | 'MANAGER' | 'CUSTOMER';

// Rutas que no requieren autenticación
const PUBLIC_ROUTES = [
  '/',
  '/auth/login',
  '/auth/register',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/logout',
  '/api/auth/check',
  '/api/products',
  '/api/categories',
  '/unauthorized',
  '/about',
  '/contact',
  '/privacy',
  '/terms'
];

// Mapa de rutas protegidas y los roles requeridos
const PROTECTED_ROUTES: Array<{
  path: string;
  roles: Role[];
  exact?: boolean;
}> = [
  // Rutas de administración
  { path: '/admin', roles: ['ADMIN', 'MANAGER'] },
  { path: '/api/admin', roles: ['ADMIN', 'MANAGER'] },
  
  // Rutas de gestión de usuarios
  { path: '/api/users', roles: ['ADMIN'] },
  
  // Rutas de gestión de productos (solo para administradores y managers)
  { path: '/api/products', roles: ['ADMIN', 'MANAGER'], exact: false },
  
  // Rutas de gestión de pedidos
  { path: '/api/orders', roles: ['ADMIN', 'MANAGER'], exact: false },
  
  // Rutas de perfil de usuario
  { path: '/profile', roles: ['ADMIN', 'MANAGER', 'CUSTOMER'] },
  { path: '/api/profile', roles: ['ADMIN', 'MANAGER', 'CUSTOMER'], exact: false },
];

/**
 * Verifica si la ruta actual coincide con alguna ruta protegida
 */
function isProtectedRoute(pathname: string): { roles: Role[] } | null {
  for (const route of PROTECTED_ROUTES) {
    if (route.exact) {
      if (pathname === route.path) {
        return { roles: route.roles };
      }
    } else if (pathname.startsWith(route.path)) {
      return { roles: route.roles };
    }
  }
  return null;
}

// Middleware de autenticación y autorización
const handleAuth: Handle = async ({ event, resolve }) => {
  const { pathname } = new URL(event.request.url);
  
  // Verificar si es una ruta pública
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathname === route || 
    pathname.startsWith(route + '/') ||
    (!route.endsWith('/') && pathname.startsWith(route + '/'))
  );
  
  // Obtener el token de las cookies o del encabezado de autorización
  const token = event.cookies.get('token') || 
               event.request.headers.get('authorization')?.split(' ')[1];

  // Autenticación
  if (token) {
    try {
      // Verificar el token y obtener el usuario
      const payload = authService.verifyToken(token);
      
      if (payload) {
        const user = await authService.getCurrentUser(payload.userId);
        
        if (user) {
          // Agregar el usuario al objeto locals para que esté disponible en todas las páginas
          event.locals.user = {
            id: user.id,
            email: user.email,
            role: user.role as Role
          };
          
          // Verificar autorización para rutas protegidas
          const protectedRoute = isProtectedRoute(pathname);
          if (protectedRoute) {
            checkAuthorization(event, { roles: protectedRoute.roles });
          }
        } else {
          // Token válido pero usuario no encontrado - limpiar cookie
          event.cookies.delete('token', { path: '/' });
        }
      }
    } catch (error) {
      console.error('Error en el middleware de autenticación:', error);
      // En caso de error, limpiar la cookie
      event.cookies.delete('token', { path: '/' });
    }
  }

  // Si la ruta no es pública y el usuario no está autenticado, redirigir al login
  if (!isPublicRoute && !event.locals.user) {
    throw redirect(303, `/auth/login?redirectTo=${encodeURIComponent(event.url.pathname)}`);
  }

  // Verificar rutas de administrador
  const adminRoute = PROTECTED_ROUTES.find(route => 
    event.url.pathname.startsWith(route.path) && 
    route.roles.includes('ADMIN')
  );

  if (adminRoute && event.locals.user?.role !== 'ADMIN') {
    throw redirect(303, '/unauthorized');
  }

  // Continuar con la solicitud
  return resolve(event);
};

// Middleware para agregar encabezados de seguridad
const securityHeaders: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);
  
  // Agregar encabezados de seguridad
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Configuración de CORS
  if (process.env.NODE_ENV === 'development') {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }
  
  return response;
};

export const handle = sequence(handleAuth, securityHeaders);
