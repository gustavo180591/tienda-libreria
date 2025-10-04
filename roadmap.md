# Roadmap - Tienda de Librería Online

> Basado en los requerimientos de `cliente.md` - Última actualización: 4/10/2025

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

## 📊 Estado de la API

### Autenticación
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/verify-email` | Verificar dirección de email con código | ✅ |

### Gestión de Perfil de Usuario
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/profile` | Obtener perfil del usuario autenticado | ✅ |

### Gestión de Sesiones
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/sessions` | Listar sesiones activas del usuario | ✅ |

### Soporte y Contacto
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/support/faqs` | Obtener preguntas frecuentes | ✅ |

### Gestión de Claves API
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/developer/api-keys` | Generar una nueva clave API | ✅ |

### Authentication
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/register` | Register a new user account | ✅ |

### Users
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/users` | List all users (admin only) | ✅ |

### Products
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/products` | List products with filtering | ✅ |

### Categories
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/categories` | List all categories | ✅ |

### Orders
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/orders` | List orders (filtered by current user, admin sees all) | ✅ |

### Shopping Cart
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/cart` | Get user's shopping cart | ✅ |

### Payments
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/payments/create-intent` | Create payment intent (Stripe, MercadoPago, etc.) | ✅ |
| GET | `/api/payments` | Get payment history | ✅ |

### School Supply Lists
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/school-supply-lists` | Get user's school supply lists | ✅ |

### Quotations
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/quotations` | Get user's quotations | ✅ |

### Notifications
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/notifications` | Get user's notifications | ✅ |
| GET | `/v1/notifications` | List user's notifications | ✅ |

### Addresses
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/addresses` | Get user's addresses | ✅ |

### Shipping
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/shipping/zones` | List all shipping zones | ✅ |

### Bulk Pricing
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/bulk-pricing` | List bulk pricing rules | ✅ |
| GET | `/v1/products/:productId/bulk-pricing` | Get bulk pricing tiers for a product | ✅ |

### Promotions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/promotions` | List promotions | ✅ |

### Institutions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/institutions` | List institutions (admin only) | ✅ |

### Quotations (Presupuestos/Cotizaciones)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/quotations` | Create a new quotation | ✅ |

### Shipping Zones (Zonas de Envío)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/shipping/zones` | List shipping zones | ✅ |

### Product Variants
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/products/:productId/variants` | List variants for a product | ✅ |

### Media
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/media/upload` | Upload media file | ✅ |

### Shipping Rates (Tarifas de Envío)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/shipping/rates` | Listar tarifas de envío | ✅ |

### School Supply Lists (Listas de Útiles Escolares)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/school-supply-lists` | Obtener listas de útiles del usuario | ✅ |

### Audit Logs (Registros de Auditoría)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/audit-logs` | Obtener registros de auditoría | ✅ |

### Institutions (Instituciones)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/institutions` | Listar instituciones | ✅ |

### Promotions (Promociones)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/promotions` | Listar promociones activas | ✅ |

### Wishlist (Lista de deseos)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/wishlists/me` | Obtener la lista de deseos del usuario autenticado | ✅ |

### Reviews & Ratings (Reseñas y calificaciones)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/products/:productId/reviews` | Obtener reseñas de un producto | ✅ |

### Returns & Refunds (Devoluciones y reembolsos)
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/orders/:orderId/returns` | Solicitar devolución o reembolso | ✅ |

### Panel de Administración
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/dashboard` | Estadísticas del panel de administración | ✅ |

### POST /v1/auth/verify-email
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/resend-verification` | Reenviar email de verificación | ✅ |

### POST /v1/auth/resend-verification
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/2fa/setup` | Configurar autenticación de dos factores | ✅ |

### POST /v1/auth/2fa/setup
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/2fa/verify` | Verificar código 2FA para completar configuración | ✅ |

### POST /v1/auth/2fa/verify
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/2fa/disable` | Desactivar 2FA | ✅ |

