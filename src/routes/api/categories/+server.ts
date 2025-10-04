import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { productService } from '$lib/server/services/product.service';

export const GET: RequestHandler = async () => {
  const categories = await productService.getCategories();
  return json(categories);
};
