<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
  import type { AuthState } from '$lib/stores/auth';
  
  // Properly type the data prop
  export let data: any;
  export let params: Record<string, string> = {}; // Add this line to handle params

  let loading = true;
  let authState: AuthState;
  
  // Subscribe to auth store
  const unsubscribe = auth.subscribe((state: AuthState) => {
    authState = state;
  });
  
  onMount(() => {
    // Check authentication when layout loads
    auth.checkAuth().then(() => {
      loading = false;
    });
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  });

  // Redirect if already authenticated
  $: if (authState && !$page.url.pathname.startsWith('/auth') && authState.isAuthenticated) {
    const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
    goto(redirectTo);
  }
</script>

{#if loading}
  <div class="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
{:else}
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {#if $page.url.pathname === '/auth/login'}
          Iniciar sesión
        {:else if $page.url.pathname === '/auth/register'}
          Crear cuenta
        {/if}
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <slot />
      </div>
    </div>
  </div>
{/if}

<style global>
  body {
    background-color: rgb(249 250 251); /* bg-gray-50 */
  }
</style>
