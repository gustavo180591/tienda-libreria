<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { onMount } from 'svelte';
  
  let { children } = $props();
  
  // Cargar la fuente Inter de Google Fonts
  onMount(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  });
</script>

<svelte:head>
  <title>Tienda Librería</title>
  <meta name="description" content="Tu tienda de libros y material escolar favorita" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" href={favicon} />
  
  <!-- Preload de fuentes -->
  <link 
    rel="preload" 
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
    as="style"
    on:load={(e) => {
      const link = e.target as HTMLLinkElement;
      link.onload = null;
      link.rel = 'stylesheet';
    }}
  >
  <noscript>
    <link 
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
      rel="stylesheet"
    >
  </noscript>
</svelte:head>

<div class="min-h-screen flex flex-col bg-gray-50">
  <!-- Aquí irá el header -->
  <main class="flex-grow">
    {@render children?.()}
  </main>
  
  <!-- Aquí irá el footer -->
</div>
