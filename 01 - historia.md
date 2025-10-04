# Sistema de Gestión para Librería Arco Iris

## 1. Visión General

Librería Arco Iris es una tienda online especializada en la venta de artículos de librería, libros y útiles escolares con control de stock en tiempo real. El sistema permite a los clientes realizar compras 24/7 con opciones de pago en línea, retiro en local y envíos por zona. Está diseñado para ofrecer una experiencia de compra fluida tanto a clientes finales como a instituciones educativas.

**Ubicación:** Eva Perón 1234, Villa Cabello, Posadas - Misiones  
**Contacto:** chabelalibreria@gmail.com | +54 9 376 123-4567

## 2. Requisitos Técnicos

### 2.1 Infraestructura
- **Base de Datos:** PostgreSQL 14+ con Prisma ORM
- **Backend:** Node.js con TypeScript
- **Frontend:** Aplicación web responsive
- **Almacenamiento:** Sistema de archivos en la nube para imágenes y documentos
- **Seguridad:** HTTPS, JWT para autenticación, protección CSRF

### 2.2 Rendimiento
- Tiempo de respuesta de API < 500ms (p95)
- Soporte para 1000 usuarios concurrentes
- Tiempo de carga inicial < 2 segundos
- Disponibilidad del 99.9% (tiempo de actividad)

### 2.3 Compatibilidad
- Navegadores soportados: Chrome, Firefox, Safari, Edge (últimas 2 versiones)
- Dispositivos móviles: iOS 14+, Android 10+
- Resoluciones mínimas: 320px (móvil), 768px (tablet), 1024px (escritorio)

## 3. Objetivos del Sistema

### 3.1 Objetivos Principales
- Facilitar compras de útiles escolares 24/7 desde cualquier dispositivo
- Garantizar la precisión del inventario con control de stock en tiempo real
- Prevenir sobreventas mediante reserva de stock durante el proceso de pago
- Simplificar la operación con un panel administrativo intuitivo
- Ofrecer presupuestos personalizados a partir de listas de útiles escolares
- Proporcionar múltiples opciones de pago y entrega

### 3.2 Métricas de Éxito
- Reducción del 30% en el tiempo de procesamiento de pedidos
- Aumento del 25% en la tasa de conversión
- Reducción del 40% en errores de inventario
- Tiempo promedio de respuesta del sistema < 500ms
- Satisfacción del cliente > 4.5/5 estrellas

## 3) Características Principales (MVP)

### 3.1 Gestión de Catálogo de Productos
- Catálogo organizado por categorías principales:
  - Libros (literatura, textos escolares, etc.)
  - Artículos de librería (cuadernos, lápices, etc.)
  - Papelería (oficina, escolares, etc.)
- Cada producto puede tener múltiples variantes (color, tamaño, tipo)
- Gestión de marcas, precios, IVA y códigos SKU/EAN
- Búsqueda avanzada con filtros por categoría, marca y rango de precios
- Control de inventario en tiempo real
- Gestión de imágenes y descripciones detalladas

**Criterio de aceptación:** Los visitantes pueden navegar por las categorías, ver detalles de productos y verificar el stock disponible por variante.

### 3.2 Carrito de Compras y Checkout
- Agregar/eliminar productos del carrito
- Selección de variantes y cantidades
- Cálculo automático de subtotales, impuestos y totales
- Aplicación de códigos de descuento
- Sistema de reserva de stock por 15 minutos al iniciar el checkout
- Opción de compra como invitado o con cuenta de usuario
- Gestión de direcciones de envío y facturación
- Selección de método de entrega (envío a domicilio o retiro en local)
- Cálculo de costos de envío según zona/código postal

**Criterio de aceptación:** El sistema evita sobreventas mostrando disponibilidad en tiempo real y notificando cuando un producto se agota durante el proceso de compra.

