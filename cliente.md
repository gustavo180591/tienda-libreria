# Estado del Proyecto

[x] Configuración inicial del proyecto con SvelteKit y Tailwind CSS
[x] Diseño responsive básico
[x] Esquema de colores y tipografía
[x] En desarrollo


1) Propuesta de valor (clara y ganadora)

[x] Todo en un solo lugar: escolares, oficina, arte, premium (plumas/repuestos), kawaii/deco, organización minimal.
[ ] Entrega país entero con tarifas claras y ETAs reales: AMBA 24–48 h, interior 48–96 h.
[ ] Carritos "Lista Escolar en 1 clic": subís foto/PDF/Excel → OCR + mapeo automático →

2) Catálogo maestro (sin olvidarnos de nada)

**Escritura**
- [x] Biromes (clásicas, gel, roller)
- [x] Lápices grafito y de color
- [ ] Portaminas + minas
- [ ] Marcadores (pizarra/permanentes)
- [ ] Resaltadores
- [ ] Plumas y repuestos (cartuchos, convertidores, puntas)

**Papel & cuadernos**
- [x] Cuadernos (A4/A5, tapa dura/blanda)
- [x] Hojas de dibujo
- [ ] Repuestos (Rivadavia/Éxito)
- [ ] Blocks varios
- [ ] Papel fotográfico
- [ ] Sticky notes y fichas

**Organización & archivo**
- [ ] Carpetas (anillas/escolares)
- [ ] Folios y separadores
- [ ] Planificadores y agendas
- [ ] Biblioratos
- [ ] Cajas de archivo
- [ ] Estuches y organizadores de escritorio

**Adhesivos & corte**
- [ ] Pegamentos (barra, vinílico, pistola)
- [ ] Correctores
- [ ] Cintas (scotch/washi/embalaje)
- [ ] Tijeras/cúters + repuestos
**Dibujo & arte**
- [x] Lápices de colores
- [ ] Acrílicos/acuarelas/tempera
- [ ] Pinceles y espátulas
- [ ] Marcadores artísticos
- [ ] Carbonilla y pasteles
- [ ] Sets escolares de arte

**Tecnología & extra**
- [ ] Calculadoras (básica/científica)
- [ ] Reglas/escuadras/transportador/compás
- [ ] Mochilas/cartucheras/portadibujos
- [ ] Etiquetas escolares personalizadas

**Líneas temáticas**
- [x] Minimal MUJI-like: cuadernos neutros, lapiceras finas, organizers
- [ ] Kawaii/decó: stickers, washi tapes, sets temáticos
- [ ] Premium escritura: Lamy, Pilot, Kaweco, TWSBI, recargas y nibs
- [ ] Oficina & empresa: insumos a granel, cajas por mayor, tintas/toners

Oficina & empresa: insumos a granel, cajas por mayor, tintas/toners (curado por compatibilidad).

3) UX que combina lo mejor de todas

Búsqueda brutal (sinónimos y atributos: “birome 0.5”, “papel 90 g”, “marcador punta pincel”).

Filtros granulares (gramaje, tamaño, punta, tinta, pack/pack-ahorro).

Fichas tipo JetPens: fotos macro, pruebas de trazo, comparadores y tablas de compatibilidad.

“Build-a-Kit”: asistente que arma tu lista por nivel/colegio/actividad con presupuesto tope.

Bundles inteligentes (útiles + mochila + cartuchera; dibujo + block + pinceles).

Repuestos & consumibles: CTA de reposición con 1 clic en productos que se gastan.

Wishlist/guardados, historial de compras, recompra en 2 clics.

Checkout sin fricción (guest checkout, DNI opcional hasta facturación, dirección autocompletada).

WhatsApp flotante + chat: “¿Esta recarga sirve para la Lamy Safari?”.

4) Logística Argentina (lo que funciona)

Operadores: Andreani, OCA, Correo Argentino; Mercado Envíos como canal adicional; moto same-day en CABA/AMBA; pick-up points (sucursales/locker).

SLA y promesas por CP: calculadora de entrega en PDP y carrito.

Envío gratis por umbral escalonado (AMBA vs interior).

Packing sostenible (cartón reciclado + protección responsable) y tracking proactivo por WhatsApp/SMS/email.

Devoluciones simples: etiqueta desde el panel, pick-up o sucursal, reintegro ágil.

5) Pagos y fiscal (sin dolores)

Medios: Mercado Pago (tarjetas, cuotas Ahora 3/6/12), débito, transferencia, MODO, Rapipago/Pago Fácil.

Factura electrónica AFIP A/B, CUIT/CUIL, percepciones IVA/IIBB donde corresponda.

Botón de Arrepentimiento, Defensa del Consumidor 24.240, Ley 25.326 (datos), Términos & Garantías visibles y simples.

6) Precios, promos y lealtad (modelo que rinde)

Precio dinámico por elasticidad y temporada (pico dic–mar y jul–ago).

Bundles con descuento creciente, pack-ahorro (repuestos, hojas, minas).

