<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // Check if user is already authenticated
  onMount(() => {
    const isAuthenticated = false; // TODO: Replace with actual auth check
    if (isAuthenticated) {
      goto('/admin');
    }
  });
</script>

<slot />

<style>
  :global(body) {
    background-color: #f7fafc;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 1rem;
  }

  .auth-container {
    width: 100%;
    max-width: 400px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 2rem;
  }

  .logo {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logo h1 {
    color: #2d3748;
    margin: 0.5rem 0 0 0;
    font-size: 1.5rem;
  }

  .logo p {
    color: #718096;
    margin: 0;
  }
</style>
