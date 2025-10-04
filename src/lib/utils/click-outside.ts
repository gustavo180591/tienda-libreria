import type { Action } from 'svelte/action';

type ClickOutsideOptions = {
  enabled?: boolean;
  callback: (event: MouseEvent) => void;
};

type ClickOutsideAction = Action<HTMLElement, ClickOutsideOptions>;

export const clickOutside: ClickOutsideAction = (node, options) => {
  let isEnabled = options?.enabled ?? true;
  let callback = options?.callback || (() => {});

  function handleClick(event: MouseEvent) {
    if (!isEnabled) return;
    
    const target = event.target as Node;
    
    // Si el clic fue fuera del nodo
    if (node && !node.contains(target) && !event.defaultPrevented) {
      callback(event);
    }
  }

  // Agregar manejador de eventos
  document.addEventListener('click', handleClick, true);

  return {
    update(newOptions: ClickOutsideOptions) {
      // Actualizar opciones
      isEnabled = newOptions?.enabled ?? true;
      callback = newOptions?.callback || (() => {});
    },
    destroy() {
      // Limpiar manejador de eventos
      document.removeEventListener('click', handleClick, true);
    },
  };
};
