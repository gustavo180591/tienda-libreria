# Design System - Tienda de Librería

## 🎨 Sistema de Diseño

### 1. Configuración de Tema

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      // Paleta de colores
      colors: {
        // Colores principales
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          DEFAULT: '#0ea5e9',
        },
        
        // Colores secundarios
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          DEFAULT: '#64748b',
        },
        
        // Estados
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
        
        // Fondos y superficies
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
      },
      
      // Tipografía
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      // Tamaños de fuente
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      
      // Sombras
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      
      // Bordes redondeados
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      
      // Transiciones
      transitionProperty: {
        none: 'none',
        all: 'all',
        DEFAULT: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
        colors: 'background-color, border-color, color, fill, stroke',
        opacity: 'opacity',
        shadow: 'box-shadow',
        transform: 'transform',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },
      
      // Animaciones personalizadas
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
```

### 2. Variables CSS para Temas

```css
/* app.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-background: #ffffff;
    --color-surface: #f9fafb;
    --color-border: #e5e7eb;
    --color-text: #1f2937;
  }
  
  .dark {
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-border: #334155;
    --color-text: #f3f4f6;
  }
  
  body {
    @apply bg-background text-text transition-colors duration-200;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}
```

## 🎯 Componentes Base

### 1. Botón Mejorado

```svelte
<!-- src/lib/components/ui/Button.svelte -->
<script lang="ts">
  import { classNames } from '$lib/utils/classNames';
  
  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  type Size = 'xs' | 'sm' | 'md' | 'lg';
  
  export let variant: Variant = 'primary';
  export let size: Size = 'md';
  export let fullWidth = false;
  export let loading = false;
  export let disabled = false;
  export let icon: string | null = null;
  export let iconPosition: 'left' | 'right' = 'left';
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 dark:bg-primary-700 dark:hover:bg-primary-600',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 dark:bg-secondary-700 dark:hover:bg-secondary-600',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  };
  
  const sizeClasses = {
    xs: 'px-2.5 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
</script>

<button
  class={classNames(
    'inline-flex items-center justify-center rounded-lg font-medium transition-all',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'active:scale-[0.98]',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-60 cursor-not-allowed',
  )}
  disabled={disabled || loading}
  on:click
  aria-busy={loading}
  {disabled}
>
  {#if icon && iconPosition === 'left' && !loading}
    <span class="mr-2" in:fly={{ y: -5, duration: 200 }} out:fly={{ y: 5, duration: 200 }}>
      {@html icon}
    </span>
  {/if}
  
  {#if loading}
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {/if}
  
  <span class="truncate">
    <slot />
  </span>
  
  {#if icon && iconPosition === 'right' && !loading}
    <span class="ml-2" in:fly={{ y: -5, duration: 200 }} out:fly={{ y: 5, duration: 200 }}>
      {@html icon}
    </span>
  {/if}
</button>
```

### 2. Tarjeta de Producto Mejorada

```svelte
<!-- src/lib/components/products/ProductCard.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  
  export let product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    isOnSale?: boolean;
    stock?: number;
  };
  
  let isHovered = false;
</script>

<article 
  class="group relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
  on:mouseenter={() => isHovered = true}
  on:mouseleave={() => isHovered = false}
>
  <!-- Badges -->
  <div class="absolute top-3 left-3 z-10 flex gap-2">
    {#if product.isNew}
      <span 
        class="px-2.5 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100"
        in:fly={{ y: -10, duration: 200 }}
        out:fly={{ y: 0, duration: 200 }}
      >
        Nuevo
      </span>
    {/if}
    {#if product.isOnSale && product.originalPrice}
      <span 
        class="px-2.5 py-1 text-xs font-medium text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-100 rounded-full"
        in:fly={{ y: -10, duration: 200, delay: 50 }}
        out:fly={{ y: 0, duration: 200 }}
      >
        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
      </span>
    {/if}
  </div>

  <!-- Imagen con efecto de zoom y overlay -->
  <div class="relative overflow-hidden aspect-square bg-gray-100 dark:bg-gray-700">
    {#if product.imageUrl}
      <img
        src={product.imageUrl}
        alt={product.name}
        class="w-full h-full object-cover transition-transform duration-500 ease-in-out"
        class:group-hover:scale-105={isHovered}
        loading="lazy"
      />
    {:else}
      <div class="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-600">
        <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    {/if}
    
    <!-- Overlay de acciones -->
    <div 
      class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100"
    >
      <button 
        class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-110"
        aria-label="Ver detalles rápidos"
      >
        <svg class="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
      <button 
        class="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-110"
        aria-label="Añadir a favoritos"
      >
        <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Contenido -->
  <div class="p-4">
    <div class="flex justify-between items-start">
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 h-10">
          {product.name}
        </h3>
        
        <!-- Rating -->
        {#if product.rating !== undefined}
          <div class="flex items-center mt-1">
            <div class="flex text-amber-400">
              {#each Array(5) as _, i}
                {#if i < Math.floor(product.rating)}
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {:else if i < Math.ceil(product.rating)}
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <defs>
                      <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                        <stop offset="50%" stop-color="#fbbf24" />
                        <stop offset="50%" stop-color="#d1d5db" />
                      </linearGradient>
                    </defs>
                    <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {:else}
                  <svg class="w-3.5 h-3.5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                {/if}
              {/each}
            </div>
            {#if product.reviewCount}
              <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
            {/if}
          </div>
        {/if}
      </div>
      
      <!-- Precio -->
      <div class="ml-2 text-right">
        {#if product.originalPrice}
          <p class="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 line-through">${product.originalPrice.toFixed(2)}</p>
        {:else}
          <p class="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
        {/if}
      </div>
    </div>

    <!-- Stock -->
    {#if product.stock !== undefined}
      <div class="mt-2">
        <div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
          <div 
            class="bg-green-600 h-1.5 rounded-full" 
            style={`width: ${Math.min(100, (product.stock / 10) * 100)}%`}
          ></div>
        </div>
        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {product.stock > 0 
            ? `${product.stock} disponibles` 
            : 'Sin stock'}
        </p>
      </div>
    {/if}

    <!-- Botón de acción -->
    <button 
      class="mt-3 w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={product.stock === 0}
      aria-label={product.stock > 0 ? 'Añadir al carrito' : 'Sin stock'}
    >
      {product.stock > 0 ? (
        <>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Añadir al carrito
        </>
      ) : (
        'Sin stock'
      )}
    </button>
  </div>
</article>
```

### 3. Utilidades

```typescript
// src/lib/utils/classNames.ts
export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
```

## 🚀 Optimizaciones

### 1. Configuración de Vite

```javascript
// vite.config.js
export default {
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['svelte', 'svelte/store'],
        },
      },
    },
  },
  plugins: [
    // Otros plugins...
  ],
};
```

### 2. Estilos Críticos

```html
<!-- En tu layout principal -->
<style>
  /* Estilos críticos inline */
  :root {
    --color-primary: #0ea5e9;
    --color-primary-dark: #0284c7;
    --color-text: #1f2937;
    --color-background: #ffffff;
    --color-surface: #f9fafb;
    --color-border: #e5e7eb;
  }
  
  .dark {
    --color-text: #f3f4f6;
    --color-background: #0f172a;
    --color-surface: #1e293b;
    --color-border: #334155;
  }
  
  /* Fuente del sistema mientras carga la web */
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
</style>
```

## 📱 Breakpoints y Grid

```svelte
<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
  <!-- Items del grid -->
  <ProductCard />
