1. Autenticación y Usuarios
Autenticación
markdown
### POST /v1/auth/register
- **Description**: Registrar nuevo usuario
- **Request Body**:
  - `email` (string, requerido)
  - `password` (string, requerido)
  - `firstName` (string, opcional)
  - `lastName` (string, opcional)
  - `role` (enum, opcional, default: CUSTOMER)

### POST /v1/auth/login
- **Description**: Iniciar sesión
- **Request Body**:
  - `email` (string, requerido)
  - `password` (string, requerido)

### POST /v1/auth/refresh
- **Description**: Refrescar token de acceso
- **Request Body**:
  - `refreshToken` (string, requerido)

### POST /v1/auth/forgot-password
- **Description**: Solicitar restablecimiento de contraseña
- **Request Body**:
  - `email` (string, requerido)

### POST /v1/auth/reset-password
- **Description**: Restablecer contraseña
- **Request Body**:
  - `token` (string, requerido)
  - `newPassword` (string, requerido)
2. Usuarios
markdown
### GET /v1/users/me
- **Description**: Obtener perfil del usuario actual
- **Authentication**: Requerido

### PUT /v1/users/me
- **Description**: Actualizar perfil del usuario actual
- **Authentication**: Requerido
- **Request Body**:
  - `firstName` (string, opcional)
  - `lastName` (string, opcional)
  - `phone` (string, opcional)
  - `marketingOptIn` (boolean, opcional)

### GET /v1/users/me/addresses
- **Description**: Obtener direcciones del usuario
- **Authentication**: Requerido

### POST /v1/users/me/addresses
- **Description**: Agregar dirección
- **Authentication**: Requerido
- **Request Body**:
  - `street` (string, requerido)
  - `city` (string, requerido)
  - `state` (string, requerido)
  - `postalCode` (string, requerido)
  - `isDefault` (boolean, opcional)
3. Catálogo de Productos
Productos
markdown
### GET /v1/products
- **Description**: Listar productos
- **Query Params**:
  - `category` (string, opcional): Filtrar por categoría
  - `search` (string, opcional): Búsqueda por nombre/descripción
  - `minPrice` (number, opcional): Precio mínimo
  - `maxPrice` (number, opcional): Precio máximo
  - `inStock` (boolean, opcional): Solo productos con stock
  - `sort` (string, opcional): Ordenar por (price_asc, price_desc, newest)
  - `page` (number, opcional): Número de página
  - `limit` (number, opcional): Items por página (max 100)

### GET /v1/products/:id
- **Description**: Obtener detalles de un producto

### GET /v1/products/:id/variants
- **Description**: Obtener variantes de un producto

### GET /v1/products/featured
- **Description**: Obtener productos destacados
4. Carrito de Compras
markdown
### GET /v1/cart
- **Description**: Obtener carrito actual
- **Authentication**: Opcional (se usa sessionId si no está autenticado)

### POST /v1/cart/items
- **Description**: Agregar ítem al carrito
- **Request Body**:
  - `productId` (string, requerido)
  - `variantId` (string, opcional)
  - `quantity` (number, requerido, default: 1)

### PUT /v1/cart/items/:itemId
- **Description**: Actualizar cantidad de un ítem
- **Request Body**:
  - `quantity` (number, requerido)

### DELETE /v1/cart/items/:itemId
- **Description**: Eliminar ítem del carrito

### POST /v1/cart/checkout
- **Description**: Iniciar proceso de pago
- **Request Body**:
  - `shippingAddress` (object, requerido)
  - `billingAddress` (object, opcional)
  - `shippingMethod` (string, requerido)
  - `paymentMethod` (string, requerido)
5. Órdenes
markdown
### GET /v1/orders
- **Description**: Listar órdenes del usuario
- **Authentication**: Requerido

### GET /v1/orders/:orderId
- **Description**: Obtener detalles de una orden

### POST /v1/orders/:orderId/cancel
- **Description**: Cancelar orden (si es posible)

### GET /v1/orders/:orderId/tracking
- **Description**: Obtener estado de seguimiento
6. Instituciones (Nuevo)
markdown
### GET /v1/institutions
- **Description**: Listar instituciones
- **Query Params**:
  - `type` (enum, opcional): SCHOOL, UNIVERSITY, etc.
  - `search` (string, opcional): Buscar por nombre

