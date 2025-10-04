<script lang="ts">
  import { onMount } from 'svelte';
  
  const categories = [
    { name: 'Libros', icon: '📚', count: 12 },
    { name: 'Librería', icon: '✏️', count: 8 },
    { name: 'Papelería', icon: '📝', count: 15 }
  ];
  
  const featuredProducts = [
    {
      name: 'Cien Años de Soledad',
      category: 'Libros',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.8
    },
    {
      name: 'Cuaderno Universitario',
      category: 'Librería',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.6
    },
    {
      name: 'Juego de Escuadras',
      category: 'Papelería',
      price: 5.99,
      image: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5
    }
  ];
  
  // Simple animation on scroll
  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
  });
</script>

<svelte:head>
  <title>Librería y Papelería - Inicio</title>
  <meta name="description" content="Encuentra los mejores libros y artículos de papelería a los mejores precios." />
</svelte:head>

<!-- Hero Section -->
<section class="hero">
  <div class="hero-content">
    <h1 class="text-4xl md:text-6xl font-bold mb-6 fade-in">Bienvenido a Nuestra Librería</h1>
    <p class="text-xl mb-8 fade-in" style="animation-delay: 0.2s">Descubre nuestra amplia selección de libros y artículos de papelería</p>
    <div class="flex flex-col sm:flex-row gap-4 fade-in" style="animation-delay: 0.4s">
      <a href="/products" class="btn btn-primary">Ver Productos</a>
      <a href="#categories" class="btn btn-outline">Explorar Categorías</a>
    </div>
  </div>
</section>

<!-- Featured Products -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12 fade-in">Productos Destacados</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each featuredProducts as product, i}
        <div class="bg-white rounded-lg shadow-md overflow-hidden fade-in" 
             style="animation-delay: {0.2 + (i * 0.1)}s">
          <img src={product.image} alt={product.name} class="w-full h-64 object-cover">
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-xl font-semibold">{product.name}</h3>
                <p class="text-gray-600">{product.category}</p>
              </div>
              <div class="flex items-center text-yellow-500">
                <span class="mr-1">★</span>
                <span>{product.rating}</span>
              </div>
            </div>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-2xl font-bold">${product.price.toFixed(2)}</span>
              <button class="btn btn-sm btn-primary">Añadir al carrito</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
    <div class="text-center mt-10 fade-in">
      <a href="/products" class="btn btn-outline">Ver todos los productos</a>
    </div>
  </div>
</section>

<!-- Categories -->
<section id="categories" class="py-16">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-12 fade-in">Nuestras Categorías</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each categories as category, i}
        <a href={`/category/${category.name.toLowerCase()}`} 
           class="category-card fade-in" 
           style="animation-delay: {0.2 + (i * 0.1)}s">
          <div class="text-5xl mb-4">{category.icon}</div>
          <h3 class="text-xl font-semibold">{category.name}</h3>
          <p class="text-gray-600">{category.count} productos</p>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- About Section -->
<section class="py-16 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto text-center fade-in">
      <h2 class="text-3xl font-bold mb-6">Sobre Nosotros</h2>
      <p class="text-lg text-gray-700 mb-8">
        En nuestra librería y papelería, nos apasiona ofrecer una amplia selección de libros y artículos de papelería de la más alta calidad. 
        Nuestro objetivo es fomentar la lectura y la creatividad en nuestra comunidad.
      </p>
      <a href="/about" class="btn btn-primary">Conócenos más</a>
    </div>
  </div>
</section>

<!-- Contact CTA -->
<section class="py-16 bg-primary text-white">
  <div class="container mx-auto px-4 text-center fade-in">
    <h2 class="text-3xl font-bold mb-4">¿Tienes alguna pregunta?</h2>
    <p class="text-xl mb-8">Estamos aquí para ayudarte. Contáctanos hoy mismo.</p>
    <a href="/contact" class="btn btn-white">Contáctanos</a>
  </div>
</section>

<style>
  /* Base Styles */
  :global(body) {
    @apply bg-white text-gray-900;
  }
  
  /* Hero Section */
  .hero {
    @apply relative h-[80vh] flex items-center justify-center text-center text-white;
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                url('https://images.unsplash.com/photo-1524995997941-a3c9e725917a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
    background-size: cover;
    background-position: center;
  }
  
  .hero-content {
    @apply max-w-4xl px-4;
  }
  
  /* Buttons */
  .btn {
    @apply px-6 py-3 rounded-md font-medium transition-all duration-300 inline-flex items-center justify-center;
  }
  
  .btn-primary {
    @apply bg-primary text-white hover:bg-primary-dark;
  }
  
  .btn-outline {
    @apply border-2 border-primary text-primary hover:bg-primary hover:text-white;
  }
  
  .btn-white {
    @apply bg-white text-primary hover:bg-gray-100;
  }
  
  .btn-sm {
    @apply px-4 py-2 text-sm;
  }
  
  /* Category Cards */
  .category-card {
    @apply bg-white p-8 rounded-lg shadow-md text-center transition-all duration-300 hover:shadow-lg hover:transform hover:-translate-y-1;
  }
  
  /* Animations */
  .fade-in {
    @apply opacity-0 translate-y-6 transition-all duration-500 ease-out;
  }
  
  .fade-in-visible {
    @apply opacity-100 translate-y-0;
  }
  
  /* Container */
  .container {
    @apply max-w-7xl mx-auto;
  }
  
  /* Colors */
  .bg-primary {
    background-color: #3b82f6; /* blue-500 */
  }
  
  .bg-primary-dark {
    background-color: #2563eb; /* blue-600 */
  }
  
  .text-primary {
    color: #3b82f6; /* blue-500 */
  }
  
  .border-primary {
    border-color: #3b82f6; /* blue-500 */
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .hero {
      @apply h-[60vh];
    }
    
    .hero-content h1 {
      @apply text-5xl;
    }
  }
  
  @media (max-width: 640px) {
    .hero-content h1 {
      @apply text-4xl;
    }
  }
</style>
