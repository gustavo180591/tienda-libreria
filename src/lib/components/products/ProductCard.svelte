<script lang="ts">
  import { page } from '$app/stores';
  import { addToCart } from '$lib/stores/cart';
  
  export let product: {
    id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    precioOferta?: number;
    imagenUrl?: string;
    esNovedad?: boolean;
    esDestacado?: boolean;
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      nombre: product.nombre,
      precio: product.precioOferta || product.precio,
      cantidad: 1,
      imagenUrl: product.imagenUrl,
      stock: 10 // TODO: Obtener stock real del producto
    });
  };
</script>

<article class="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
  <!-- Badge de Novedad -->
  {#if product.esNovedad}
    <div class="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
      Nuevo
    </div>
  {/if}
  
  <!-- Imagen del Producto -->
  <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
    {#if product.imagenUrl}
      <img 
        src={product.imagenUrl} 
        alt={product.nombre}
        class="h-full w-full object-cover object-center"
      />
    {:else}
      <div class="h-full w-full bg-gray-200 flex items-center justify-center">
        <span class="text-gray-400">Sin imagen</span>
      </div>
    {/if}
  </div>
  
  <!-- Información del Producto -->
  <div class="p-4">
    <h3 class="text-sm text-gray-700 font-medium line-clamp-2 h-12">
      {product.nombre}
    </h3>
    <p class="mt-1 text-sm text-gray-500 line-clamp-2 h-10">
      {product.descripcion}
    </p>
    
    <!-- Precios -->
    <div class="mt-2">
      {#if product.precioOferta}
        <div class="flex items-center gap-2">
          <p class="text-lg font-bold text-gray-900">
            ${product.precioOferta.toFixed(2)}
          </p>
          <p class="text-sm text-gray-500 line-through">
            ${product.precio.toFixed(2)}
          </p>
          <p class="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">
            {Math.round((1 - product.precioOferta / product.precio) * 100)}% OFF
          </p>
        </div>
      {:else}
        <p class="text-lg font-bold text-gray-900">
          ${product.precio.toFixed(2)}
        </p>
      {/if}
    </div>
    
    <!-- Botón de Añadir al Carrito -->
    <button
      on:click={handleAddToCart}
      class="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
    >
      Añadir al carrito
    </button>
  </div>
</article>
