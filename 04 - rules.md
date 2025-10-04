# Reglas y Guías - Tienda Librería

## 1. Gestión de Productos

### 1.1. Productos
- **SKU**: Debe ser único (case-insensitive)
- **Precios**: Siempre en formato decimal con 2 decimales
- **Stock**: No puede ser negativo
- **Estado**: `isActive` controla la visibilidad en el catálogo

### 1.2. Categorías
- **Slug**: Único (case-insensitive), usado en URLs
- **Productos inactivos**: No son visibles en el catálogo

## 2. Proceso de Compra

### 2.1. Carrito
- **Sesión**: Los carritos están vinculados a una sesión o usuario autenticado
- **Vigencia**: Los carritos inactivos por más de 30 días se eliminan automáticamente

### 2.2. Órdenes
- **Estados**:
  - `PENDING`: Recién creada, pendiente de pago
  - `PROCESSING`: Pago recibido, en preparación
  - `COMPLETED`: Enviada al cliente
  - `CANCELLED`: Cancelada o reembolsada
- **Moneda**: Todos los ítems en una orden deben usar la misma moneda
- **Total**: `lineTotal = unitPrice * quantity` (validado en el backend)
- **Histórico**: Se guarda snapshot de precios y detalles al momento de la compra

## 3. Gestión de Usuarios

### 3.1. Roles
- `CUSTOMER`: Cliente regular
- `MANAGER`: Gestión de productos y órdenes
- `ADMIN`: Acceso total al sistema

### 3.2. Autenticación
- Contraseñas: Hash seguro (bcrypt)
- Emails: Únicos (case-insensitive)

## 4. Reglas de Validación

### 4.1. Direcciones
- País por defecto: Argentina
- Código postal: Formato válido según el país

### 4.2. Pagos
- Montos no pueden ser negativos
- El monto total debe coincidir con la suma de los ítems

## 5. Rendimiento

### 5.1. Índices
- Búsquedas por email, SKU y slugs son case-insensitive
- Índices compuestos para consultas frecuentes

### 5.2. Caché
- Catálogo de productos en caché con invalidación por cambios

## 6. Auditoría
- Todos los cambios importantes registran:
  - Usuario que realizó el cambio
  - Fecha y hora
  - Valores anteriores y nuevos

## 7. Seguridad
- No se almacenan datos sensibles de pago
- Acceso a rutas protegidas por roles
- Validación de entrada en todos los endpoints

## 8. Guía de Diseño

### 8.1. Configuración de Tema

```javascript
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      // Paleta de colores
      colors: {
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
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
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

### 8.2. Variables CSS para Temas

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

### 8.3. Componentes Base

#### Botón Mejorado

```svelte
<!-- src/lib/components/ui/Button.svelte -->
<script lang="ts">
  import { classNames } from '$lib/utils/classNames';
  
  type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  type Size = 'sm' | 'md' | 'lg';
  
  export let variant: Variant = 'primary';
  export let size: Size = 'md';
  export let fullWidth = false;
  export let loading = false;
  export let disabled = false;
  export let type = 'button';
  
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
</script>

<button
  {type}
  class={classNames(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    loading ? 'opacity-70 cursor-not-allowed' : ''
  )}
  {disabled}
  on:click
>
  {#if loading}
    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {/if}
  <slot />
</button>
```

#### Tarjeta de Producto

```svelte
<article class="overflow-hidden relative bg-white rounded-xl shadow-sm transition-shadow group hover:shadow-md">
  <!-- Badges -->
  <div class="absolute top-3 left-3 z-10 flex gap-2">
    {#if product.isNew}
      <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
        Nuevo
      </span>
    {/if}
    {#if product.discount > 0}
      <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
        -{product.discount}%
      </span>
    {/if}
  </div>
  
  <!-- Imagen del producto -->
  <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
    <img 
      src={product.imageUrl} 
      alt={product.name}
      class="h-full w-full object-cover object-center group-hover:opacity-75"
      loading="lazy"
    />
  </div>
  
  <!-- Contenido -->
  <div class="p-4">
    <h3 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 h-10">
      {product.name}
    </h3>
    
    <div class="mt-2 flex items-center justify-between">
      <div>
        {#if product.discount > 0}
          <p class="text-sm text-gray-500 line-through">
            ${product.price.toFixed(2)}
          </p>
          <p class="text-lg font-semibold text-gray-900 dark:text-white">
            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
          </p>
        {:else}
          <p class="text-lg font-semibold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </p>
        {/if}
      </div>
      
      <button
        class="rounded-full bg-primary-600 p-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Agregar al carrito"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
    </div>
  </div>
</article>
```

### 8.4. Layout y Grid

#### Sistema de Grid Responsive

```svelte
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <!-- Items del grid -->
  {#each products as product}
    <ProductCard {product} />
  {/each}
</div>
```

### 8.5. Transiciones y Animaciones

#### Animaciones Predefinidas
```css
/* Animaciones personalizadas */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}
```

### 8.6. Breakpoints Responsive
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 9. Mejores Prácticas

### 9.1. Uso de Variables CSS
- Usa variables CSS para temas dinámicos
- Define colores, espaciados y tipografías como variables

### 9.2. Clases de Utilidad
- Usa `@apply` solo cuando sea necesario para componentes reutilizables
- Evita anidar estilos innecesariamente

### 9.3. Accesibilidad
- Incluye siempre atributos `aria-*` relevantes
- Usa `role` apropiados para componentes complejos
- Asegura contraste adecuado en textos

### 9.4. Rendimiento
- Usa `loading="lazy"` para imágenes fuera del viewport
- Optimiza y comprime imágenes
- Implementa lazy loading para componentes pesados

### 9.5. Herramientas Recomendadas
- **Svelte Inspector**: Para depuración de componentes
- **Tailwind CSS IntelliSense**: Autocompletado en el editor
- **Headless UI**: Componentes accesibles sin estilos
- **Heroicons**: Biblioteca de iconos recomendada

## 9. Recursos
- **Documentación de Tailwind CSS 4**: [https://tailwindcss.com](https://tailwindcss.com)
- **Documentación de SvelteKit**: [https://kit.svelte.dev](https://kit.svelte.dev)
- **Heroicons**: [https://heroicons.com](https://heroicons.com)
- **Headless UI**: [https://headlessui.com](https://headlessui.com)

---

*Última actualización: 04/10/2024*