### POST /v1/institutions
- **Description**: Crear nueva institución (solo admin)
- **Request Body**:
  - `name` (string, requerido)
  - `taxId` (string, requerido)
  - `type` (enum, requerido)
  - `address` (string, requerido)
  - `city` (string, requerido)
  - `state` (string, requerido)
  - `postalCode` (string, requerido)
  - `phone` (string, opcional)
  - `email` (string, opcional)

### GET /v1/institutions/:institutionId/school-lists
- **Description**: Obtener listas escolares de la institución

### POST /v1/institutions/:institutionId/school-lists
- **Description**: Crear lista escolar
- **Request Body**:
  - `name` (string, requerido)
  - `grade` (string, requerido)
  - `academicYear` (number, requerido)
  - `items` (array, requerido): Lista de ítems
7. Listas Escolares
markdown
### GET /v1/school-lists/:listId
- **Description**: Obtener detalles de lista escolar

### PUT /v1/school-lists/:listId
- **Description**: Actualizar lista escolar

### POST /v1/school-lists/:listId/publish
- **Description**: Publicar lista

### DELETE /v1/school-lists/:listId
- **Description**: Eliminar lista (solo borrado lógico)
8. Presupuestos (Quotations)
markdown
### POST /v1/quotations
- **Description**: Crear presupuesto
- **Request Body**:
  - `institutionId` (string, requerido)
  - `schoolListId` (string, opcional)
  - `items` (array, requerido): Lista de productos
  - `notes` (string, opcional)

### GET /v1/quotations/:quotationId
- **Description**: Obtener detalles de presupuesto

### POST /v1/quotations/:quotationId/approve
- **Description**: Aprobar presupuesto (solo admin/institución)
- **Request Body**:
  - `approved` (boolean, requerido)
  - `notes` (string, opcional)

### POST /v1/quotations/:quotationId/convert-to-order
- **Description**: Convertir a orden
9. Administración
Productos
markdown
### POST /v1/admin/products
- **Description**: Crear producto
- **Authentication**: Requerido (ADMIN)

### PUT /v1/admin/products/:productId
- **Description**: Actualizar producto

### DELETE /v1/admin/products/:productId
- **Description**: Eliminar producto (borrado lógico)
Órdenes
markdown
### GET /v1/admin/orders
- **Description**: Listar todas las órdenes
- **Query Params**:
  - `status` (string, opcional): Filtrar por estado
  - `from` (date, opcional): Fecha desde
  - `to` (date, opcional): Fecha hasta

### PUT /v1/admin/orders/:orderId/status
- **Description**: Actualizar estado de orden
- **Request Body**:
  - `status` (string, requerido)
  - `trackingNumber` (string, opcional)
10. Reportes
markdown
### GET /v1/admin/reports/sales
- **Description**: Reporte de ventas
- **Query Params**:
  - `from` (date, opcional)
  - `to` (date, opcional)
  - `groupBy` (string, opcional): day, week, month, year

### GET /v1/admin/reports/inventory
- **Description**: Reporte de inventario
- **Query Params**:
  - `lowStock` (boolean, opcional): Solo productos con stock bajo
11. Notificaciones
markdown
### GET /v1/notifications
- **Description**: Obtener notificaciones del usuario
- **Query Params**:
  - `unreadOnly` (boolean, opcional): Solo no leídas

### PUT /v1/notifications/:notificationId/read
- **Description**: Marcar como leída

### POST /v1/notifications/preferences
- **Description**: Actualizar preferencias de notificación
12. Listas de Deseos
markdown
### GET /v1/wishlists
- **Description**: Obtener listas de deseos del usuario

### POST /v1/wishlists
- **Description**: Crear lista de deseos
- **Request Body**:
  - `name` (string, requerido)
  - `isDefault` (boolean, opcional)

### POST /v1/wishlists/:wishlistId/items
- **Description**: Agregar ítem a lista de deseos
- **Request Body**:
  - `productId` (string, requerido)
  - `variantId` (string, opcional)
  - `quantity` (number, opcional, default: 1)
13. Suscripciones
markdown
### GET /v1/subscriptions
- **Description**: Obtener suscripciones del usuario

