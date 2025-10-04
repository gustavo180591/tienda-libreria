<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  import { z } from 'zod';
  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  
  // Esquema de validación con Zod
  const registerSchema = z.object({
    firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
    email: z.string().email('Por favor ingresa un correo electrónico válido'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(8, 'La confirmación de contraseña es requerida')
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  });

  // Inicializar el formulario
  const form = await superForm(zod(registerSchema));
  
  // Estado del formulario
  let formError = '';
  let loading = false;
  
  // Función para manejar el envío del formulario
  async function handleSubmit() {
    if (loading) return;
    
    formError = '';
    loading = true;
    
    try {
      const { confirmPassword, ...userData } = $form;
      
      // Registrar el usuario
      await auth.register(userData);
      
      // Redirigir después del registro exitoso
      const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
      goto(redirectTo);
    } catch (error) {
      formError = error instanceof Error ? error.message : 'Error al registrar el usuario';
      console.error('Error en el registro:', error);
    } finally {
      loading = false;
    }
  }
  
  // Redirigir si ya está autenticado
  $: if ($auth.isAuthenticated) {
    const redirectTo = $page.url.searchParams.get('redirectTo') || '/';
    goto(redirectTo);
  }
</script>

<div class="space-y-6">
  <h2 class="text-center text-2xl font-bold text-gray-900">
    Crea tu cuenta
  </h2>
  
  {#if formError}
    <div class="rounded-md bg-red-50 p-4 mb-4">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">{formError}</h3>
        </div>
      </div>
    </div>
  {/if}
  
  <form class="space-y-6" method="POST" use:form.formAction on:submit|preventDefault={handleSubmit}>
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label for="firstName" class="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <div class="mt-1">
          <input
            type="text"
            id="firstName"
            name="firstName"
            autocomplete="given-name"
            required
            bind:value={$form.firstName}
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {#if $formErrors?.firstName}
          <p class="mt-2 text-sm text-red-600">{$formErrors.firstName}</p>
        {/if}
      </div>

      <div class="sm:col-span-3">
        <label for="lastName" class="block text-sm font-medium text-gray-700">
          Apellido
        </label>
        <div class="mt-1">
          <input
            type="text"
            id="lastName"
            name="lastName"
            autocomplete="family-name"
            required
            bind:value={$form.lastName}
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {#if $formErrors?.lastName}
          <p class="mt-2 text-sm text-red-600">{$formErrors.lastName}</p>
        {/if}
      </div>

      <div class="sm:col-span-6">
        <label for="email" class="block text-sm font-medium text-gray-700">
          Correo electrónico
        </label>
        <div class="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            bind:value={$form.email}
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {#if $formErrors?.email}
          <p class="mt-2 text-sm text-red-600">{$formErrors.email}</p>
        {/if}
      </div>

      <div class="sm:col-span-3">
        <label for="password" class="block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <div class="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="new-password"
            required
            bind:value={$form.password}
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {#if $formErrors?.password}
          <p class="mt-2 text-sm text-red-600">{$formErrors.password}</p>
        {/if}
      </div>

      <div class="sm:col-span-3">
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
          Confirmar contraseña
        </label>
        <div class="mt-1">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="new-password"
            required
            bind:value={$form.confirmPassword}
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {#if $formErrors?.confirmPassword}
          <p class="mt-2 text-sm text-red-600">{$formErrors.confirmPassword}</p>
        {/if}
      </div>
    </div>

    <div>
      <button
        type="submit"
        disabled={loading}
        class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if loading}
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Creando cuenta...
        {:else}
          Crear cuenta
        {/if}
      </button>
    </div>
  </form>

  <div class="mt-6">
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="bg-white px-2 text-gray-500">¿Ya tienes una cuenta?</span>
      </div>
    </div>

    <div class="mt-6">
      <a
        href="/auth/login"
        class="flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        Iniciar sesión
      </a>
    </div>
  </div>
</div>
