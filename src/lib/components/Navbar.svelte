<script lang="ts">
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { onDestroy } from 'svelte';
  import { clickOutside } from '$lib/utils/click-outside';
  
  // Función para cerrar sesión
  async function handleLogout() {
    try {
      await auth.logout();
      goto('/auth/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
  
  // Navegación principal
  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/products' },
    { name: 'Categorías', href: '/categories' },
    { name: 'Nosotros', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ];
  
  // Navegación de usuario autenticado
  const userNavigation = [
    { name: 'Mi perfil', href: '/profile' },
    { name: 'Mis pedidos', href: '/orders' },
    { name: 'Configuración', href: '/settings' },
    { name: 'Cerrar sesión', action: handleLogout },
  ];
  
  // Estado del menú
  let mobileMenuOpen = false;
  let userMenuOpen = false;
  
  // Cerrar menú cuando se hace clic fuera
  function closeMenus() {
    mobileMenuOpen = false;
    userMenuOpen = false;
  }
  
  // Cerrar menú cuando se cambia de ruta
  $: if ($page.url.pathname) {
    closeMenus();
  }
  
  // Cerrar menú cuando se hace clic fuera
  function handleClickOutside(event: MouseEvent) {
    if (mobileMenuOpen && !(event.target as HTMLElement).closest('.mobile-menu-container')) {
      mobileMenuOpen = false;
    }
  }
  
  // Agregar manejador de eventos
  if (typeof window !== 'undefined') {
    document.addEventListener('click', handleClickOutside);
  }
  
  // Limpiar manejador de eventos al desmontar
  onDestroy(() => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
  });
</script>

<header class="bg-white shadow-sm">
  <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
    <div class="flex h-16 items-center justify-between border-b border-indigo-500 border-opacity-25 lg:border-none">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="/" class="flex items-center">
          <span class="text-2xl font-bold text-indigo-600">TiendaLibrería</span>
        </a>
      </div>

      <!-- Menú móvil -->
      <div class="flex items-center lg:hidden">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          on:click={() => mobileMenuOpen = !mobileMenuOpen}
          aria-expanded="false"
        >
          <span class="sr-only">Abrir menú principal</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <!-- Menú de navegación -->
      <div class="hidden lg:ml-10 lg:block">
        <div class="flex space-x-8">
          {#each navigation as item}
            <a
              href={item.href}
              class="text-base font-medium text-gray-500 hover:text-gray-900 {($page.url.pathname === item.href) ? 'border-b-2 border-indigo-500 text-gray-900' : ''}"
            >
              {item.name}
            </a>
          {/each}
        </div>
      </div>

      <!-- Menú de usuario -->
      <div class="hidden lg:ml-10 lg:block">
        <div class="flex items-center space-x-4">
          {#if $auth.isAuthenticated}
            <!-- Carrito -->
            <a href="/cart" class="relative p-2 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Carrito</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
                0
              </span>
            </a>

            <!-- Menú desplegable de usuario -->
            <div class="relative ml-4">
              <div>
                <button
                  type="button"
                  class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  on:click={() => userMenuOpen = !userMenuOpen}
                >
                  <span class="sr-only">Abrir menú de usuario</span>
                  <div class="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                    {$auth.user?.firstName ? $auth.user.firstName[0] : $auth.user?.email[0]}
                  </div>
                </button>
              </div>

              <!-- Menú desplegable -->
              {#if userMenuOpen}
                <div
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                  use:clickOutside={{
                    enabled: userMenuOpen,
                    callback: () => userMenuOpen = false
                  }}
                >
                  <div class="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <p class="font-medium">{$auth.user?.firstName || 'Usuario'}</p>
                    <p class="text-xs text-gray-500 truncate">{$auth.user?.email}</p>
                  </div>
                  {#each userNavigation as item}
                    {#if item.href}
                      <a
                        href={item.href}
                        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabindex="-1"
                        on:click={closeMenus}
                      >
                        {item.name}
                      </a>
                    {:else if item.action}
                      <button
                        on:click|preventDefault={() => {
                          item.action();
                          closeMenus();
                        }}
                        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabindex="-1"
                      >
                        {item.name}
                      </button>
                    {/if}
                  {/each}
                </div>
              {/if}
            </div>
          {:else}
            <!-- Botones de autenticación -->
            <div class="flex items-center space-x-4">
              <a
                href="/auth/login"
                class="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Iniciar sesión
              </a>
              <a
                href="/auth/register"
                class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Registrarse
              </a>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Menú móvil -->
    {#if mobileMenuOpen}
      <div class="lg:hidden">
        <div class="space-y-1 pb-3 pt-2">
          {#each navigation as item}
            <a
              href={item.href}
              class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 {($page.url.pathname === item.href) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : ''}"
              on:click={closeMenus}
            >
              {item.name}
            </a>
          {/each}
        </div>
        <div class="border-t border-gray-200 pb-3 pt-4">
          {#if $auth.isAuthenticated}
            <div class="flex items-center px-4">
              <div class="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                {$auth.user?.firstName ? $auth.user.firstName[0] : $auth.user?.email[0]}
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">
                  {$auth.user?.firstName || 'Usuario'}
                </div>
                <div class="text-sm font-medium text-gray-500">
                  {$auth.user?.email}
                </div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              {#each userNavigation as item}
                {#if item.href}
                  <a
                    href={item.href}
                    class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    on:click={closeMenus}
                  >
                    {item.name}
                  </a>
                {:else if item.action}
                  <button
                    on:click|preventDefault={() => {
                      item.action();
                      closeMenus();
                    }}
                    class="w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    {item.name}
                  </button>
                {/if}
              {/each}
            </div>
          {:else}
            <div class="mt-3 space-y-1">
              <a
                href="/auth/login"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                on:click={closeMenus}
              >
                Iniciar sesión
              </a>
              <a
                href="/auth/register"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                on:click={closeMenus}
              >
                Crear cuenta
              </a>
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </nav>
</header>

<!-- Overlay para cerrar menú al hacer clic fuera -->
{#if mobileMenuOpen}
  <button
    type="button"
    class="fixed inset-0 z-40 w-full h-full bg-black bg-opacity-50 lg:hidden cursor-default focus:outline-none"
    on:click={closeMenus}
    on:keydown={(e) => e.key === 'Enter' && closeMenus()}
    aria-label="Cerrar menú"
  ></button>
{/if}

