import { json } from '@sveltejs/kit';
import { authService } from '$lib/auth/auth.service';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const data = await request.json();
    const result = await authService.login(data);
    
    return json({
      success: true,
      data: result,
    });
  } catch (error) {
    return json(
      {
        success: false,
        error: error.message || 'Error al iniciar sesión',
      },
      { status: 401 }
    );
  }
};
