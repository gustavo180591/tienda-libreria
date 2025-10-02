# Roadmap — Tienda de Librería (basado en cliente.md)
> Versión 2.2 — Fecha: 2025-10-01 — Actualizado por: Gustavo (Analista Programador)

## 1) Roadmap 30/60/90 días

### Semana 1-2: Infraestructura y Autenticación 🏗️
- [x] Configuración inicial del proyecto y base de datos ✅
- [ ] **Autenticación y Autorización**:
  - [ ] `POST /auth/register` - Registro de usuarios
  - [ ] `POST /auth/login` - Login con JWT
  - [ ] Middleware de autenticación
  - [ ] Control de roles (Admin/Manager/Cliente)

- [x] **API Base** ✅
  - [x] Estructura de rutas modular
  - [x] Manejo centralizado de errores
  - [ ] Validación de datos con Zod
  - [ ] Documentación OpenAPI

### Semana 3-4: Catálogo de Productos 📦
- [ ] **Productos**:
  - [ ] `GET /products` - Lista paginada (filtros: q, page, pageSize, sort)
  - [ ] `POST /products` - Crear producto
  - [ ] `GET /products/{id}` - Detalle con ?include=variants
  - [ ] `PATCH /products/{id}` - Actualizar producto
  - [ ] `DELETE /products/{id}` - Eliminar producto

- [ ] **Variantes**:
  - [ ] `GET /products/{id}/variants` - Listar variantes
  - [ ] `POST /products/{id}/variants` - Crear variante
  - [ ] `GET /variants` - Búsqueda global
  - [ ] `PATCH /variants/{id}` - Actualizar variante
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