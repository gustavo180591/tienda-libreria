# Sistema de Gestión para Librería Arco Iris

## Descripción General

Librería Arco Iris es una tienda online especializada en la venta de artículos de librería, libros y útiles escolares con control de stock en tiempo real. El sistema permite a los clientes realizar compras 24/7 con opciones de pago en línea, retiro en local y envíos por zona. Está diseñado para ofrecer una experiencia de compra fluida tanto a clientes finales como a instituciones educativas.

**Ubicación:** Eva Perón 1234, Villa Cabello, Posadas - Misiones  
**Contacto:** chabelalibreria@gmail.com | +54 9 376 123-4567

## 2) Objetivos del Sistema

- Facilitar compras de útiles escolares 24/7 desde cualquier dispositivo
- Garantizar la precisión del inventario con control de stock en tiempo real
- Prevenir sobreventas mediante reserva de stock durante el proceso de pago
- Simplificar la operación con un panel administrativo intuitivo
- Ofrecer presupuestos personalizados a partir de listas de útiles escolares
- Proporcionar múltiples opciones de pago y entrega

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

## 4) Reglas de Negocio

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

## 5) Flujo de Compra (End-to-End)

1. **Navegación y Selección:**
   - El cliente explora el catálogo o carga su lista de útiles
   - El sistema muestra disponibilidad en tiempo real
   - Los productos seleccionados se agregan al carrito

2. **Checkout:**
   - El cliente inicia el proceso de compra
   - El sistema reserva el stock por 15 minutos
   - Se completan datos de envío y facturación
   - Se selecciona método de entrega (envío o retiro)

3. **Pago:**
   - Redirección a Mercado Pago
   - Procesamiento seguro del pago
   - Confirmación automática vía email

4. **Preparación y Entrega:**
   - El sistema notifica al administrador del nuevo pedido
   - Se prepara el pedido y se actualiza el estado
   - Se programa la entrega o se notifica para retiro
   - El cliente recibe actualizaciones por email

## 6) Integraciones

- **Mercado Pago:** Para procesamiento de pagos seguros
- **Sistema de Notificaciones:** Envío de emails transaccionales
- **API de Códigos Postales:** Para cálculo de costos de envío
- **Herramientas Analíticas:** Seguimiento de métricas y conversiones

## 7) Requisitos Técnicos

- **Frontend:**
  - Navegadores web modernos (Chrome, Firefox, Safari, Edge)
  - Diseño responsive para móviles y escritorio
  - Soporte para carga de imágenes

- **Backend:**
  - Servidor con soporte para Node.js
  - Base de datos PostgreSQL
  - Almacenamiento en la nube para imágenes
  - Certificado SSL para conexiones seguras

- **Dispositivos Móviles:**
  - Cámara para escanear listas de útiles
  - Conexión a internet estable

## 8) Próximas Mejoras (Fase 2)

- **Para Clientes:**
  - Aplicación móvil nativa
  - Programa de fidelización
  - Sistema de recomendaciones personalizadas
  - Suscripciones para suministros recurrentes
  - Asistente virtual para búsqueda de productos

- **Para el Negocio:**
  - Integración con sistemas de gestión escolar
  - Módulo B2B para instituciones educativas
  - Sistema de cotizaciones para compras al por mayor
  - Integración con más opciones de envío (Andreani, OCA)
  - Panel de control con métricas avanzadas
  - Herramientas de marketing automatizado

- **Tecnológicas:**
  - API pública para integraciones
  - Mejoras en el reconocimiento de imágenes
  - Sistema de caché para mejor rendimiento
  - Internacionalización (múltiples idiomas y monedas)

## 9) Consideraciones Finales

Este documento representa la versión inicial del sistema y está sujeto a ajustes según las necesidades del negocio y la retroalimentación de los usuarios. El enfoque inicial está en garantizar una experiencia de compra fluida y confiable, con especial atención al control de inventario y la generación de presupuestos a partir de listas de útiles escolares.

**Aprobado por:** ____________________  
**Fecha:** __________