### 3.3 Proceso de Pago
- Integración con Mercado Pago (Checkout Pro)
- Soporte para múltiples métodos de pago
- Procesamiento seguro de transacciones
- Webhook para actualización automática de estados de pago
- Generación de facturas y comprobantes
- Notificaciones por email de confirmación de pago

**Criterio de aceptación:** Al confirmarse un pago, el sistema actualiza automáticamente el estado del pedido y descuenta el stock correspondiente.

### 3.4 Gestión de Pedidos
- Seguimiento de estados: CREADO → PAGO_PENDIENTE → PAGO_APROBADO → PREPARANDO → DESPACHADO → ENTREGADO → CANCELADO
- Notificaciones por email en cada cambio de estado
- Historial de pedidos para usuarios registrados
- Sistema de cancelación con devolución de stock cuando corresponda
- Tiempos de preparación: 24-48 horas hábiles

### 3.5 Escaneo de Listas de Útiles Escolares
- Carga de listas en formato digital o mediante imágenes
- Procesamiento de imágenes con reconocimiento de productos
- Identificación automática en el inventario
- Generación de presupuesto detallado
- Opción para agregar productos faltantes al carrito
- Comparación de precios entre marcas o alternativas

### 3.6 Generación de Presupuestos
- Cálculo automático de costos basado en listas de útiles
- Opciones de ahorro (packs, ofertas especiales)
- Desglose detallado de costos
- Guardado y recuperación de presupuestos
- Conversión directa a pedido
- Compartir presupuesto por email o enlace

### 3.7 Panel de Administración
- Gestión completa de productos, categorías y variantes
- Control de inventario con alertas de stock bajo
- Gestión de precios, descuentos y promociones
- Administración de pedidos y seguimiento de estados
- Reportes de ventas y estadísticas
- Gestión de usuarios y permisos
- Configuración de la tienda y métodos de pago

### 3.8 Notificaciones
- Confirmación de pedidos y actualizaciones de estado
- Recordatorios de carrito abandonado
- Notificaciones de stock bajo para administradores
- Alertas de pedidos pendientes de preparación
- Comunicación de ofertas y promociones personalizadas

### 1. Gestión de Catálogo de Productos
- Catálogo organizado por categorías principales:
  - Libros
  - Librería
  - Papelería
- Cada producto puede tener múltiples variantes (ej: tapa blanda/dura, tamaños, colores)
- Control de inventario en tiempo real
- Gestión de precios y descuentos

### 2. Sistema de Carrito de Compras
- Agregar/eliminar productos del carrito
- Seleccionar variantes de productos
- Calcular totales automáticamente
- Aplicar códigos de descuento
- Guardar carrito para más tarde

### 3. Gestión de Usuarios
- Registro e inicio de sesión de clientes
- Perfiles de usuario con historial de compras
- Direcciones de envío y facturación
- Preferencias de notificación

### 4. Proceso de Pago
- Integración con pasarelas de pago
- Diferentes métodos de pago
- Cálculo de costos de envío
- Generación de facturas y comprobantes

### 5. Escaneo de Listas de Útiles Escolares (Función Especial)
- Carga de listas de útiles escolares en formato digital o escaneadas
- Procesamiento de imágenes para reconocer productos
- Identificación automática de productos en el inventario
- Generación de presupuesto detallado
- Opción para agregar productos faltantes al carrito
- Comparación de precios con diferentes marcas o alternativas

### 6. Generación de Presupuestos
- Cálculo automático de costos basado en la lista de útiles
- Opciones de ahorro (packs, ofertas especiales)
- Desglose detallado de costos
- Guardar y compartir presupuestos
- Conversión de presupuesto a pedido

### 7. Panel de Administración
- Gestión de productos y categorías
- Control de inventario
- Reportes de ventas y estadísticas
- Gestión de usuarios y permisos
- Configuración de la tienda

