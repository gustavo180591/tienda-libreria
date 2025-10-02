import { json } from '@sveltejs/kit';
import { authService } from '$lib/auth/auth.service';
import { authenticate } from '$lib/auth/middleware';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
  try {
    await authenticate(event);
    const user = await authService.getCurrentUser(event.locals.user.id);
    
    return json({
      success: true,
      data: user,
    });
  } catch (error) {
    return json(
      {
        success: false,
        error: error.message || 'Error al obtener la información del usuario',
      },
      { status: 401 }
    );
  }
};
