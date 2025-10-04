# roadmap — Tienda de Librería (basado en cliente.md)
> Versión 2.2 — Fecha: 2025-10-01 — Actualizado por: Gustavo (Analista Programador)

## 1) roadmap - Tienda Librería

## Stack Tecnológico

### Entorno de Ejecución
- Node.js v22.20.0 (LTS)
- npm 10.x

### Frontend
- Svelte 5.0.0
- SvelteKit 2.23.0
- TypeScript 5.5.4
- Vite 6.2.0
- Tailwind CSS 4.0.0
  - @tailwindcss/typography
  - @tailwindcss/forms

### Backend
- Prisma 5.14.0
- JSON Web Tokens (JWT)
- BcryptJS 2.4.3
- Zod 3.22.0 (validación)

### Base de Datos
- PostgreSQL 16+
- Prisma ORM 5.14.0

### Herramientas de Desarrollo
- ESLint 9.18.0
- Prettier 3.4.2
- TypeScript ESLint
- Prettier Plugins

---

## roadmap Detallado

### Semana 1-2: Infraestructura y Autenticación 

#### Configuración Inicial (Completado) 
- [x] Configuración de Node.js v22.20.0
- [x] Estructura de proyecto SvelteKit 2.23.0
- [x] Configuración de TypeScript 5.5.4
- [x] Integración con Prisma 5.14.0
- [x] Configuración de base de datos PostgreSQL

#### Autenticación y Autorización
- [x] **Sistema de Autenticación JWT**
  - [x] `POST /auth/register` - Registro de usuarios
    - [x] Validación con Zod 3.22.0
    - [x] Hash de contraseñas con BcryptJS 2.4.3
  - [x] `POST /auth/login` - Login con JWT
    - [x] Generación de tokens JWT
    - [x] Manejo de sesiones seguras
  - [x] Middleware de autenticación
    - [x] Verificación de tokens JWT
    - [x] Extracción de datos de usuario
  - [ ] Control de roles (Admin/Manager/Cliente)
    - [ ] Middleware de autorización
    - [ ] Protección de rutas por roles

#### API Base (Parcialmente Completado) 
- [x] Estructura de rutas modular (SvelteKit)
- [x] Manejo centralizado de errores
- [ ] Validación de datos con Zod 3.22.0
  - Esquemas para todas las entradas
  - Mensajes de error personalizados
- [ ] Documentación OpenAPI
  - Generación automática con Swagger UI
  - Documentación de endpoints

### Semana 3-4: Catálogo de Productos 

#### Gestión de Productos
- [ ] **API de Productos**
  - [ ] `GET /products` - Lista paginada
    - Filtros: búsqueda, categoría, stock
    - Ordenamiento personalizado
    - Paginación con límite y offset
  - [ ] `POST /products` - Crear producto
    - Validación con Zod
    - Manejo de imágenes (almacenamiento local/S3)
    - Creación de variantes
  - [ ] `GET /products/{id}` - Detalle de producto
    - Inclusión opcional de variantes
    - Información de stock en tiempo real
  - [ ] `PATCH /products/{id}` - Actualizar producto
    - Actualización parcial
    - Validación de datos
  - [ ] `DELETE /products/{id}` - Eliminar producto
    - Eliminación lógica (soft delete)
    - Verificación de existencias en órdenes

#### Frontend de Productos
- [ ] Listado de productos
  - Vista de cuadrícula/lista
  - Filtros y ordenamiento
  - Paginación
- [ ] Formulario de producto
  - Validación en tiempo real
  - Subida de imágenes
  - Gestión de variantes
  - [ ] `DELETE /variants/{id}` - Eliminar variante

### Semana 5-6: Carrito y Checkout 🛒
- [ ] **Carrito**:
  - [ ] `POST /cart/items` - Agregar ítem
  - [ ] `GET /cart` - Ver carrito actual
  - [ ] `PATCH /cart/items/{id}` - Actualizar cantidad
  - [ ] `DELETE /cart/items/{id}` - Eliminar ítem

- [ ] **Checkout**:
  - [ ] `POST /checkout` - Iniciar checkout
  - [ ] Integración Mercado Pago
  - [ ] Webhook de notificaciones
  - [ ] Reserva de stock

### Semana 7-8: Gestión de Pedidos 📦
- [ ] **Pedidos**:
  - [ ] `GET /orders` - Lista de pedidos
  - [ ] `POST /orders` - Crear pedido
  - [ ] `GET /orders/{id}` - Detalle del pedido
  - [ ] `PATCH /orders/{id}` - Actualizar estado
  - [ ] `POST /orders/{id}/cancel` - Cancelar pedido

### Mes 2: Mejoras y Optimizaciones ⚡
- [ ] **Sistema de Búsqueda**:
  - [ ] Búsqueda full-text
  - [ ] Filtros avanzados
  - [ ] Ordenamiento personalizado

- [ ] **Rendimiento**:
  - [ ] Caché de consultas
  - [ ] Paginación eficiente
  - [ ] Optimización de consultas

### Mes 3: Experiencia de Usuario ✨
- [ ] **Panel de Administración**:
  - [ ] Gestión de productos/variantes
  - [ ] Dashboard de ventas
  - [ ] Reportes básicos

- [ ] **Características Adicionales**:
  - [ ] Sistema de reseñas
  - [ ] Wishlist
  - [ ] Notificaciones en tiempo real

## 2) Prioridades Técnicas

### Backend (Core)
1. **API RESTful** siguiendo estándares
2. **Seguridad JWT** con refresh tokens
3. **Validación de datos** estricta
4. **Manejo de errores** consistente
5. **Logging** estructurado

### Frontend (Fase 2)
1. **Diseño responsive** (mobile-first)
2. **Gestión de estado** con Svelte stores
3. **Validación de formularios**
4. **Manejo de errores** amigable

## 3) Métricas de Éxito
- **Rendimiento**: <500ms por petición API
- **Disponibilidad**: 99.9% uptime
- **Seguridad**: 0 vulnerabilidades críticas
- **Código**: >80% cobertura de tests

## 4) Próximos Pasos
1. Revisar estructura de carpetas
2. Implementar autenticación
3. Desarrollar módulo de productos
4. Configurar CI/CD
5. Realizar pruebas de integración