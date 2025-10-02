<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // Redirect to login if not authenticated
  onMount(() => {
    // TODO: Add proper authentication check
    const isAuthenticated = false; // Replace with actual auth check
    if (!isAuthenticated) {
      goto('/admin/login');
    }
  });
</script>

<svelte:head>
  <title>Panel de Administración</title>
</svelte:head>

<div class="admin-dashboard">
  <h1>Panel de Administración</h1>
  <div class="admin-grid">
    <a href="/admin/products" class="admin-card">
      <h2>Productos</h2>
      <p>Gestiona tu catálogo de productos</p>
    </a>
    <a href="/admin/orders" class="admin-card">
      <h2>Pedidos</h2>
      <p>Revisa y gestiona los pedidos</p>
    </a>
    <a href="/admin/categories" class="admin-card">
      <h2>Categorías</h2>
      <p>Administra las categorías de productos</p>
    </a>
    <a href="/admin/inventory" class="admin-card">
      <h2>Inventario</h2>
      <p>Control de stock y variantes</p>
    </a>
  </div>
</div>

<style>
  .admin-dashboard {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  .admin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .admin-card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
    color: inherit;
  }

  .admin-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .admin-card h2 {
    margin: 0 0 0.5rem 0;
    color: #1a365d;
  }

  .admin-card p {
    margin: 0;
    color: #4a5568;
    font-size: 0.9rem;
  }
</style>
