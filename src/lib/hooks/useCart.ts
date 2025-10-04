import { createQuery, useMutation, useQueryClient } from '@tanstack/svelte-query';
import { browser } from '$app/environment';

// Obtener el carrito actual
export function useCart() {
  return createQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const response = await fetch('/api/cart');
      if (!response.ok) {
        throw new Error('Error al cargar el carrito');
      }
      return response.json();
    },
    enabled: browser,
    staleTime: 1000 * 30, // 30 segundos
  });
}

// Agregar producto al carrito
export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
      const response = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId, quantity })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error al agregar al carrito');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      // También podrías invalidar consultas de stock si las tienes
      // queryClient.invalidateQueries({ queryKey: ['variant-stock', variantId] });
    },
  });
}

// Eliminar producto del carrito
export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar del carrito');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

// Actualizar cantidad en el carrito
export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar el carrito');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
