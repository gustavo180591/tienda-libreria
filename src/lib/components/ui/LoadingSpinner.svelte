<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };
  
  const borderClasses = {
    sm: 'border-2',
    md: 'border-2',
    lg: 'border-4',
  };
</script>

<div class="flex items-center justify-center">
  <div
    class={`animate-spin rounded-full ${borderClasses[size]} border-solid border-indigo-500 border-t-transparent ${sizeClasses[size]}`}
    role="status"
  >
    <span class="sr-only">Cargando...</span>
  </div>
</div>
