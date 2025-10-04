# Roadmap - Librería Arco Iris

> Basado en los requerimientos de [historia.md](cci:7://file:///home/gustavo/tienda-libreria/historia.md:0:0-0:0) - Última actualización: 4/10/2025

## 🎨 0. Sistema de Diseño

### Configuración de Tema
- [x] Configurar Tailwind CSS 4 con la paleta de colores definida
- [ ] Implementar variables CSS para temas claro/oscuro
- [-] Establecer tipografía (Inter, Poppins, JetBrains Mono)
- [ ] Definir sistema de espaciado y tamaños
- [ ] Configurar animaciones y transiciones

### Componentes Base
- [ ] Crear biblioteca de componentes UI reutilizables:
  - [x] Botones (primary, secondary, outline, ghost, danger)
  - [ ] Tarjetas de producto
  - [ ] Formularios y campos de entrada
  - [ ] Navegación y menús
  - [ ] Modales y diálogos
  - [ ] Indicadores de carga
  - [ ] Alertas y notificaciones
  - [ ] Badges y etiquetas
  - [ ] Paginación
  - [ ] Filtros y búsqueda

## 🏗️ 1. Gestión de Catálogo de Productos

### Categorías y Productos
- [x] `GET /v1/categories` - Listar categorías principales
- [x] `GET /v1/products` - Listar productos con filtros
- [x] `GET /v1/products/:id` - Obtener detalles de producto
- [ ] `POST /v1/products` - Crear producto (admin)
- [ ] `PUT /v1/products/:id` - Actualizar producto (admin)
- [ ] `DELETE /v1/products/:id` - Eliminar producto (admin)

### Variantes y Stock
- [x] `GET /v1/products/:id/variants` - Listar variantes de producto
- [ ] `POST /v1/products/:id/variants` - Crear variante (admin)
- [ ] `PUT /v1/variants/:id` - Actualizar variante (admin)
- [ ] `GET /v1/variants/stock` - Verificar disponibilidad

## 🛒 2. Carrito de Compras

### Gestión del Carrito
- [x] `GET /v1/cart` - Obtener carrito actual
- [x] `POST /v1/cart/items` - Agregar ítem al carrito
- [x] `PUT /v1/cart/items/:itemId` - Actualizar cantidad
- [ ] `DELETE /v1/cart/items/:itemId` - Eliminar ítem
- [ ] `POST /v1/cart/apply-coupon` - Aplicar cupón
- [ ] `DELETE /v1/cart/coupon` - Eliminar cupón

## 🏢 3. Gestión de Instituciones

### Instituciones
- [x] `GET /v1/institutions` - Listar instituciones
- [x] `POST /v1/institutions` - Crear institución
- [x] `GET /v1/institutions/:id` - Ver detalles
- [x] `PUT /v1/institutions/:id` - Actualizar
- [x] `DELETE /v1/institutions/:id` - Eliminar

### Usuarios Institucionales
- [x] `GET /v1/institutions/:id/users` - Listar usuarios
- [x] `POST /v1/institutions/:id/users` - Agregar usuario
- [ ] `PUT /v1/institutions/:id/users/:userId` - Actualizar permisos
- [x] `DELETE /v1/institutions/:id/users/:userId` - Eliminar usuario

## 🔐 4. Autenticación y Usuarios

### Autenticación
- [x] `POST /v1/auth/register` - Registrar usuario
- [x] `POST /v1/auth/login` - Iniciar sesión
- [x] `POST /v1/auth/refresh` - Refrescar token
- [x] `POST /v1/auth/forgot-password` - Recuperar contraseña
- [x] `POST /v1/auth/reset-password` - Restablecer contraseña

### Perfil de Usuario
- [x] `GET /v1/users/me` - Ver perfil
- [x] `PUT /v1/users/me` - Actualizar perfil
- [x] `GET /v1/users/me/addresses` - Ver direcciones
- [x] `POST /v1/users/me/addresses` - Agregar dirección

## 📚 5. Listas Escolares

### Gestión de Listas
- [ ] `POST /v1/school-lists` - Crear lista
- [ ] `GET /v1/school-lists/:id` - Ver lista
- [ ] `PUT /v1/school-lists/:id` - Actualizar lista
- [ ] `DELETE /v1/school-lists/:id` - Eliminar lista
- [ ] `POST /v1/school-lists/:id/publish` - Publicar lista

## 📦 6. Órdenes y Pagos

### Proceso de Pedido
- [ ] `POST /v1/orders` - Crear pedido
- [ ] `GET /v1/orders` - Listar pedidos
- [ ] `GET /v1/orders/:id` - Ver detalle de pedido
- [ ] `POST /v1/orders/:id/cancel` - Cancelar pedido

### Pagos
- [ ] `POST /v1/payments/process` - Procesar pago
- [ ] `GET /v1/payments/methods` - Ver métodos de pago

## 📊 7. Reportes

### Reportes de Ventas
- [ ] `GET /v1/admin/reports/sales` - Reporte de ventas
- [ ] `GET /v1/admin/reports/inventory` - Reporte de inventario
- [ ] `GET /v1/admin/reports/customers` - Análisis de clientes

## 🔒 8. Seguridad

### Medidas de Seguridad
- [ ] Validación de entrada
- [ ] Rate limiting
- [ ] Protección contra CSRF
- [ ] Auditoría de seguridad

## 📅 Próximos Pasos

### Prioridad Alta
1. Completar el sistema de autenticación (90% completado)
2. Finalizar el catálogo de productos (70% completado)
3. Implementar el proceso de checkout (30% completado)

### En Progreso
- [ ] Sistema de diseño responsivo
- [ ] Integración con pasarela de pago
- [ ] Panel de administración

### Completado
- [x] Configuración inicial del proyecto
- [x] Modelo de base de datos
- [x] API básica de productos
- [x] Sistema de autenticación básico