### POST /v1/auth/2fa/disable
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/2fa/backup-codes/generate` | Generar códigos de respaldo para 2FA | ✅ |

### POST /v1/auth/2fa/backup-codes/generate
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/2fa/backup-codes/verify` | Usar un código de respaldo para autenticación | ✅ |

### GET /v1/profile
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/profile` | Actualizar perfil de usuario | ✅ |

### PUT /v1/profile
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/profile/change-password` | Cambiar contraseña | ✅ |

### POST /v1/profile/change-password
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/profile` | Eliminar cuenta de usuario (soft delete) | ✅ |

### GET /v1/sessions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/sessions/:sessionId` | Cerrar sesión específica | ✅ |

### DELETE /v1/sessions/:sessionId
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/sessions/logout-all` | Cerrar todas las sesiones excepto la actual | ✅ |

### GET /v1/support/faqs
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/support/tickets` | Crear un nuevo ticket de soporte | ✅ |

### POST /v1/support/tickets
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/support/tickets` | Listar tickets de soporte del usuario | ✅ |

### GET /v1/support/tickets
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/support/tickets/:ticketId` | Obtener detalles de un ticket | ✅ |

### GET /v1/support/tickets/:ticketId
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/support/tickets/:ticketId/messages` | Agregar mensaje a un ticket | ✅ |

### POST /v1/support/tickets/:ticketId/messages
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/contact` | Enviar mensaje a través del formulario de contacto | ✅ |

### POST /v1/contact
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/support/contact-options` | Obtener opciones de contacto disponibles | ✅ |

### POST /v1/developer/api-keys
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/developer/api-keys` | Listar claves API | ✅ |

### GET /v1/developer/api-keys
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/developer/api-keys/:keyId` | Revocar una clave API | ✅ |

### General
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/developer/webhooks` | Registrar un nuevo webhook | ✅ |
| GET | `/v1/security/audit-logs` | Obtener registros de auditoría detallados | ✅ |
| POST | `/v1/security/fraud/checkout` | Verificar transacción en busca de fraude | ✅ |
| GET | `/v1/security/compliance/export-data` | Exportar todos los datos de un usuario (GDPR/CCPA) | ✅ |
| DELETE | `/v1/security/compliance/delete-account` | Eliminar cuenta y datos personales (Derecho al olvido - GDPR) | ✅ |
| POST | `/v1/security/compliance/request-consent` | Registrar consentimiento del usuario | ✅ |
| POST | `/v1/security/account/check-pwned` | Verificar si el email/contraseña ha sido comprometido | ✅ |
| GET | `/v1/promotions/coupons` | Listar cupones disponibles | ✅ |
| POST | `/v1/promotions/coupons` | Crear un nuevo cupón (Admin) | ✅ |
| POST | `/v1/promotions/coupons/validate` | Validar un código de cupón | ✅ |
| POST | `/v1/marketing/subscribe` | Suscribir un email al boletín | ✅ |
| POST | `/v1/marketing/campaigns` | Crear una campaña de email (Admin) | ✅ |
| GET | `/v1/landing-pages` | Listar landing pages | ✅ |
| POST | `/v1/landing-pages` | Crear una landing page (Admin) | ✅ |
| GET | `/v1/notifications/unread-count` | Get count of unread notifications | ✅ |
| GET | `/v1/admin/users` | Listar usuarios (con filtros avanzados) | ✅ |

### POST /v1/auth/register
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/login` | User login | ✅ |

### POST /v1/auth/login
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/refresh` | Refresh access token using refresh token | ✅ |
| GET | `/v1/auth/me` | Get current user's profile | ✅ |

### POST /v1/auth/refresh
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/logout` | Invalidate refresh token | ✅ |

### POST /v1/auth/logout
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/forgot-password` | Request password reset email | ✅ |

### POST /v1/auth/forgot-password
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/reset-password` | Reset password with token | ✅ |

### POST /v1/auth/reset-password
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/auth/login` | User login | ✅ |

### GET /v1/users
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/users/:id` | Get user by ID | ✅ |

### GET /v1/users/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/users/:id` | Update user | ✅ |

