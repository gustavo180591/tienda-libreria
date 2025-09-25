import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Definir el tipo para un ítem del carrito
export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  imagenUrl?: string;
  stock: number;
  // Para productos con variantes
  varianteId?: string;
  varianteNombre?: string;
}

// Función para obtener el carrito del localStorage
function getCartFromLocalStorage(): CartItem[] {
  if (!browser) return [];
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Crear el store del carrito
function createCart() {
  const { subscribe, update, set } = writable<CartItem[]>(getCartFromLocalStorage());

  // Sincronizar con localStorage
  if (browser) {
    subscribe(value => {
      localStorage.setItem('cart', JSON.stringify(value));
    });
  }

  return {
    subscribe,
    addItem: (item: Omit<CartItem, 'cantidad'>) => {
      update(cart => {
        const existingItem = cart.find(
          i => i.id === item.id && i.varianteId === item.varianteId
        );

        if (existingItem) {
          // Si el ítem ya está en el carrito, incrementar la cantidad
          return cart.map(i =>
            i.id === item.id && i.varianteId === item.varianteId
              ? { ...i, cantidad: Math.min(i.cantidad + 1, i.stock) }
              : i
          );
        } else {
          // Si no está, agregarlo con cantidad 1
          return [...cart, { ...item, cantidad: 1 }];
        }
      });
    },
    removeItem: (itemId: string, varianteId?: string) => {
      update(cart => 
        cart.filter(i => !(i.id === itemId && i.varianteId === varianteId))
      );
    },
    updateQuantity: (itemId: string, varianteId: string | undefined, cantidad: number) => {
      if (cantidad <= 0) {
        cart.removeItem(itemId, varianteId);
        return;
      }
      
      update(cart =>
        cart.map(item =>
          item.id === itemId && item.varianteId === varianteId
            ? { ...item, cantidad: Math.min(cantidad, item.stock) }
            : item
        )
      );
    },
    clear: () => set([]),
    getTotal: (items: CartItem[]) => {
      return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
    },
    getItemCount: (items: CartItem[]) => {
      return items.reduce((count, item) => count + item.cantidad, 0);
    }
  };
}

// Exportar el store y las acciones
export const cart = createCart();

export const addToCart = (item: Omit<CartItem, 'cantidad'>) => {
  cart.addItem(item);
};

export const removeFromCart = (itemId: string, varianteId?: string) => {
  cart.removeItem(itemId, varianteId);
};

export const updateCartItemQuantity = (
  itemId: string, 
  varianteId: string | undefined, 
  cantidad: number
) => {
  cart.updateQuantity(itemId, varianteId, cantidad);
};

export const clearCart = () => {
  cart.clear();
};

export const getCartTotal = (items: CartItem[]) => {
  return cart.getTotal(items);
};

export const getCartItemCount = (items: CartItem[]) => {
  return cart.getItemCount(items);
};
