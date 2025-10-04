# Reglas de Negocio - Tienda Librería

## 1. Gestión de Productos

### 1.1. Productos
- **SKU**: Debe ser único (case-insensitive)
- **Precios**: Siempre en formato decimal con 2 decimales
- **Stock**: No puede ser negativo
- **Estado**: `isActive` controla la visibilidad en el catálogo

### 1.2. Categorías
- **Slug**: Único (case-insensitive), usado en URLs
- **Productos inactivos**: No son visibles en el catálogo

## 2. Proceso de Compra

### 2.1. Carrito
- **Sesión**: Los carritos están vinculados a una sesión o usuario autenticado
- **Vigencia**: Los carritos inactivos por más de 30 días se eliminan automáticamente

### 2.2. Órdenes
- **Estados**:
  - `PENDING`: Recién creada, pendiente de pago
  - `PROCESSING`: Pago recibido, en preparación
  - `COMPLETED`: Enviada al cliente
  - `CANCELLED`: Cancelada o reembolsada
- **Moneda**: Todos los ítems en una orden deben usar la misma moneda
- **Total**: `lineTotal = unitPrice * quantity` (validado en el backend)
- **Histórico**: Se guarda snapshot de precios y detalles al momento de la compra

## 3. Gestión de Usuarios

### 3.1. Roles
- `CUSTOMER`: Cliente regular
- `MANAGER`: Gestión de productos y órdenes
- `ADMIN`: Acceso total al sistema

### 3.2. Autenticación
- Contraseñas: Hash seguro (bcrypt)
- Emails: Únicos (case-insensitive)

## 4. Reglas de Validación

### 4.1. Direcciones
- País por defecto: Argentina
- Código postal: Formato válido según el país

### 4.2. Pagos
- Montos no pueden ser negativos
- El monto total debe coincidir con la suma de los ítems

## 5. Rendimiento

### 5.1. Índices
- Búsquedas por email, SKU y slugs son case-insensitive
- Índices compuestos para consultas frecuentes

### 5.2. Caché
- Catálogo de productos en caché con invalidación por cambios

## 6. Auditoría
- Todos los cambios importantes registran:
  - Usuario que realizó el cambio
  - Fecha y hora
  - Valores anteriores y nuevos

## 7. Seguridad
- No se almacenan datos sensibles de pago
- Acceso a rutas protegidas por roles
- Validación de entrada en todos los endpoints

---

*Última actualización: 04/10/2024*