### POST /v1/subscriptions
- **Description**: Crear suscripción
- **Request Body**:
  - `productId` (string, requerido)
  - `variantId` (string, requerido)
  - `frequency` (enum, requerido): MONTHLY, QUARTERLY, etc.
  - `shippingAddress` (object, requerido)

### PUT /v1/subscriptions/:subscriptionId
- **Description**: Actualizar suscripción
- **Request Body**:
  - `status` (enum, opcional): ACTIVE, PAUSED, CANCELLED
  - `nextDelivery` (date, opcional)
  - `shippingAddress` (object, opcional)
14. Pagos
markdown
### POST /v1/payments/process
- **Description**: Procesar pago
- **Request Body**:
  - `orderId` (string, requerido)
  - `paymentMethod` (object, requerido)
  - `saveCard` (boolean, opcional)

### GET /v1/payments/methods
- **Description**: Obtener métodos de pago guardados
- **Authentication**: Requerido
15. Búsqueda
markdown
### GET /v1/search
- **Description**: Búsqueda global
- **Query Params**:
  - `q` (string, requerido): Término de búsqueda
  - `filters` (JSON, opcional): Filtros avanzados
  - `page` (number, opcional)
  - `limit` (number, opcional)
16. Configuración
markdown
### GET /v1/settings
- **Description**: Obtener configuración

### PUT /v1/settings
- **Description**: Actualizar configuración
- **Authentication**: Requerido (ADMIN)
- **Request Body**:
  - `key` (string, requerido)
  - `value` (any, requerido)