</div>
```

## 🎨 Uso de Temas

```svelte
<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  
  let theme = 'light';
  
  onMount(() => {
    // Cargar tema guardado o usar preferencia del sistema
    if (browser) {
      const savedTheme = localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme) {
        theme = savedTheme;
      } else if (systemPrefersDark) {
        theme = 'dark';
      }
      
      // Aplicar tema
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  });
  
  function toggleTheme() {
    theme = theme === 'light' ? 'dark' : 'light';
    
    if (browser) {
      // Guardar preferencia
      localStorage.setItem('theme', theme);
      // Aplicar tema
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }
</script>

<button on:click={toggleTheme} class="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
  {#if theme === 'light'}
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  {:else}
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  {/if}
  <span class="sr-only">Cambiar tema</span>
</button>
```

## 🔍 Accesibilidad

### 1. Enfoque Visible

```css
/* app.css */
button:focus-visible,
a:focus-visible,
[tabindex="0"]:focus-visible {
  @apply ring-2 ring-offset-2 ring-primary-500 outline-none;
}
```

### 2. Texto Oculto para Screen Readers

```svelte
<span class="sr-only">Descripción para lectores de pantalla</span>
```

## 📝 Notas de Implementación

1. **Variables CSS**: Usa variables para temas dinámicos
2. **Componentes Reutilizables**: Crea componentes para patrones comunes
3. **Optimización de Imágenes**: Usa formatos modernos como WebP con fallbacks
4. **Carga Perezosa**: Para imágenes fuera del viewport
5. **Accesibilidad**: Siempre incluye texto alternativo y atributos ARIA

## 🛠️ Herramientas Recomendadas

- **Svelte Inspector**: Para depuración de componentes
- **Tailwind CSS IntelliSense**: Autocompletado en el editor
- **Headless UI**: Componentes accesibles sin estilos
- **Heroicons**: Biblioteca de iconos recomendada

## 📚 Recursos

- [Documentación de Tailwind CSS 4](https://tailwindcss.com/docs)
- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Open Props](https://open-props.style/): Variables CSS modernas
- [Tailwind UI](https://tailwindui.com/): Componentes premium
🖌️ Tipografía
javascript
// tailwind.config.js
export default {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Poppins', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  }
}
🎯 Componentes Base
Botones
svelte
<!-- Button.svelte -->
<script lang="ts">
  import { classNames } from '$lib/utils/classNames';
  
  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
  type Size = 'sm' | 'md' | 'lg';
  
  export let variant: Variant = 'primary';
  export let size: Size = 'md';
  export let fullWidth = false;
  export let loading = false;
  export let disabled = false;
  
  const variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
</script>

<button
  class={classNames(
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50 cursor-not-allowed'
  )}
  disabled={disabled || loading}
  on:click
>
  {#if loading}
    <svg class="mr-2 -ml-1 w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {/if}
  <slot />
</button>
Tarjetas de Producto
svelte
<!-- ProductCard.svelte -->
<script lang="ts">
  export let product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
    rating?: number;
    reviewCount?: number;
    isNew?: boolean;
    isOnSale?: boolean;
  };
</script>

<article class="overflow-hidden relative bg-white rounded-xl shadow-sm transition-shadow group hover:shadow-md">
  <!-- Badges -->
  <div class="flex absolute top-3 left-3 z-10 gap-2">
    {#if product.isNew}
      <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
        Nuevo
      </span>
    {/if}
    {#if product.isOnSale}
      <span class="px-2.5 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full">
        Oferta
      </span>
    {/if}
  </div>

  <!-- Imagen -->
  <div class="overflow-hidden w-full bg-gray-100 aspect-square">
    {#if product.imageUrl}
      <img
        src={product.imageUrl}
        alt={product.name}
        class="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    {:else}
      <div class="flex justify-center items-center h-full bg-gray-200">
        <svg class="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    {/if}
  </div>

  <!-- Contenido -->
  <div class="p-4">
    <h3 class="h-10 text-sm font-medium text-gray-900 line-clamp-2">
      {product.name}
    </h3>
    
    <div class="flex items-center mt-2">
      {#if product.originalPrice}
        <p class="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
        <p class="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
        <span class="px-1.5 py-0.5 ml-2 text-xs font-medium text-red-800 bg-red-100 rounded">
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </span>
      {:else}
        <p class="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
      {/if}
    </div>

    {#if product.rating && product.reviewCount}
      <div class="flex items-center mt-2">
        <div class="flex text-amber-400">
          {#each Array(5) as _, i}
            {#if i < Math.floor(product.rating)}
              <StarIcon class="w-4 h-4 fill-current" />
            {:else if i < Math.ceil(product.rating)}
              <StarHalfIcon class="w-4 h-4 fill-current" />
            {:else}
              <StarIcon class="w-4 h-4 text-gray-300" />
            {/if}
          {/each}
        </div>
        <span class="ml-1 text-xs text-gray-500">({product.reviewCount})</span>
      </div>
    {/if}

    <button class="px-4 py-2 mt-4 w-full text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700">
      Agregar al carrito
    </button>
  </div>
</article>
🎚️ Utilidades Personalizadas
Animaciones
javascript
// tailwind.config.js
export default {
  extend: {
    animation: {
      'fade-in': 'fadeIn 200ms ease-out',
      'slide-up': 'slideUp 300ms ease-out',
      'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      slideUp: {
        '0%': { transform: 'translateY(10px)', opacity: '0' },
        '100%': { transform: 'translateY(0)', opacity: '1' },
      },
    },
  }
}
Breakpoints
javascript
// tailwind.config.js
export default {
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  }
}
🎨 Temas y Modo Oscuro
javascript
// tailwind.config.js
export default {
  darkMode: 'class', // o 'media' para usar prefers-color-scheme
  theme: {
    extend: {
      colors: {
        dark: {
          800: '#1a1a1a',
          900: '#0d0d0d',
        }
      }
    }
  }
}
🚀 Optimizaciones
PurgeCSS: Elimina estilos no utilizados
JIT Mode: Habilita compilación bajo demanda
Font Display: Mejora el rendimiento de tipografía
Lazy Loading: Para imágenes fuera del viewport
javascript
// vite.config.js
export default {
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['svelte', 'svelte/store'],
        }
      }
    }
  }
}
📱 Breakpoints y Grid
svelte
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <!-- Items del grid -->
</div>
📝 Notas de Implementación
Variables CSS: Usa variables CSS para temas dinámicos
Clases de Utilidad: Compone estilos con @apply solo cuando sea necesario
Componentes Svelte: Crea componentes reutilizables para patrones comunes
Accesibilidad: Siempre incluye aria-* y role cuando sea necesario
Rendimiento: Usa loading="lazy" en imágenes fuera del viewport
🛠️ Herramientas Recomendadas
Svelte Inspector: Para depuración de componentes
Tailwind CSS IntelliSense: Autocompletado en el editor
Headless UI: Componentes accesibles sin estilos
Heroicons: Biblioteca de iconos recomendada
📚 Recursos
Documentación de Tailwind CSS 4
SvelteKit Documentation
Open Props: Variables CSS modernas
Tailwind UI: Componentes premium