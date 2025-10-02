import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { productService } from '$lib/server/services/product.service';

export const GET: RequestHandler = async ({ url }) => {
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = Number(url.searchParams.get('limit')) || 10;
  const category = url.searchParams.get('category') || undefined;
  const search = url.searchParams.get('search') || undefined;

  const products = await productService.getProducts({
    page,
    limit,
    categoryId: category,
    search,
  });

  return json(products);
};