17. Importación/Exportación
markdown
### POST /v1/admin/import/products
- **Description**: Importar productos desde CSV/Excel
- **Content-Type**: multipart/form-data
- **Form Data**:
  - [file](cci:7://file:///home/gustavo/tienda-libreria/Dockerfile:0:0-0:0) (file, requerido): Archivo a importar
  - `type` (string, requerido): 'csv' o 'excel'
  - `updateExisting` (boolean, opcional): Actualizar existentes

### GET /v1/admin/export/orders
- **Description**: Exportar órdenes a CSV/Excel
- **Query Params**:
  - `format` (string, opcional): 'csv' o 'xlsx' (default: 'csv')
  - `from` (date, opcional)
  - `to` (date, opcional)
18. Logs y Auditoría
markdown
### GET /v1/admin/audit-logs
- **Description**: Obtener registros de auditoría
- **Query Params**:
  - `entityType` (string, opcional): Tipo de entidad
  - `entityId` (string, opcional): ID de entidad
  - `action` (string, opcional): Acción específica
  - `from` (date, opcional)
  - `to` (date, opcional)
19. Métricas y Análisis
markdown
### GET /v1/analytics/overview
- **Description**: Resumen de métricas
- **Query Params**:
  - `period` (string, opcional): 'day', 'week', 'month', 'year'

### GET /v1/analytics/products
- **Description**: Métricas de productos
- **Query Params**:
  - `sort` (string, opcional): 'views', 'sales', 'revenue'
  - `limit` (number, opcional): Número de resultados
20. Webhooks
markdown
### POST /v1/webhooks/payments/:provider
- **Description**: Webhook para notificaciones de pago
- **Headers**:
  - `X-Webhook-Signature`: Firma de verificación

### POST /v1/webhooks/shipping/:provider
- **Description**: Webhook para actualizaciones de envío
21. Validación de Cupones
markdown
### POST /v1/coupons/validate
- **Description**: Validar cupón
- **Request Body**:
  - `code` (string, requerido): Código de cupón
  - `cartId` (string, opcional): ID del carrito

### GET /v1/admin/coupons
- **Description**: Listar cupones (admin)
- **Query Params**:
  - `isActive` (boolean, opcional)
22. Gestión de Contenido
markdown
### GET /v1/content/pages/:slug
- **Description**: Obtener página de contenido

### POST /v1/admin/content/pages
- **Description**: Crear/Actualizar página
- **Request Body**:
  - `slug` (string, requerido)
  - `title` (string, requerido)
  - `content` (string, requerido)
  - `isPublished` (boolean, opcional)
23. Comentarios y Reseñas
markdown
### GET /v1/products/:productId/reviews
- **Description**: Obtener reseñas de producto

### POST /v1/products/:productId/reviews
- **Description**: Crear reseña
- **Authentication**: Requerido
- **Request Body**:
  - `rating` (number, requerido): 1-5
  - `comment` (string, opcional)
  - `anonymous` (boolean, opcional)
24. Preguntas Frecuentes
markdown
### GET /v1/faqs
- **Description**: Obtener preguntas frecuentes
- **Query Params**:
  - `category` (string, opcional): Filtrar por categoría

### POST /v1/faqs
- **Description**: Crear FAQ (admin)
- **Request Body**:
  - `question` (string, requerido)
  - `answer` (string, requerido)
  - `category` (string, opcional)
  - `isActive` (boolean, opcional)
25. Soportes y Tickets
markdown
### POST /v1/support/tickets
- **Description**: Crear ticket de soporte
- **Request Body**:
  - `subject` (string, requerido)
  - `message` (string, requerido)
  - `orderId` (string, opcional)

### GET /v1/support/tickets
- **Description**: Listar tickets del usuario
- **Authentication**: Requerido
26. Inventario
markdown
### GET /v1/admin/inventory
- **Description**: Obtener niveles de inventario
- **Query Params**:
  - `lowStock` (boolean, opcional): Solo bajo stock
  - `category` (string, opcional): Filtrar por categoría

### POST /v1/admin/inventory/adjust
- **Description**: Ajuste de inventario
- **Request Body**:
  - `productId` (string, requerido)
  - `variantId` (string, opcional)
  - `quantity` (number, requerido): Cantidad a sumar/restar
  - `notes` (string, opcional): Razón del ajuste
27. Precios Especiales
markdown
### POST /v1/admin/pricing/bulk
- **Description**: Crear precio por volumen
- **Request Body**:
  - `productId` (string, requerido)
  - `minQuantity` (number, requerido)
  - `price` (number, requerido)
  - `isActive` (boolean, opcional)

### GET /v1/products/:productId/pricing
- **Description**: Obtener precios especiales de un producto
28. Plantillas de Email
markdown
### GET /v1/admin/email-templates
- **Description**: Listar plantillas de email

### PUT /v1/admin/email-templates/:templateId
- **Description**: Actualizar plantilla
- **Request Body**:
  - `subject` (string, opcional)
  - `content` (string, opcional)
  - `isActive` (boolean, opcional)
29. Sincronización Externa
markdown
### POST /v1/sync/products
- **Description**: Sincronizar productos con sistema externo
- **Authentication**: Requerido (API Key)
- **Headers**:
  - `X-API-Key`: Clave de API

### GET /v1/sync/status/:jobId
- **Description**: Obtener estado de sincronización
30. Utilidades
markdown
### POST /v1/utils/generate-slug
- **Description**: Generar slug a partir de texto
- **Request Body**:
  - `text` (string, requerido)

### POST /v1/utils/upload
- **Description**: Subir archivo
- **Content-Type**: multipart/form-data
- **Form Data**:
  - [file](cci:7://file:///home/gustavo/tienda-libreria/Dockerfile:0:0-0:0) (file, requerido): Archivo a subir
  - `folder` (string, opcional): Carpeta de destino
Consideraciones Adicionales
Autenticación: La mayoría de los endpoints requieren autenticación mediante JWT, a menos que se indique lo contrario.
Paginación: Los endpoints que devuelven listas deben implementar paginación con los parámetros page y limit.
Ordenamiento: Los endpoints que lo soporten deben aceptar un parámetro sort para ordenar los resultados.
Filtrado: Se debe soportar filtrado avanzado mediante parámetros de consulta.
Versión de API: Todas las rutas están prefijadas con /v1/ para permitir futuras actualizaciones de la API.
Documentación: Cada endpoint debe estar documentado con:
Descripción
Parámetros
Cuerpo de la solicitud (si aplica)
Códigos de respuesta
Ejemplos
Validación: Todas las entradas deben ser validadas antes de ser procesadas.
Manejo de Errores: Respuestas de error consistentes con códigos HTTP apropiados y mensajes descriptivos.
Seguridad:
Protección contra CSRF
Rate limiting
Validación de entrada
Sanitización de datos
Rendimiento:
Caché donde sea apropiado
Paginación para conjuntos de datos grandes
Selección de campos (fields) para reducir el payload