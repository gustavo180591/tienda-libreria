<script lang="ts">
  import { page } from '$app/stores';
  
  // Define the expected props
  export let status: number;
  export let error: Error;
  export let message: string;
  
  // Set default values
  $: status = $page.status || 500;
  $: message = error?.message || 'An unexpected error occurred';
  
  // Common error messages
  const errorMessages: Record<number, string> = {
    404: 'Page not found',
    500: 'Internal server error',
    401: 'Unauthorized',
    403: 'Forbidden'
  };
  
  // Get the appropriate error message
  $: statusMessage = errorMessages[status] || 'Something went wrong';
</script>

<div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-md">
    <h1 class="text-center text-6xl font-extrabold text-gray-900 mb-4">
      {status}
    </h1>
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
      {statusMessage}
    </h2>
    
    {#if message}
      <p class="mt-2 text-center text-sm text-gray-600">
        {message}
      </p>
    {/if}
    
    <div class="mt-8 text-center">
      <a 
        href="/" 
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Go back home
      </a>
    </div>
  </div>
</div>
