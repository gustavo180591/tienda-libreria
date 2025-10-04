import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  return json({
    authenticated: !!locals.user,
    user: locals.user || null
  });
};
