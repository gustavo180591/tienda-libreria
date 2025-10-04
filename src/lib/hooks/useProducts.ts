import { createQuery } from '@tanstack/svelte-query';
import { browser } from '$app/environment';

interface ProductsQueryOptions {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}

export function useProducts({ page = 1, limit = 10, categoryId, search }: ProductsQueryOptions = {}) {
  return createQuery({
    queryKey: ['products', { page, limit, categoryId, search }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(categoryId && { categoryId }),
        ...(search && { search })
      });
      
      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      return response.json();
    },
    enabled: browser, // Solo ejecutar en el cliente
    staleTime: 1000 * 60 * 5, // 5 minutos
    gcTime: 1000 * 60 * 10, // 10 minutos
  });
}

export function useProduct(slug: string) {
  return createQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const response = await fetch(`/api/products/${slug}`);
      if (!response.ok) {
        throw new Error('Producto no encontrado');
      }
      return response.json();
    },
    enabled: !!slug && browser,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