### PUT /v1/users/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/users/:id` | Delete user (soft delete) | ✅ |

### GET /v1/products
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/products` | Create a new product (admin only) | ✅ |

### POST /v1/products
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/products/:id` | Get product by ID or slug | ✅ |

### GET /v1/products/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/products/:id` | Update product | ✅ |

### PUT /v1/products/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/products/:id` | Delete product (soft delete) | ✅ |

### DELETE /v1/products/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/products` | List products with filtering | ✅ |

### GET /api/products
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/products` | Create a new product (admin only) | ✅ |

### POST /api/products
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/products/:id` | Get product by ID or slug | ✅ |

### GET /api/products/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/api/products/:id` | Update product | ✅ |

### PUT /api/products/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/api/products/:id` | Delete product (soft delete) | ✅ |

### GET /api/categories
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/categories` | Create new category (admin only) | ✅ |

### POST /api/categories
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/categories/:id` | Get category by ID or slug | ✅ |

### GET /api/orders
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/orders` | Create new order | ✅ |

### POST /v1/orders
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/orders/:id` | Get order by ID | ✅ |

### GET /v1/orders/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/orders/:id/cancelstatus` | Update order status (admin only) | ✅ |

### GET /v1/cart
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/cart/items` | Add item to cart | ✅ |

### POST /v1/cart/items
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/cart/items/:itemId` | Update cart item quantity | ✅ |

### PUT /v1/cart/items/:itemId
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/cart/items/:itemId` | Remove item from cart | ✅ |

### POST /v1/payments/create-intent
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/payments/webhook/:provider` | Webhook for payment providers | ✅ |

### POST /v1/payments/webhook/:provider
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/payments/methods` | Get available payment methods | ✅ |

### GET /v1/payments/methods
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/cart/items` | Add item to cart | ✅ |

### POST /api/cart/items
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/api/cart/items/:id` | Update cart item quantity | ✅ |

### PUT /api/cart/items/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/api/cart/items/:id` | Remove item from cart | ✅ |

### GET /api/school-supply-lists
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/school-supply-lists` | Create new school supply list | ✅ |

### POST /api/school-supply-lists
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/school-supply-lists/:id` | Get school supply list by ID | ✅ |

### GET /api/school-supply-lists/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/api/school-supply-lists/:id` | Update school supply list | ✅ |

### PUT /api/school-supply-lists/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/api/school-supply-lists/:id` | Delete school supply list | ✅ |

### GET /api/quotations
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/quotations` | Request a quotation | ✅ |

### POST /api/quotations
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/quotations/:id` | Get quotation by ID | ✅ |

### GET /api/quotations/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/quotations/:id/convert-to-order` | Convert quotation to order | ✅ |

### GET /api/notifications
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/api/notifications/:id/read` | Mark notification as read | ✅ |

### GET /api/addresses
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/addresses` | Add new address | ✅ |

### POST /api/addresses
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/api/addresses/:id` | Update address | ✅ |

### PUT /api/addresses/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/api/addresses/:id` | Delete address | ✅ |

### GET /api/shipping/zones
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/shipping/zones/:id` | Get shipping zone by ID | ✅ |

### GET /api/shipping/zones/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/shipping/zones` | Create new shipping zone (admin only) | ✅ |

### POST /api/shipping/zones
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/shipping/rates` | List shipping rates | ✅ |

### GET /api/shipping/rates
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/shipping/rates` | Create new shipping rate (admin only) | ✅ |

### GET /api/bulk-pricing
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/bulk-pricing` | Create bulk pricing rule (admin only) | ✅ |

### GET /api/promotions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/promotions` | Create promotion (admin only) | ✅ |

### GET /api/payments
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/payments/:id` | Get payment details | ✅ |

### GET /api/payments/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/payments/process` | Process a payment (typically called by payment gateway webhook) | ✅ |

### GET /api/institutions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/api/institutions` | Create new institution (admin only) | ✅ |