Programa de puntos: 1 ARS gastado = 1 punto; canje por descuentos/envíos.

Suscripciones con 5–10% OFF en consumibles.

Eventos locales: Hot Sale, CyberMonday, Back-to-School, Vuelta a Clases de mitad de año.

B2B/B2E: convenios con escuelas/empresas, facturación mensual, listas preaprobadas.

7) Contenidos que venden (educación + SEO)

Guías “Cómo elegir la punta ideal”, “Gramajes de papel: guía visual”, “Comparativa resaltadores”.

Videos cortos de pruebas de tinta/ghosting/bleed-through.

User content: fotos de notas, dibujos; reviews útiles de verdad (con fotos).

Landing por colegio/curso: SEO local (“Lista Colegio San Martín 4° grado Posadas”) + importador de lista (foto/PDF → carrito).

8) Operación & abastecimiento

Mix local + importado (acuerdos con distribuidores, importadores y marcas).

Forecast con histórico y picos (temporadas escolares).

ABC de inventario (A: rotación alta, B: media, C: nicho/premium) y mínimos de seguridad.

QA de compatibilidades (plumas ↔ cartuchos; impresoras ↔ toners).

Surtido “estrella” siempre disponible: biromes negras/azules, repuestos N° 3, hojas A4 80–90 g, resaltadores flúo, cuadernos A4 tapa dura, lápiz HB, reglas 30 cm, cinta scotch, pegamento barra, corrector.

9) Tech stack (rápido y escalable)

Frontend: SvelteKit + Tailwind + SSR/ISR, accesible y veloz.

Backend: NestJS + PostgreSQL; Redis para cache/carrito; colas para notificaciones y OCR.

Pagos/Envíos: Mercado Pago, integraciones Andreani/OCA/Correo; alternativamente Mercado Envíos.

Search: Meilisearch/Elastic con sinónimos (birome/bolígrafo/lapicera).

OCR listas: Tesseract + pipeline de normalización y catálogo con atributos (marca, punta, gramaje).

Panel admin: precios, stock, kitting, reglas de promo, SLA y costos por CP.

Analítica: eventos (add_to_cart, checkout), NPS, cohortes de recompra, RFM.

10) Cumplimiento & confianza

Política de cambios/devoluciones clara (10 días por arrepentimiento; 6 meses garantía fabricante donde aplique).

Seguridad: PCI-DSS (vía PSP), encriptación, 2FA admin, backups.

Accesibilidad AA, textos legibles, contraste, navegación teclado.

Rutas (REST)
Auth (opcional pero práctico)

POST /auth/register – crear usuario (email, password)

POST /auth/login – login (devuelve token)

Users

GET /users – lista paginada
Params: page, pageSize, q (busca por email), sort (createdAt:desc)

POST /users – crear (email, passwordHash/clave ya hasheada, role)

GET /users/{id} – detalle

PATCH /users/{id} – actualizar (email, role, etc.)

DELETE /users/{id} – borrar

GET /users/{id}/orders – órdenes del usuario (paginado)

Products

GET /products – lista paginada
Params: page, pageSize, q (search por nombre), sort

POST /products – crear (name, description)

GET /products/{id} – detalle (+ ?include=variants)

PATCH /products/{id} – actualizar

DELETE /products/{id} – borrar

Variants (dos estilos: nested y plano)

GET /products/{productId}/variants – listar variantes del producto
Params: page, pageSize, sku, currency, stockMin, stockMax, sort

POST /products/{productId}/variants – crear variante de ese producto

GET /variants – listar todas las variantes (filtro global)
Params: productId, sku, currency, stockMin, stockMax, sort, paginado

GET /variants/{id} – detalle

PATCH /variants/{id} – actualizar (precio, stock, sku…)

DELETE /variants/{id} – borrar

Orders

GET /orders – lista paginada
Params: page, pageSize, status, userId, dateFrom, dateTo, sort

POST /orders – crear orden (opcional userId, items[])

GET /orders/{id} – detalle (+ ?include=items,user)

PATCH /orders/{id} – actualizar (status, userId, total si necesitás override)

DELETE /orders/{id} – borrar

Order Items (operaciones sobre la orden)

POST /orders/{orderId}/items – agregar ítem (variantId, quantity, price)

PATCH /orders/{orderId}/items/{itemId} – cambiar cantidad/precio

DELETE /orders/{orderId}/items/{itemId} – eliminar ítem

POST /orders/{orderId}/recalculate – recalcular total (suma de item.price * item.quantity)

POST /orders/{orderId}/checkout – marcar status = "PAID" (o el que uses)

Parámetros estándar (sugeridos)

Paginación: page (default 1), pageSize (default 20, max 100)

Orden: sort con formato campo:dir (ej: createdAt:desc)

Búsqueda: q para texto (name, email, sku)

Incluidos: include=variants,user,items (coma separada)

Códigos de estado comunes

200 OK / 201 Created / 204 No Content

400 Bad Request / 401 Unauthorized / 404 Not Found / 409 Conflict / 422 Unprocessable Entity