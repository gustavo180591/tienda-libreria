import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { productService } from '$lib/server/services/product.service';

export const GET: RequestHandler = async ({ params }) => {
  const product = await productService.getProductBySlug(params.slug);
  
  if (!product) {
    return new Response(JSON.stringify({ error: 'Product not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  return json(product);
};