### POST /api/institutions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/api/institutions/:id` | Get institution by ID | ✅ |

### GET /api/institutions/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/api/institutions/:id` | Update institution | ✅ |

### PUT /api/institutions/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/api/institutions/:id` | Delete institution (soft delete) | ✅ |

### POST /v1/quotations
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/quotations/:id` | Get quotation by ID or reference | ✅ |

### GET /v1/quotations/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/quotations/:id/accept` | Accept a quotation (converts to order) | ✅ |

### POST /v1/quotations/:id/accept
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/quotations/:id/decline` | Decline a quotation | ✅ |

### POST /v1/quotations/:id/decline
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/quotations` | List user's quotations | ✅ |

### GET /v1/shipping/zones
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/shipping/zones` | Create a new shipping zone | ✅ |

### POST /v1/shipping/zones
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/shipping/zones/:id` | Update shipping zone | ✅ |

### PUT /v1/shipping/zones/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/shipping/zones/:id` | Delete shipping zone (soft delete) | ✅ |

### DELETE /v1/shipping/zones/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/shipping/calculate` | Calculate shipping cost | ✅ |

### GET /v1/notifications/unread-count
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/notifications/:id/read` | Mark notification as read | ✅ |

### PUT /v1/notifications/:id/read
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/notifications/read-all` | Mark all notifications as read | ✅ |

### GET /v1/products/:productId/variants
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/variants/:id` | Get variant by ID | ✅ |

### GET /v1/variants/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/variants` | Create new variant (admin only) | ✅ |

### POST /v1/variants
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/variants/:id` | Update variant | ✅ |

### POST /v1/media/upload
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/media/:id` | Delete media | ✅ |

### GET /v1/products/:productId/bulk-pricing
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/bulk-pricing` | Create bulk pricing tier (admin only) | ✅ |

### POST /v1/bulk-pricing
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/bulk-pricing/:id` | Delete bulk pricing tier | ✅ |

### GET /v1/shipping/rates
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/shipping/rates/:id` | Obtener detalles de una tarifa de envío | ✅ |

### GET /v1/shipping/rates/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/shipping/rates` | Crear nueva tarifa de envío | ✅ |

### POST /v1/shipping/rates
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/shipping/rates/:id` | Actualizar tarifa de envío | ✅ |

### PUT /v1/shipping/rates/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/shipping/rates/:id` | Eliminar tarifa de envío | ✅ |

### DELETE /v1/shipping/rates/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/shipping/rates/calculate` | Calcular costos de envío para un carrito | ✅ |

### GET /v1/school-supply-lists
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/school-supply-lists/:id` | Obtener detalles de una lista de útiles | ✅ |

### GET /v1/school-supply-lists/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/school-supply-lists` | Crear una nueva lista de útiles | ✅ |

### POST /v1/school-supply-lists
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/school-supply-lists/:id` | Actualizar una lista de útiles | ✅ |

### PUT /v1/school-supply-lists/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/school-supply-lists/:id` | Eliminar una lista de útiles | ✅ |

### DELETE /v1/school-supply-lists/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/school-supply-lists/:id/duplicate` | Duplicar una lista de útiles | ✅ |

### GET /v1/audit-logs
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/audit-logs/:id` | Obtener detalles de un registro de auditoría | ✅ |

### GET /v1/audit-logs/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/audit-logs/export` | Exportar registros de auditoría (CSV/Excel) | ✅ |

### GET /v1/audit-logs/export
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/audit-logs` | Crear registro de auditoría manual (para integraciones) | ✅ |

### POST /v1/audit-logs
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/audit-logs/activity-feed` | Obtener actividad reciente del sistema (feed de actividades) | ✅ |

### GET /v1/institutions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/institutions/register` | Registrar nueva institución (proceso de solicitud) | ✅ |

### POST /v1/institutions/register
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/institutions/:id` | Obtener detalles de una institución | ✅ |

### GET /v1/institutions/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/institutions/:id` | Actualizar información de la institución | ✅ |

