# Roadmap - Tienda de Librería Online

> Basado en los requerimientos de `cliente.md` - Última actualización: 27/09/2025

## 🚀 Fase 1: Configuración Inicial (Semana 1)

### 📦 Infraestructura Básica
- [x] Configurar repositorio Git con estructura inicial
- [x] Configurar Docker y docker-compose para desarrollo local
  - PostgreSQL 16
  - Redis (para manejo de sesiones y colas)
  - Adminer (opcional para gestión visual de la base de datos)
- [x] Configurar SvelteKit con TypeScript
- [x] Configurar Tailwind CSS 4
- [x] Configurar ESLint y Prettier

### 🗄️ Base de Datos
- [x] Diseñar esquema de base de datos inicial con Prisma
  - Modelos: Usuario, Producto, Variante, Categoría, Marca, Pedido, ItemPedido, Pago, Envío
- [x] Configurar migraciones con Prisma
- [x] Crear seeders para datos iniciales

## 🛍️ Fase 2: Catálogo de Productos (En Progreso)

### 🔍 Frontend - Catálogo
- [x] Página de inicio con productos destacados
- [ ] Página de categorías y subcategorías
- [ ] Página de detalle de producto con variantes
- [ ] Búsqueda y filtros básicos
- [x] Diseño responsive (móvil primero)

### 🛠️ En Progreso (Semana Actual)
- [ ] Componente de tarjeta de producto
- [ ] Integración con la API de productos
- [ ] Manejo de imágenes de productos
- [ ] Sistema de valoraciones y reseñas

### 🖥️ Backend - API de Productos
- [x] Endpoints para listar productos con filtros
- [x] Endpoint para detalle de producto
- [ ] Búsqueda por texto (PostgreSQL full-text search)
- [x] Manejo de imágenes (almacenamiento local)
- [ ] Documentación de la API con Swagger/OpenAPI

## 🛒 Fase 3: Carrito y Checkout (Semana 3-4)

### 🛍️ Carrito de Compras
- [ ] Gestión de carrito en tiempo real
- [ ] Persistencia del carrito (localStorage + base de datos)
- [ ] Cálculo de totales y resumen de compra

### 💳 Checkout
- [ ] Formulario de datos de envío/facturación
- [ ] Integración con API de geolocalización para códigos postales
- [ ] Cálculo de costos de envío
- [ ] Selección de método de pago (Mercado Pago)
- [ ] Reserva de stock al iniciar checkout (15 minutos)

### 🔄 Webhooks de Pago
- [ ] Integración con Mercado Pago Checkout Pro
- [ ] Webhook para actualización de estados de pago
- [ ] Lógica para actualizar stock al confirmar pago

## 👨‍💼 Fase 4: Panel de Administración (Semana 5)

### 📊 Dashboard
- [ ] Resumen de ventas y métricas
- [ ] Gráficos de productos más vendidos

### 📦 Gestión de Productos
- [ ] CRUD de productos y variantes
- [ ] Carga masiva de productos vía CSV
- [ ] Gestión de imágenes

### 📦 Gestión de Pedidos
- [ ] Listado de pedidos con filtros
- [ ] Cambio de estados de pedido
- [ ] Gestión de envíos y seguimiento

## 📱 Fase 5: Usuarios y Autenticación (Semana 6)

### 🔐 Autenticación
- [ ] Registro e inicio de sesión
- [ ] Autenticación con email/contraseña
- [ ] Recuperación de contraseña
- [ ] Perfil de usuario

### 📱 Área de Cliente
- [ ] Historial de pedidos
- [ ] Direcciones guardadas
- [ ] Preferencias de notificación

## 🚚 Fase 6: Envíos y Logística (Semana 7)

### 📦 Gestión de Envíos
- [ ] Cálculo de costos por zona/CP
- [ ] Integración con Andreani/OCA (opcional)
- [ ] Generación de etiquetas de envío

### 🏪 Retiro en Local
- [ ] Selección de franja horaria
- [ ] Generación de códigos QR para retiro
- [ ] Verificación de retiro en tienda

## 📈 Fase 7: Reportes y Análisis (Semana 8)

### 📊 Reportes
- [ ] Ventas por período
- [ ] Productos más vendidos
- [ ] Stock bajo mínimos
- [ ] Exportación a Excel/PDF

### 📱 Notificaciones
- [ ] Notificaciones por email
- [ ] Notificaciones push (opcional)
- [ ] Integración con WhatsApp Business (opcional)

## 🚀 Fase 8: Pruebas y Lanzamiento (Semana 9)

### 🧪 Pruebas
- [ ] Pruebas unitarias (Jest/Vitest)
- [ ] Pruebas de integración
- [ ] Pruebas de carga
- [ ] Pruebas de usabilidad

### 🚀 Despliegue
- [ ] Configuración de entornos (dev, staging, prod)
- [ ] CI/CD con GitHub Actions
- [ ] Monitoreo y logs
- [ ] Backup automático de base de datos

## 📅 Cronograma Estimado

| Fase | Semana | Entregables |
|------|--------|-------------|
| 1. Configuración | 1 | Repositorio, Docker, Estructura base |
| 2. Catálogo | 2 | Catálogo de productos, búsqueda |
| 3. Carrito y Checkout | 3-4 | Carrito, pago con MP, reserva de stock |
| 4. Panel Admin | 5 | Gestión de productos y pedidos |
| 5. Usuarios | 6 | Autenticación, perfil |
| 6. Logística | 7 | Envíos, retiro en local |
| 7. Reportes | 8 | Reportes, notificaciones |
| 8. Lanzamiento | 9 | Pruebas, despliegue, documentación |

## 📌 Notas Importantes

- **Prioridad:** Las fases están diseñadas para entregar valor incremental
- **Flexibilidad:** El orden puede ajustarse según necesidades del negocio
- **Comunicación:** Reuniones semanales de seguimiento
- **Feedback:** Iteración continua basada en retroalimentación

## 📞 Contacto

- **Responsable:** [Nombre del Responsable]
- **Email:** [email@ejemplo.com]
- **Teléfono:** [Número de contacto]

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