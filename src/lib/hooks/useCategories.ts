import { createQuery } from '@tanstack/svelte-query';
import { browser } from '$app/environment';

// Obtener todas las categorías
export function useCategories() {
  return createQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Error al cargar las categorías');
      }
      return response.json();
    },
    enabled: browser,
    staleTime: 1000 * 60 * 10, // 10 minutos
    gcTime: 1000 * 60 * 30, // 30 minutos
  });
}

// Obtener una categoría por slug
export function useCategory(slug: string) {
  return createQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const response = await fetch(`/api/categories/${slug}`);
      if (!response.ok) {
        throw new Error('Categoría no encontrada');
      }
      return response.json();
    },
    enabled: !!slug && browser,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });
}
