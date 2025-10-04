import { createQuery } from '@tanstack/svelte-query';
import { browser } from '$app/environment';

// Tipo para la categoría
interface Category {
  id: string;
  name: string;
  slug: string;
  // Agrega otras propiedades según tu modelo de datos
}

// Obtener todas las categorías
export function useCategories() {
  const query = createQuery<Category[]>({
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
    cacheTime: 1000 * 60 * 30, // 30 minutos
  });
  
  return query;
}

// Obtener una categoría por slug
export function useCategory(slug: string) {
  const query = createQuery<Category>({
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