### 8. Notificaciones
- Confirmación de pedidos
- Actualizaciones de envío
- Recordatorios de carrito abandonado
- Ofertas y promociones personalizadas

## 4. Arquitectura del Sistema

### 4.1 Diagrama de Arquitectura
```
[Cliente Web/Móvil] → [CDN] → [Balanceador de Carga]
                                      │
                                      ▼
[API Gateway] ←→ [Servicio de Autenticación]
      │
      ├─→ [Servicio de Catálogo] ←→ [Base de Datos PostgreSQL]
      ├─→ [Servicio de Carrito] ←→ [Redis Cache]
      ├─→ [Servicio de Pedidos] ←→ [Base de Datos PostgreSQL]
      ├─→ [Servicio de Pagos] ←→ [Mercado Pago API]
      └─→ [Servicio de Notificaciones] → [Email/SMS/Push]
```

### 4.2 Patrones de Diseño
- Arquitectura de microservicios
- Patrón CQRS para consultas complejas
- Event Sourcing para transacciones críticas
- Circuit Breaker para llamadas a servicios externos
- Repository Pattern para acceso a datos

## 5. Modelo de Datos

### 5.1 Entidades Principales
- **Usuario**: Información de clientes y administradores
- **Producto**: Catálogo de artículos con variantes
- **Categoría**: Jerarquía de categorías de productos
- **Pedido**: Transacciones de compra
- **Institución**: Perfiles de instituciones educativas
- **Lista de Útiles**: Plantillas de listas escolares

### 5.2 Relaciones Clave
- Un Usuario puede tener múltiples Pedidos
- Un Producto puede tener múltiples Variantes
- Una Categoría puede tener múltiples Subcategorías
- Una Institución puede tener múltiples Usuarios
- Una Lista de Útiles puede contener múltiples Productos

## 6. Reglas de Negocio

- **Gestión de Stock:**
  - Solo se permite la venta cuando `stock_disponible ≥ cantidad solicitada`
  - Reserva automática de stock por 15 minutos al iniciar el checkout
  - Descuento definitivo del stock al confirmarse el pago
  - Cancelación de pedidos libera el stock reservado

- **Precios y Pagos:**
  - Todos los precios incluyen IVA
  - Soporte para múltiples métodos de pago a través de Mercado Pago
  - Generación automática de facturas electrónicas

- **Entregas:**
  - Cálculo de costos de envío por zona/CP
  - Opción de retiro en local con horario acordado
  - Tiempo de preparación estándar de 24-48 horas hábiles

- **Seguridad:**
  - Protección de datos personales y financieros
  - Transacciones seguras con encriptación SSL
  - Copias de seguridad diarias de la base de datos

## 7. Flujos de Trabajo Principales

### 7.1 Flujo de Compra (End-to-End)
1. **Navegación y Selección:**
   - Cliente explora el catálogo o carga lista de útiles
   - Sistema muestra disponibilidad en tiempo real
   - Productos seleccionados se agregan al carrito
   - Validación de stock y precios en tiempo real

2. **Checkout:**
   - Inicio del proceso de compra
   - Reserva de stock por 15 minutos
   - Autenticación/Registro de usuario
   - Gestión de direcciones de envío/facturación
   - Selección de método de envío y pago
   - Aplicación de códigos de descuento

3. **Procesamiento de Pago:**
   - Integración con Mercado Pago
   - Validación de datos de pago
   - Procesamiento seguro de transacciones
   - Confirmación automática vía email
   - Actualización de inventario

4. **Preparación y Entrega:**
   - Notificación al administrador
   - Actualización de estados del pedido
   - Generación de etiquetas de envío
   - Seguimiento en tiempo real
   - Confirmación de entrega

### 7.2 Flujo de Gestión de Inventario
1. Actualización de stock en tiempo real
2. Alertas de stock mínimo
3. Sincronización con puntos de venta físicos
4. Gestión de devoluciones y ajustes

