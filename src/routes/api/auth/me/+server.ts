import { json } from '@sveltejs/kit';
import { authService } from '$lib/server/services/auth.service';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  try {
    // Verificar si el usuario está autenticado
    if (!locals.user) {
      return json(
        { 
          success: false, 
          error: 'No autorizado' 
        },
        { status: 401 }
      );
    }

    // Obtener la información del usuario actual
    const user = await authService.getCurrentUser(locals.user.id);
    
    if (!user) {
      return json(
        { 
          success: false, 
          error: 'Usuario no encontrado' 
        },
        { status: 404 }
      );
    }

    return json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    return json(
      { 
        success: false, 
        error: 'Error al obtener la información del usuario' 
      },
      { status: 500 }
    );
  }
};
