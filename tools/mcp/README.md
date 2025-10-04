# MCP - Modelo de Control de Procesos

Este directorio contiene las herramientas y configuraciones para automatizar tareas de desarrollo utilizando MCP.

## Estructura

- `servers/`: Conectores a servicios externos (Linear, GitHub, etc.)
- `prompts/`: Plantillas para generación de contenido
- `playbooks/`: Flujos de trabajo automatizados
- `logs/`: Registros de ejecución

## Configuración

1. Copia el archivo `.env.example` a `.env` y completa las variables de entorno necesarias.
2. Instala las dependencias con `npm install`.

## Uso

Ejecuta los playbooks con el comando:

```bash
node playbooks/nombre-del-playbook.js
```

## Playbooks disponibles

- `backlog_from_requirements`: Genera historias de usuario a partir de requisitos
- `tdd_scaffold`: Genera código base para pruebas TDD
- `release_notes`: Genera notas de versión automáticamente

## Seguridad

- No subas el archivo `.env` al repositorio
- Usa tokens con los mínimos permisos necesarios
- Revisa los logs después de cada ejecución
