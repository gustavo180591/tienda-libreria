import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
  try {
    // Eliminar la cookie de autenticación
    cookies.delete('token', { path: '/' });
    
    return json({
      success: true,
      message: 'Sesión cerrada correctamente'
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return json(
      { 
        success: false,
        error: 'Error al cerrar la sesión' 
      },
      { status: 500 }
    );
  }
};
