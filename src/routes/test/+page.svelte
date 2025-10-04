<script lang="ts">
  // Simple test page to verify routing
  import { onMount } from 'svelte';
  
  onMount(() => {
    console.log('Test page loaded!');
  });
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-50">
  <div class="text-center p-8 bg-white rounded-lg shadow-lg">
    <h1 class="text-3xl font-bold text-indigo-600 mb-4">Test Page</h1>
    <p class="text-gray-600 mb-6">If you can see this, routing is working!</p>
    <a 
      href="/" 
      class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
    >
      Go to Home
    </a>
  </div>
</div>