### 7.3 Flujo de Atención al Cliente
1. Sistema de tickets de soporte
2. Chat en vivo
3. Seguimiento de reclamos
4. Gestión de devoluciones

## 8. Integraciones

### 8.1 Pasarelas de Pago
- **Mercado Pago**
  - Procesamiento de pagos en línea
  - Gestión de reembolsos
  - Suscripciones recurrentes
  - Split de pagos

### 8.2 Logística
- **API de Códigos Postales**
  - Cálculo de costos de envío
  - Validación de direcciones
  - Tiempos de entrega estimados

### 8.3 Comunicaciones
- **Email Transaccional**
  - Confirmaciones de pedido
  - Actualizaciones de envío
  - Facturas electrónicas
  - Comunicaciones promocionales

### 8.4 Analíticas
- **Google Analytics**
  - Seguimiento de conversiones
  - Comportamiento de usuarios
  - Embudos de conversión

### 8.5 Seguridad
- **reCAPTCHA**
  - Prevención de fraude
  - Protección contra bots
  - Validación de formularios

## 9. Seguridad y Cumplimiento

### 9.1 Medidas de Seguridad
- Encriptación de datos en tránsito (TLS 1.3+)
- Encriptación de datos en reposo (AES-256)
- Autenticación de dos factores (2FA)
- Protección contra inyección SQL
- Prevención de XSS y CSRF
- Rate limiting y protección DDoS

### 9.2 Cumplimiento Normativo
- Ley de Protección de Datos Personales (Argentina)
- RGPD (para clientes internacionales)
- PCI DSS para procesamiento de pagos
- Facturación electrónica AFIP
- Retenciones impositivas automáticas

### 9.3 Auditoría y Monitoreo
- Registro detallado de auditoría
- Monitoreo 24/7
- Alertas de seguridad
- Copias de seguridad automáticas
- Plan de recuperación ante desastres

## 10. Hoja de Ruta

### 10.1 Fase 1 - MVP (Mes 1-3)
- Catálogo de productos básico
- Carrito de compras y checkout
- Integración con Mercado Pago
- Panel de administración básico
- Gestión de usuarios

### 10.2 Fase 2 - Optimización (Mes 4-6)
- Sistema de fidelización
- Recomendaciones personalizadas
- Mejoras en UX/UI
- Optimización de rendimiento
- Herramientas de marketing

### 10.3 Fase 3 - Expansión (Mes 7-12)
- Aplicación móvil nativa
- Integración con sistemas escolares
- Comercio B2B
- Internacionalización
- Inteligencia de negocios avanzada

### 10.4 Futuras Mejoras
- Asistente virtual con IA
- Realidad aumentada para visualización de productos
- Integración con redes sociales
- Marketplace para vendedores externos
- Sistema de dropshipping

## 11. Documentación Adicional

### 11.1 Glosario de Términos
- **SKU**: Código único de identificación de producto
- **B2B**: Negocio a Negocio (Business to Business)
- **KPI**: Indicador Clave de Rendimiento
- **API**: Interfaz de Programación de Aplicaciones
- **UI/UX**: Interfaz de Usuario / Experiencia de Usuario

### 11.2 Referencias
- Documentación de la API
- Manual de Usuario
- Guía de Implementación
- Políticas de Seguridad

### 11.3 Historial de Cambios
| Versión | Fecha       | Descripción de Cambios                     |
|---------|-------------|--------------------------------------------|
| 1.0     | 05/10/2024  | Versión inicial del documento              |
| 1.1     | 05/10/2024  | Actualización de requisitos técnicos        |
| 1.2     | 05/10/2024  | Adición de diagramas de arquitectura        |

## 12. Aprobaciones

**Elaborado por:** ____________________  
**Revisado por:** ____________________  
**Aprobado por:** ____________________  
**Fecha de Aprobación:** __________

---
*Documento propiedad de Librería Arco Iris. Uso exclusivo interno.*
