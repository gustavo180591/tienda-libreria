<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/stores/auth';
  import LoadingSpinner from '$lib/components/ui/LoadingSpinner.svelte';
  
  export let roles: string[] = [];
  export let redirectTo: string = '/auth/login';
  
  let loading = true;
  
  onMount(async () => {
    // Verificar autenticación
    const isAuthenticated = await auth.checkAuth();
    
    if (!isAuthenticated) {
      // No autenticado, redirigir a login
      const redirectPath = `${redirectTo}?redirectTo=${encodeURIComponent($page.url.pathname)}`;
      goto(redirectPath);
      return;
    }
    
    // Verificar roles si se especificaron
    if (roles.length > 0) {
      const hasRequiredRole = roles.includes($auth.user?.role || '');
      
      if (!hasRequiredRole) {
        // No tiene el rol requerido, redirigir a no autorizado
        goto('/unauthorized');
        return;
      }
    }
    
    loading = false;
  });
  
  // Redirigir si el estado de autenticación cambia
  $: if ($auth.isAuthenticated === false) {
    const redirectPath = `${redirectTo}?redirectTo=${encodeURIComponent($page.url.pathname)}`;
    goto(redirectPath);
  }
  
  // Verificar roles si cambian
  $: if ($auth.user && roles.length > 0) {
    const hasRequiredRole = roles.includes($auth.user.role);
    
    if (!hasRequiredRole) {
      goto('/unauthorized');
    }
  }
</script>

{#if loading}
  <div class="flex items-center justify-center min-h-screen">
    <LoadingSpinner size="lg" />
  </div>
{:else}
  <slot />
{/if}
