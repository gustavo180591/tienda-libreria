import { json } from '@sveltejs/kit';
import { authService } from '$lib/server/services/auth.service';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const data = await request.json();
    const result = await authService.login(data);
    
    if (!result.success) {
      return json(
        { 
          success: false,
          error: result.error || 'Credenciales inválidas' 
        },
        { status: 401 }
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
    console.error('Error en el inicio de sesión:', error);
    return json(
      { 
        success: false,
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    );
  }
};
