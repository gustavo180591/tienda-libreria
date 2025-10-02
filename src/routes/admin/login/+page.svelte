<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidate } from '$app/navigation';
  
  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;

  async function handleLogin(event: Event) {
    try {
      isLoading = true;
      error = '';
      
      // TODO: Replace with actual authentication logic
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error de autenticación');
      }

      // Redirect to admin dashboard on success
      window.location.href = '/admin';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Login error:', err);
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="login-container">
  <div class="logo">
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 9L12 16L21 9L12 2Z" fill="#4299E1"/>
      <path d="M3 17L12 24L21 17" stroke="#4299E1" stroke-width="2" stroke-linecap="round"/>
      <path d="M3 13L12 20L21 13" stroke="#3182CE" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <h1>Tienda Librería</h1>
    <p>Panel de Administración</p>
  </div>

  {#if error}
    <div class="error-message">
      {error}
    </div>
  {/if}

  <form on:submit|preventDefault={handleLogin}>
    <div class="form-group">
      <label for="email">Correo Electrónico</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        required
        placeholder="tu@email.com"
        disabled={isLoading}
      />
    </div>

    <div class="form-group">
      <label for="password">Contraseña</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        required
        placeholder="••••••••"
        disabled={isLoading}
      />
    </div>

    <button type="submit" disabled={isLoading} class="login-button">
      {#if isLoading}
        Iniciando sesión...
      {:else}
        Iniciar Sesión
      {/if}
    </button>
  </form>

  <div class="forgot-password">
    <a href="/admin/forgot-password">¿Olvidaste tu contraseña?</a>
  </div>
</div>

<style>
  .login-container {
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

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
  }

  .login-button {
    width: 100%;
    background-color: #4299e1;
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .login-button:hover {
    background-color: #3182ce;
  }

  .login-button:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }

  .forgot-password {
    text-align: center;
    margin-top: 1.5rem;
  }

  .forgot-password a {
    color: #4299e1;
    text-decoration: none;
    font-size: 0.875rem;
  }

  .forgot-password a:hover {
    text-decoration: underline;
  }

  .error-message {
    background-color: #fff5f5;
    color: #e53e3e;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    font-size: 0.875rem;
    border-left: 4px solid #e53e3e;
  }
</style>
