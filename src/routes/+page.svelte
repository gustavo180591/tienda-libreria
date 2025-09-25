<script lang="ts">
  import ProductCard from '$lib/components/products/ProductCard.svelte';
  
  // Datos de ejemplo - En producción, estos vendrán de tu API
  const productosDestacados = [
    {
      id: '1',
      nombre: 'Cuaderno Universitario A4',
      descripcion: 'Cuaderno universitario tapa dura, 200 hojas rayadas',
      precio: 25.99,
      precioOferta: 19.99,
      imagenUrl: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&auto=format&fit=crop',
      esNovedad: true,
      esDestacado: true
    },
    {
      id: '2',
      nombre: 'Set de Lápices de Colores x12',
      descripcion: 'Set de 12 lápices de colores profesionales',
      precio: 35.50,
      imagenUrl: 'https://images.unsplash.com/photo-1570846356915-b5b8b5d8a6e1?w=500&auto=format&fit=crop',
      esDestacado: true
    },
    {
      id: '3',
      nombre: 'Mochila Escolar Impermeable',
      descripcion: 'Mochila con múltiples compartimentos y diseño ergonómico',
      precio: 89.99,
      precioOferta: 75.50,
      imagenUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop',
      esDestacado: true
    },
    {
      id: '4',
      nombre: 'Estuche Escolar Profesional',
      descripcion: 'Estuche con múltiples compartimentos para lápices y útiles',
      precio: 29.99,
      imagenUrl: 'https://images.unsplash.com/photo-1501503069356-3fce2a0e016f?w=500&auto=format&fit=crop',
      esNovedad: true,
      esDestacado: true
    }
  ];
</script>

<main class="bg-gray-50 py-8">
  <!-- Hero Section -->
  <div class="bg-indigo-700 text-white py-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">Bienvenido a Tienda Librería</h1>
      <p class="text-xl mb-8">Encuentra todo lo que necesitas para el nuevo ciclo escolar</p>
      <a 
        href="/categorias" 
        class="bg-white text-indigo-700 font-bold py-3 px-6 rounded-full hover:bg-indigo-100 transition-colors duration-200"
      >
        Ver Catálogo
      </a>
    </div>
  </div>

  <!-- Productos Destacados -->
  <section class="container mx-auto px-4 py-12">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900">Productos Destacados</h2>
      <a 
        href="/productos" 
        class="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
      >
        Ver todos
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </a>
    </div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {#each productosDestacados as product}
        <div class="h-full">
          <ProductCard {product} />
        </div>
      {/each}
    </div>
  </section>

  <!-- Categorías Populares -->
  <section class="bg-white py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Explorar Categorías</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {#each [
          { name: 'Libros', icon: '📚', count: 245 },
          { name: 'Papelería', icon: '📝', count: 189 },
          { name: 'Arte', icon: '🎨', count: 76 },
          { name: 'Oficina', icon: '🏢', count: 112 },
          { name: 'Escolar', icon: '✏️', count: 203 },
          { name: 'Tecnología', icon: '💻', count: 58 }
        ] as category}
          <a 
            href={`/categorias/${category.name.toLowerCase()}`}
            class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center"
          >
            <span class="text-3xl mb-2">{category.icon}</span>
            <h3 class="font-medium text-gray-900">{category.name}</h3>
            <p class="text-sm text-gray-500">{category.count} productos</p>
          </a>
        {/each}
      </div>
    </div>
  </section>

  <!-- Banner de Oferta -->
  <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 my-12">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-4">¡Hasta 40% de descuento!</h2>
      <p class="text-xl mb-6">En toda la sección de útiles escolares</p>
      <a 
        href="/ofertas" 
        class="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transition-colors duration-200 inline-block"
      >
        Ver Ofertas
      </a>
    </div>
  </div>
</main>
