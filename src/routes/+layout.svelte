<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth';
  import Navbar from '$lib/components/Navbar.svelte';
  import { browser } from '$app/environment';
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
  
  // Configuración de QueryClient
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,   // 30 segundos
        gcTime: 1000 * 60 * 5,  // 5 minutos
        refetchOnWindowFocus: false,
        retry: 1
      }
    }
  });
  
  // Properly type the props
  export let data: any;
  export let params: Record<string, string> = {};
  
  // Check authentication when the page loads
  onMount(async () => {
    if (browser) {
      await auth.checkAuth();
    }
  });
</script>

<svelte:head>
  <title>Tienda Librería</title>
  <meta name="description" content="Tienda de libros y artículos de librería" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href={favicon} />
  
  <!-- Fuentes de Google -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<QueryClientProvider client={queryClient}>
<div class="min-h-screen flex flex-col">
  <!-- Barra de navegación -->
  <Navbar />
  
  <!-- Contenido principal -->
  <main class="flex-grow">
    {#if $page.status === 404}
      <slot />
    {:else}
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <slot />
      </div>
    {/if}
  </main>
  
  <!-- Pie de página -->
  <footer class="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-white py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Columna 1: Logo y descripción -->
        <div class="col-span-1">
          <h3 class="text-lg font-semibold mb-4">Librería Arco Iris</h3>
          <p class="text-gray-400 text-sm">
            Tu tienda de confianza para encontrar los mejores libros y artículos de librería.
          </p>
        </div>
        
        <!-- Columna 2: Enlaces rápidos -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Enlaces rápidos</h4>
          <ul class="space-y-2">
            <li><a href="/" class="text-gray-400 hover:text-white text-sm">Inicio</a></li>
            <li><a href="/products" class="text-gray-400 hover:text-white text-sm">Productos</a></li>
            <li><a href="/categories" class="text-gray-400 hover:text-white text-sm">Categorías</a></li>
            <li><a href="/about" class="text-gray-400 hover:text-white text-sm">Sobre nosotros</a></li>
            <li><a href="/contact" class="text-gray-400 hover:text-white text-sm">Contacto</a></li>
          </ul>
        </div>
        
        <!-- Columna 3: Mi cuenta -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Mi cuenta</h4>
          <ul class="space-y-2">
            {#if $auth.isAuthenticated}
              <li><a href="/profile" class="text-gray-400 hover:text-white text-sm">Mi perfil</a></li>
              <li><a href="/orders" class="text-gray-400 hover:text-white text-sm">Mis pedidos</a></li>
              <li><a href="/wishlist" class="text-gray-400 hover:text-white text-sm">Lista de deseos</a></li>
              <li><a href="/settings" class="text-gray-400 hover:text-white text-sm">Configuración</a></li>
            {:else}
              <li><a href="/auth/login" class="text-gray-400 hover:text-white text-sm">Iniciar sesión</a></li>
              <li><a href="/auth/register" class="text-gray-400 hover:text-white text-sm">Crear cuenta</a></li>
            {/if}
          </ul>
        </div>
        
        <!-- Columna 4: Contacto -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contacto</h4>
          <address class="not-italic text-indigo-100 text-sm space-y-3">
            <div class="flex items-start">
              <svg class="h-5 w-5 text-indigo-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-medium text-white">Dirección</p>
                <p>Eva Perón 1234</p>
                <p>Villa Cabello, Posadas - Misiones</p>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="font-medium text-white">Email</p>
                <a href="mailto:chabelalibreria@gmail.com" class="hover:text-white transition-colors duration-200">chabelalibreria@gmail.com</a>
              </div>
            </div>
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p class="font-medium text-white">Teléfono</p>
                <a href="tel:+543761234567" class="hover:text-white transition-colors duration-200">+54 9 376 123-4567</a>
              </div>
            </div>
          </address>
          
          <div class="mt-6 flex space-x-4">
            <a href="https://facebook.com" class="bg-indigo-800 hover:bg-indigo-700 text-white p-2 rounded-full transition-colors duration-200" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <span class="sr-only">Facebook</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="https://instagram.com" class="bg-purple-800 hover:bg-purple-700 text-white p-2 rounded-full transition-colors duration-200" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <span class="sr-only">Instagram</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="https://wa.me/543761234567" class="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition-colors duration-200" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
              <span class="sr-only">WhatsApp</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fill-rule="evenodd" d="M19.3 4.7c-3.5-3.5-9.2-3.9-13.4-.8-4.1 3.1-4.7 8.6-1.9 12.5l-1.1 4.1 4.2-1.1c1.4.7 2.9 1.1 4.5 1.1 1.3 0 2.6-.3 3.8-.8 3.8-1.5 6.4-5.2 6.4-9.3 0-1.9-.6-3.7-1.7-5.2zM12 20.9c-1.1 0-2.2-.2-3.2-.6l-.3-.1-2.2.6.6-2.2-.1-.3c-1-2.4-.4-5.1 1.5-7 1.3-1.3 3-2 4.9-2 1.2 0 2.4.3 3.5 1 .3.2.6.4.9.7.3.3.5.6.7.9.7 1.1 1 2.3 1 3.5 0 1.9-.7 3.6-2 4.9-.9.9-2 1.6-3.3 1.9zm6.7-5.9c-.1-.2-.2-.3-.4-.4-.1 0-.2-.1-.3-.1-.2 0-.4 0-.6.1l-1.6.8c-.2.1-.4.1-.6 0-.2-.1-.5-.2-.7-.4-.6-.5-1-1-1.4-1.6-.1-.2-.2-.4 0-.6.1-.1.1-.2.2-.2.2 0 .4 0 .6.1l.6.3c.1.1.3.1.4 0 .1 0 .2-.1.3-.1.3-.4.6-.9.8-1.4.1-.2.1-.3 0-.4 0-.1-.1-.2-.2-.3l-.5-.3c-.1-.1-.2-.2-.2-.3 0-.1 0-.2.1-.3.4-.5.7-1.1.9-1.7.1-.3 0-.5-.2-.6-.1 0-.2-.1-.3-.1h-.5c-.2 0-.3 0-.5.1-.5.3-1 .8-1.3 1.4-.1.2-.2.4-.2.6 0 .2.1.5.2.7.2.5.5 1 .9 1.4.4.5.9.9 1.4 1.2.2.1.5.3.7.4.3.1.6.2.9.2.2 0 .4 0 .6-.1.2 0 .4-.1.6-.2.2-.1.3-.2.4-.4.1-.2.2-.4.2-.6 0-.2 0-.4-.1-.5z" clip-rule="evenodd" />
              </svg>
            </a>
            <a href="https://twitter.com" class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <span class="sr-only">Twitter</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Derechos de autor -->
      <div class="mt-12 border-t border-indigo-700 pt-8">
        <p class="text-center text-sm text-indigo-200">
          &copy; {new Date().getFullYear()} Tienda Librería. Todos los derechos reservados.
        </p>
      </div>
    </div>
  </footer>
</div>
</QueryClientProvider>

<!-- Estilos globales -->
<style>
  :global(body) {
    background-color: #ffffff;
    color: #111827;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  :global(h1, h2, h3, h4, h5, h6) {
    font-weight: 700;
    color: #111827;
    margin-top: 0;
    margin-bottom: 0.5em;
    line-height: 1.2;
  }
  
  :global(a) {
    color: #4f46e5;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }
  
  :global(a:hover) {
    color: #4338ca;
  }
  
  :global(button, .btn) {
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  }
  
  :global(input, textarea, select) {
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    width: 100%;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  :global(input:focus, textarea:focus, select:focus) {
    border-color: #818cf8;
    outline: 0;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
  }
  
  :global(.prose) {
    max-width: none;
  }
  
  :global(.prose img) {
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
</style>
