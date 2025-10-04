import { json } from '@sveltejs/kit';
import { authService } from '$lib/server/services/auth.service';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    
    // Registrar el usuario
    const result = await authService.register(data);
    
    if (!result.success) {
      return json(
        { 
          success: false,
          error: result.error || 'Error al registrar el usuario' 
        },
        { status: 400 }
      );
    }

    // Configurar la cookie de autenticación
    const response = json({
      success: true,
      user: result.user,
      token: result.token
    });

    // Configurar la cookie HTTP-only
    cookies.set('token', result.token as string, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    });

    return response;
  } catch (error) {
    console.error('Error en el registro:', error);
    return json(
      { 
        success: false,
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
};
