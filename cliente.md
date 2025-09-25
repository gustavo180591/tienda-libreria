# Requerimientos del Cliente — Tienda de Librería Online

> Documento **cliente.md** — versión 1.0

## 1) Resumen ejecutivo
Tienda online para vender artículos de librería **a pedido y con control de stock real**, con pagos en línea, retiro en local y envíos por zona. Orientada a clientes finales y (en una segunda etapa) instituciones/empresas.

## 2) Objetivos
- Facilitar compras de útiles 24/7 desde celular o PC.
- Evitar sobreventas mediante control de **stock disponible**.
- Simplificar la operación: carga de productos, precios, seguimiento de pedidos.

## 3) Alcance (MVP)
### 3.1 Catálogo
- Categorías, marcas y productos con variantes (color/tamaño).
- Fotos, descripción, precio, IVA, SKU/EAN.
- Búsqueda y filtros básicos (categoría, marca, precio).

**Criterio de aceptación:**
- Un visitante puede navegar categorías, abrir un producto y ver stock por variante.

### 3.2 Carrito y Checkout
- Agregar/quitar productos, ver subtotal/total.
- Datos del comprador, dirección y método de entrega (envío/retiro en local).
- **Reserva de stock por 15 minutos** al iniciar el checkout.

**Criterio de aceptación:**
- Dos usuarios no pueden comprar más unidades de las disponibles; si se acaba la reserva o el stock, el sistema lo informa.

### 3.3 Pagos en línea
- Integración **Mercado Pago (Checkout Pro)** en entorno sandbox y luego producción.
- Webhook para actualizar estado de pago (pendiente, aprobado, rechazado).

**Criterio de aceptación:**
- Al aprobarse el pago, el pedido cambia a "PAGO_APROBADO" y se **descuenta** el stock.

### 3.4 Entrega
- Opción **envío** con costo por zona/código postal.
- Opción **retiro en local** con franja horaria.

**Criterio de aceptación:**
- El checkout calcula y muestra el costo de entrega según la dirección o marca retiro en local.

### 3.5 Cuenta de usuario (básica)
- Compra como invitado o registración simple (email/nombre/teléfono).
- Historial de pedidos (fase 2).

### 3.6 Panel Administrador
- CRUD de productos/variantes.
- Gestión de stock y precios.
- Listado de pedidos con cambio de estado: CREADO → PAGO_PENDIENTE → PAGO_APROBADO → PREPARANDO → DESPACHADO → ENTREGADO → CANCELADO.

**Criterio de aceptación:**
- Un operador puede crear/editar productos, ajustar stock y actualizar estados de pedidos.

## 4) Reglas de negocio
- **Stock real:** solo se vende si `stock_disponible ≥ cantidad solicitada` .
- **Reserva:** al iniciar checkout, se reserva stock **15 min**; si no se paga, se libera automáticamente.
- **Descuento definitivo:** al recibir pago aprobado, se descuenta del disponible.
- **Cancelación:** libera reservas y devuelve stock.
- **Precios:** precio final con IVA; posibilidad de cupones o combos en fase 2.

## 5) Flujo de compra (end-to-end)
1. Cliente navega el catálogo y agrega productos.
2. Va al checkout → completa datos → el sistema **reserva stock** 15′.
3. Redirección a pago (MP).
4. Pago aprobado → confirmación por email/WhatsApp → estado "PAGO_APROBADO".
5. Operador prepara y despacha o agenda retiro → cliente recibe notificación.

## 6) Contenidos y datos iniciales
- CSV con 100–200 productos: `sku,nombre,descripcion,categoria,marca,atributo,precio,iva,moneda,ean13,imagenUrl,stock` .
- Imágenes en buena calidad (1000px lado mayor). 
- Datos de negocio: CUIT, condición IVA, dirección del local, políticas de cambio/devolución.

## 7) Integraciones
- **Pagos:** Mercado Pago (sandbox → prod).
- **Notificaciones:** Email (y opcional WhatsApp Business en fase 2).
- **Envíos:** tabla por zonas (fase 1) y opcional Andreani/OCA (fase 2).

## 8) Operación y logística
- Tiempos de preparación: 24–48 h hábiles.
- Envíos por franja horaria (si aplica) o despacho al día siguiente.
- Retiro en local con comprobante de pedido.

## 9) Reportes (mínimos)
- Ventas por período.
- Productos más vendidos.
- Stock bajo mínimos (alertas).

## 10) Seguridad y cumplimiento
- Protección de datos del cliente (contraseñas encriptadas, HTTPS, cookies seguras).
- Auditoría de cambios de stock y estados de pedido.
- Backups de base de datos diarios.

## 11) Fuera de alcance (fase 1)
- Programas de fidelidad, puntos o gift cards.
- Multi-sucursal con stock por tienda (se verá en fase 2 si aplica).
- B2B con cotizaciones y listas mayoristas (fase 2).

## 12) Hitos y plazos (estimado)
- **Semana 1:** Catálogo+stock, carrito, checkout con reserva.
- **Semana 2:** Pagos (MP), entrega/retiro, panel admin básico, reportes mínimos.
- **Semana 3:** Carga masiva real, pruebas y lanzamiento.

## 13) Criterios de aceptación (checklist)
- [ ] Catálogo navegable con stock en tiempo real.
- [ ] Checkout con reserva de stock por 15 min.
- [ ] Integración Mercado Pago funcionando (sandbox).
- [ ] Panel admin para gestión de productos y pedidos.
- [ ] Notificaciones por email de cambios de estado.
- [ ] Reportes básicos accesibles.

---
*Aprobado por:* ____________________  
*Fecha:* __________
