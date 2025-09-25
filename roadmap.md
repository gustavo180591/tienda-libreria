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
