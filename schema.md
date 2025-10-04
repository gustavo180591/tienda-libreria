¡Bien ahí, Gustavo! Tu schema.prisma está muy sólido. Se puede ir a producción como está.
Ahora, como “experto quisquilloso”, te propongo afinaciones no-rupturistas (no cambian el comportamiento funcional) y 1 corrección crítica para evitar un susto con datos históricos.

🔧 Ajustes seguros (no rompen nada)
1) Tipar longitudes y case-insensitive donde suma (PostgreSQL)

Mejora performance de índices y evita basura de datos.

Opcional: usar citext para email/slug y tener unicidad case-insensitive.

// Habilitar citext (requiere extension en DB; si no, omite @db.Citext)
model User {
  id           String   @id @default(cuid())
  email        String   @unique @db.Citext   // ⬅️ opcional, requiere extensión
  passwordHash String
  firstName    String?  @db.VarChar(80)
  lastName     String?  @db.VarChar(80)
  role         Role     @default(CUSTOMER)
  // ...
}

model Category {
  id          String   @id @default(cuid())
  name        String   @db.VarChar(100)
  slug        String   @unique @db.VarChar(140) // opcional @db.Citext si querés case-insensitive
  description String?
  // ...
}

model Product {
  id          String   @id @default(cuid())
  name        String   @db.VarChar(160)
  slug        String   @unique @db.VarChar(160) // opcional @db.Citext
  // ...
}

model ProductVariant {
  id      String  @id @default(cuid())
  name    String  @db.VarChar(120)
  sku     String  @unique @db.VarChar(64) // longitudes típicas de SKU
  // ...
}

model Media {
  id        String   @id @default(cuid())
  url       String   @db.Text          // URLs largas
  alt       String?  @db.VarChar(160)  // SEO/ACCESIBILIDAD
  // ...
}

model Address {
  // ...
  street     String   @db.VarChar(120)
  city       String   @db.VarChar(80)
  state      String   @db.VarChar(80)
  postalCode String   @db.VarChar(16)
  country    String   @default("Argentina") @db.VarChar(56)
  // ...
}


Extensión citext (opcional):

CREATE EXTENSION IF NOT EXISTS citext;


Si no querés la extensión, dejá String simple con @db.VarChar.

2) Índices extra “baratos” para consultas comunes

No cambian lógica; sólo aceleran listados y filtros.

model Product {
  // ...
  @@index([categoryId, isActive, featured])
  @@index([createdAt])
}

model ProductVariant {
  // ...
  @@index([isActive, stock])
  @@index([currency])
}

model Order {
  // ...
  @@index([createdAt])
  @@index([currency])
}

model OrderItem {
  // ...
  @@index([orderId, createdAt])
}

model Cart {
  // ...
  @@index([sessionId]) // ya es unique; el index explícito ayuda en lecturas
}

3) Campos de “soft delete” (no usados por defecto)

No afectan nada si no los usás; habilitan borrado lógico futuro.

model Product {
  // ...
  deletedAt DateTime? @default(NULL)
}
model ProductVariant {
  // ...
  deletedAt DateTime? @default(NULL)
}


Si no los consumís en queries, es totalmente no-op.

4) Snapshots simétricos de dirección (opcional, no intrusivo)

Ya tenés shippingAddressJson. Agrego billingAddressJson opcional.

model Order {
  // ...
  shippingAddressJson Json?
  billingAddressJson  Json?   // ⬅️ nuevo, sin uso obligatorio
  // ...
}

🚨 Corrección importante (sí te la recomiendo de una)

Hoy tenés en OrderItem referencia directa a Product con onDelete: Cascade:

model OrderItem {
  // ...
  productId String
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  // ...
}


Riesgo: si algún día borrás un Product, Prisma/PG borrará también los OrderItem históricos.
Eso sí cambia comportamiento (de cara a datos), pero en la práctica es para evitar pérdida.

Propuesta segura:

Hacer el vínculo opcional y SET NULL. Tu orden ya guarda snapshots (productName, variantName, sku, precios), así que no perdés información.

model OrderItem {
  // ...
  productId String?
  product   Product? @relation(fields: [productId], references: [id], onDelete: SetNull)
  // ...
}


Si preferís mantenerlo obligatorio, al menos cambia Cascade → Restrict para impedir borrar un producto usado en ventas:

product   Product @relation(fields: [productId], references: [id], onDelete: Restrict)


Conclusión: este ajuste no toca flujos de compra, pero te salva históricos.

🧪 Consistencia (reglas de negocio documentadas)

No se pueden expresar 100% en Prisma, pero dejá tests/validators:

Moneda de ítems == moneda de la orden.

quantity > 0 y stock >= 0 (y reserva de stock en checkout).

SKU único case-insensitive (si no usás citext, normalizá a upper en app).

lineTotal = unitPrice * quantity (recalc en POST /orders/:id/recalculate).

🛠️ Migraciones sugeridas (si aplicás los ajustes)
# 1) Longitudes y tipos
npx prisma migrate dev -n "varchar_lengths_and_text"

# 2) Indices extra
npx prisma migrate dev -n "extra_read_indexes"

# 3) Soft delete opcional
npx prisma migrate dev -n "soft_delete_columns"

# 4) OrderItem.product onDelete fix (elige SetNull o Restrict)
npx prisma migrate dev -n "orderitem_product_ondelete_fix"


Si activás citext, hacelo antes:

psql $DATABASE_URL -c "CREATE EXTENSION IF NOT EXISTS citext;"
npx prisma migrate dev -n "citext_email_slug"

Resumen en una línea

Así como está, está bien.

Si querés afinar sin romper, aplicá: (a) longitudes + citext opcional, (b) índices de lectura, (c) deletedAt opcional, (d) cambiar Cascade en OrderItem.product por SetNull o Restrict (recomendado).