### PUT /v1/institutions/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PATCH | `/v1/institutions/:id/status` | Actualizar estado de la institución (solo admin) | ✅ |

### PATCH /v1/institutions/:id/status
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/institutions/:id/users` | Listar usuarios de la institución | ✅ |

### GET /v1/institutions/:id/users
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/institutions/:id/invite` | Invitar usuario a la institución | ✅ |

### GET /v1/promotions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/promotions/validate` | Validar código de promoción | ✅ |

### GET /v1/promotions/validate
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/promotions` | Crear nueva promoción (solo admin) | ✅ |

### POST /v1/promotions
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/promotions/:id` | Obtener detalles de una promoción | ✅ |

### GET /v1/promotions/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/promotions/:id` | Actualizar promoción | ✅ |

### PUT /v1/promotions/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/promotions/:id` | Eliminar promoción (soft delete) | ✅ |

### DELETE /v1/promotions/:id
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/promotions/:id/disable` | Desactivar promoción | ✅ |

### POST /v1/promotions/:id/disable
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/promotions/:id/enable` | Reactivar promoción | ✅ |

### GET /v1/wishlists/me
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/wishlists/items` | Añadir producto a la lista de deseos | ✅ |

### POST /v1/wishlists/items
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| DELETE | `/v1/wishlists/items/:itemId` | Eliminar producto de la lista de deseos | ✅ |

### DELETE /v1/wishlists/items/:itemId
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/wishlists/items/:itemId/move-to-cart` | Mover producto de la lista de deseos al carrito | ✅ |

### GET /v1/products/:productId/reviews
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/products/:productId/reviews` | Crear una reseña | ✅ |

### POST /v1/products/:productId/reviews
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/reviews/:reviewId` | Actualizar una reseña existente | ✅ |

### PUT /v1/reviews/:reviewId
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/reviews/:reviewId/helpful` | Marcar una reseña como útil | ✅ |

### POST /v1/orders/:orderId/returns
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/returns` | Listar devoluciones del usuario | ✅ |

### GET /v1/returns
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/returns/:returnId` | Obtener detalles de una devolución | ✅ |

### GET /v1/returns/:returnId
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/returns/:returnId/cancel` | Cancelar una solicitud de devolución | ✅ |

### GET /v1/admin/users
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/admin/users` | Crear nuevo usuario (admin) | ✅ |
| GET | `/v1/admin/audit-logs` | Get audit logs | ✅ |

### POST /v1/admin/users
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/users/:userId` | Obtener detalles de un usuario | ✅ |

### GET /v1/admin/users/:userId
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/admin/users/:userId` | Actualizar usuario (admin) | ✅ |

### PUT /v1/admin/users/:userId
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/admin/users/:userId/status` | Cambiar estado de un usuario | ✅ |

### POST /v1/admin/users/:userId/status
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/reports/sales` | Reporte de ventas | ✅ |

### GET /v1/admin/reports/sales
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/settings` | Obtener configuración del sitio | ✅ |

### GET /v1/admin/settings
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/admin/settings` | Actualizar configuración del sitio | ✅ |

### PUT /v1/admin/settings
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/audit-logs` | Obtener registros de auditoría | ✅ |

### GET /v1/admin/audit-logs
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| POST | `/v1/admin/backup` | Crear copia de seguridad | ✅ |
| GET | `/v1/admin/stats` | Get system statistics | ✅ |

### POST /v1/admin/backup
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/backups` | Listar copias de seguridad | ✅ |

### GET /v1/admin/backups
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/orders` | List all orders (admin only) | ✅ |

### GET /v1/admin/orders
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| PUT | `/v1/admin/orders/:id/status` | Update order status | ✅ |

### PUT /v1/admin/orders/:id/status
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/users` | List all users (admin only) | ✅ |

### GET /v1/admin/stats
| Método | Ruta | Descripción | Estado |
|--------|------|-------------|--------|
| GET | `/v1/admin/backup` | Create database backup (admin only) | ✅ |


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