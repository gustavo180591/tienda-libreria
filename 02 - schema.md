// -----------------------------------------------------------------------------
// schema.prisma — Proyecto tincho (versión mejorada y lista para producción)
// DB: PostgreSQL | Prisma >=5.x
// -----------------------------------------------------------------------------

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ================================ ENUMS ======================================
enum Role {
  ADMIN
  MANAGER
  CUSTOMER
  INSTITUTION
  TEACHER
  WHOLESALE
}

enum Currency {
  ARS
  USD
}

enum QuotationStatus {
  DRAFT
  SENT
  CONVERTED
  EXPIRED
  CANCELLED
  ACCEPTED
  REJECTED
}

enum NotificationType {
  ORDER_UPDATE
  SHIPMENT_UPDATE
  PAYMENT_UPDATE
  PROMOTION
  SYSTEM
  ACCOUNT
  ORDER_CONFIRMATION
  ORDER_SHIPPED
  PAYMENT_RECEIVED
  QUOTATION_CREATED
  QUOTATION_REMINDER
  ACCOUNT_ACTIVITY
  SUBSCRIPTION_RENEWAL
  INSTITUTION_INVITE
  LIST_SHARED
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
  RETURNED
  PAYMENT_RECEIVED
  AWAITING_PAYMENT
  PAYMENT_FAILED
  ON_HOLD
  COMPLETED
}

// ================================ ENUMS (Additional) ========================
enum InstitutionType {
  SCHOOL
  UNIVERSITY
  TRAINING_CENTER
  GOVERNMENT
  PRIVATE
  OTHER
}

enum SubscriptionFrequency {
  MONTHLY
  QUARTERLY
  SEMI_ANNUAL
  ANNUAL
}

enum SubscriptionStatus {
  ACTIVE
  PAUSED
  CANCELLED
  EXPIRED
}

enum OrderSource {
  WEB
  MOBILE
  INSTITUTION
  WHOLESALE
  PHONE
  IN_PERSON
  MARKETPLACE
}

// ================================ MODELS =====================================
model Institution {
  id          String    @id @default(cuid())
  name        String    @db.VarChar(200)
  taxId       String    @unique @db.VarChar(20)  // CUIT
  
  // Relations
  orders      Order[]   // Orders placed by this institution
  address     String?   @db.Text
  city        String?   @db.VarChar(100)
  state       String?   @db.VarChar(100)
  postalCode  String?   @db.VarChar(20) @map("postal_code")
  phone       String?   @db.VarChar(20)
  email       String?   @db.VarChar(120)
  isActive    Boolean   @default(true) @map("is_active")
  type        InstitutionType @default(SCHOOL)
  level       String?   @db.VarChar(50)  // PRIMARY, SECONDARY, etc.
  
  // Relations
  users       User[]
  lists       SchoolList[]
  
  // Timestamps
  deletedAt   DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  @@map("institutions")
  @@index([taxId])
  @@index([type, level])
  @@index([isActive])
}

// School Lists
model SchoolList {
  id            String    @id @default(cuid())
  name          String    @db.VarChar(200)
  description   String?   @db.Text
  grade         String    @db.VarChar(50)
  schoolYear    String    @db.VarChar(20) @map("school_year")
  isPublic      Boolean   @default(false) @map("is_public")
  items         Json      // Array of { productId, variantId, quantity, notes? }
  
  // Relations
  institution   Institution @relation(fields: [institutionId], references: [id])
  institutionId String
  
  createdBy     User      @relation("CreatedBy", fields: [createdById], references: [id])
  createdById   String
  
  assignedTo    User?     @relation("AssignedTo", fields: [assignedToId], references: [id])
  assignedToId  String?
  
  // Timestamps
  deletedAt     DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  @@map("school_lists")
  @@index([institutionId])
  @@index([grade, schoolYear])
  @@index([isPublic])
}

// Subscriptions
model Subscription {
  id            String    @id @default(cuid())
  
  // Relations
  user          User      @relation(fields: [userId], references: [id])
  userId        String
  
  product       Product   @relation(fields: [productId], references: [id])
  productId     String
  
  variant       ProductVariant @relation(fields: [variantId], references: [id])
  variantId     String
  
  // Subscription details
  quantity      Int
  frequency     SubscriptionFrequency
  nextDelivery  DateTime        @map("next_delivery")
  status        SubscriptionStatus
  
  // Timestamps
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  @@map("subscriptions")
  @@index([userId])
  @@index([status, nextDelivery])
}

// Wishlists
model Wishlist {
  id          String    @id @default(cuid())
  
  // Relations
  user        User      @relation(fields: [userId], references: [id])
  userId      String
  
  // Wishlist details
  name        String    @db.VarChar(100)
  isDefault   Boolean   @default(false) @map("is_default")
  
  // Relations
  items       WishlistItem[]
  
  // Timestamps
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  @@map("wishlists")
  @@index([userId, isDefault])
}

model WishlistItem {
  id          String    @id @default(cuid())
  
  // Relations
  wishlist    Wishlist  @relation(fields: [wishlistId], references: [id], onDelete: Cascade)
  wishlistId  String
  
  product     Product   @relation(fields: [productId], references: [id])
  productId   String
  
  variant     ProductVariant @relation(fields: [variantId], references: [id])
  variantId   String
  
  // Item details
  quantity    Int       @default(1)
  notes       String?   @db.Text
  
  // Timestamps
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  @@map("wishlist_items")
  @@index([wishlistId])
  @@index([productId])
}

// Quotations/Budgets
model Quotation {
  id          String    @id @default(cuid())
  reference   String    @unique @default(uuid()) @db.VarChar(36)
  items       Json      // Array of { productId, variantId, quantity, unitPrice, name, sku, variantName? }
  subtotal    Decimal   @db.Decimal(10, 2)
  taxAmount   Decimal   @default(0) @db.Decimal(10, 2) @map("tax_amount")
  discountAmount Decimal @default(0) @db.Decimal(10, 2) @map("discount_amount")
  total       Decimal   @db.Decimal(10, 2)
  currency    Currency  @default(ARS)
  expiresAt   DateTime  @map("expires_at")
  status      QuotationStatus @default(DRAFT)
  notes       String?   @db.Text
  
  // Relations
  userId      String?
  user        User?     @relation(fields: [userId], references: [id])
  orderId     String?   @unique
  order       Order?    @relation("QuotationToOrder", fields: [orderId], references: [id])
  
  deletedAt   DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  @@map("quotations")
  @@index([userId])
  @@index([status])
  @@index([expiresAt])
}

// Shipping
model ShippingZone {
  id           String    @id @default(cuid())
  name         String    @db.VarChar(100)
  description  String?   @db.Text
  countries    String[]  // Array of ISO country codes
  isActive     Boolean   @default(true) @map("is_active")
  
  // Relations
  rates       ShippingRate[]
  
  deletedAt    DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")
  
  @@map("shipping_zones")
  @@index([isActive])
}

model ShippingRate {
  id             String    @id @default(cuid())
  zoneId         String
  zone           ShippingZone @relation(fields: [zoneId], references: [id])
  name           String    @db.VarChar(100)
  minOrderValue  Decimal   @default(0) @db.Decimal(10, 2) @map("min_order_value")
  maxOrderValue  Decimal?  @db.Decimal(10, 2) @map("max_order_value")
  price          Decimal   @db.Decimal(10, 2)
  estimatedDays  String?   @db.VarChar(50) @map("estimated_days")
  isActive       Boolean   @default(true) @map("is_active")
  
  deletedAt      DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt      DateTime  @default(now()) @map("created_at")
  updatedAt      DateTime  @updatedAt @map("updated_at")
  
  @@map("shipping_rates")
  @@index([zoneId, isActive])
}

// Notifications
model Notification {
  id           String           @id @default(cuid())
  type         NotificationType
  title        String           @db.VarChar(200)
  message      String           @db.Text
  isRead       Boolean          @default(false) @map("is_read")
  metadata     Json?            // Additional data like orderId, quotationId, etc.
  
  // Relations
  userId       String
  user         User             @relation(fields: [userId], references: [id])
  
  scheduledAt  DateTime?        @map("scheduled_at")
  readAt       DateTime?        @map("read_at")
  createdAt    DateTime         @default(now()) @map("created_at")
  updatedAt    DateTime         @updatedAt @map("updated_at")
  
  @@map("notifications")
  @@index([userId, isRead])
  @@index([type])
}

// Audit Log
model AuditLog {
  id          String    @id @default(cuid())
  action      String    @db.VarChar(100)
  entityType  String    @db.VarChar(50) @map("entity_type")
  entityId    String    @db.VarChar(100) @map("entity_id")
  userId      String?
  user        User?     @relation(fields: [userId], references: [id])
  oldData     Json?     @map("old_data")
  newData     Json?     @map("new_data")
  ipAddress   String?   @db.VarChar(45) @map("ip_address")
  userAgent   String?   @db.Text @map("user_agent")
  
  createdAt   DateTime  @default(now()) @map("created_at")
  
  @@map("audit_logs")
  @@index([entityType, entityId])
  @@index([userId])
  @@index([createdAt])
}
// Usuarios
model User {
  id              String         @id @default(cuid())
  email           String         @unique @db.Citext   // Búsqueda case-insensitive
  passwordHash    String         @map("password_hash")
  subscriptions   Subscription[]
  firstName       String?     @db.VarChar(80) @map("first_name")
  lastName        String?     @db.VarChar(80) @map("last_name")
  role            Role        @default(CUSTOMER)
  
  // Institution/Wholesale fields
  institutionId   String?     @map("institution_id") // For users belonging to an institution
  institution     Institution? @relation(fields: [institutionId], references: [id])
  taxId           String?     @db.VarChar(20) @map("tax_id")   // CUIT/CUIL for institutions/wholesale
  isVerified      Boolean     @default(false) @map("is_verified")   // For wholesale account verification
  isWholesale     Boolean     @default(false) @map("is_wholesale")
  isInstitutional Boolean     @default(false) @map("is_institutional")
  
  // Contact information
  phone           String?     @db.VarChar(20)
  address         String?     @db.Text
  city            String?     @db.VarChar(100)
  state           String?     @db.VarChar(100)
  postalCode      String?     @db.VarChar(20) @map("postal_code")
  
  // Preferences
  emailVerified   Boolean     @default(false) @map("email_verified")
  marketingOptIn  Boolean     @default(false) @map("marketing_opt_in")
  
  // Relations
  createdSchoolLists SchoolList[] @relation("CreatedBy")
  assignedSchoolLists SchoolList[] @relation("AssignedTo")
  wishlists      Wishlist[]
  orders         Order[]
  quotations     Quotation[]
  notifications  Notification[]
  auditLogs      AuditLog[]
  addresses      Address[]
  carts          Cart[]
  
  // Timestamps
  lastLoginAt    DateTime?   @map("last_login_at")
  deletedAt      DateTime?   @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  @@map("users")
  @@index([email])
}

// Categorías
model Category {
  id          String    @id @default(cuid())
  name        String    @db.VarChar(100)
  slug        String    @unique @db.Citext   // Búsqueda case-insensitive
  description String?   @db.Text
  isActive    Boolean   @default(true) @map("is_active")
  deletedAt   DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  
  // Relaciones
  products Product[]
  
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  @@map("categories")
  @@index([name])
  @@index([slug])
}

// Productos
model Product {
  id              String    @id @default(cuid())
  name            String    @db.VarChar(160)
  slug            String    @unique @db.Citext   // Búsqueda case-insensitive
  description     String?   @db.Text
  isActive        Boolean   @default(true) @map("is_active")
  featured        Boolean   @default(false)
  categoryId      String    @map("category_id")
  
  // New fields
  isSubscriptionEligible Boolean @default(false) @map("is_subscription_eligible")
  tags            String[]  @default([])  // For additional categorization
  metaKeywords    String?   @db.Text @map("meta_keywords")
  metaDescription String?   @db.Text @map("meta_description")
  
  // New fields
  isbn            String?   @db.VarChar(13)      // For books
  author          String?   @db.VarChar(120)     // For books
  publisher       String?   @db.VarChar(120)     // For books
  gradeLevel      String?   @db.VarChar(50)      // e.g., "Primario 1er Grado"
  subject         String?   @db.VarChar(100)     // e.g., "Matemáticas"
  isEducational   Boolean   @default(false)
  reorderPoint    Int?      @default(10)         // Alert when stock reaches this level
  isWholesaleOnly Boolean   @default(false)
  
  // Relaciones
  category        Category        @relation(fields: [categoryId], references: [id])
  variants        ProductVariant[]
  media           Media[]         @relation("ProductMedia")
  orderItems      OrderItem[]
  cartItems       CartItem[]
  wishlistItems   WishlistItem[]  // Items in wishlists that include this product
  bulkPricings    BulkPricing[]   // For bulk/wholesale pricing
  subscriptions   Subscription[]  // Subscription plans for this product
  
  deletedAt       DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  
  // Índices
  @@index([categoryId, isActive, featured])
  @@index([createdAt])
  @@index([isbn])
  @@index([isEducational])
  @@index([isWholesaleOnly])
  @@map("products")
}

// Variantes de Producto
model ProductVariant {
  id        String    @id @default(cuid())
  name      String    @db.VarChar(120)
  sku       String    @unique @db.Citext   // Búsqueda case-insensitive
  price     Decimal   @default(0) @db.Decimal(10, 2)
  stock     Int       @default(0)
  isActive  Boolean   @default(true) @map("is_active")
  productId String
  
  // Relaciones
  product Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  media   Media[]  @relation("VariantMedia")
  orderItems OrderItem[]
  cartItems CartItem[]
  subscriptions Subscription[]  // Subscriptions using this variant
  wishlistItems WishlistItem[]  // Wishlist items using this variant
  
  deletedAt DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt DateTime  @default(now()) @map("created_at")
  updatedAt DateTime  @updatedAt @map("updated_at")
  
  // Índices
  @@index([isActive, stock])
  @@index([price])
  @@index([productId])
  @@map("product_variants")
}

// Media (imágenes/videos)
model Media {
  id        String    @id @default(cuid())
  url       String    @db.Text
  alt       String?   @db.VarChar(160)
  sortOrder Int       @default(0) @map("sort_order")
  
  // Relaciones
  productId String?
  product   Product?         @relation("ProductMedia", fields: [productId], references: [id], onDelete: Cascade)
  
  variantId String?
  variant   ProductVariant?  @relation("VariantMedia", fields: [variantId], references: [id], onDelete: Cascade)
  
  deletedAt DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt DateTime  @default(now()) @map("created_at")
  
  // Índices
  @@index([productId])
  @@index([variantId])
  @@map("media")
}

// Órdenes
model Order {
  id               String      @id @default(cuid())
  orderNumber      String      @unique @default(uuid()) @db.VarChar(36) @map("order_number")
  orderType        String      @default("RETAIL") @map("order_type") // RETAIL, WHOLESALE, INSTITUTIONAL
  source           OrderSource @default(WEB)
  userId           String?     @map("user_id")
  user             User?       @relation(fields: [userId], references: [id])
  institutionId    String?     @map("institution_id")
  institution      Institution? @relation(fields: [institutionId], references: [id])
  status           OrderStatus @default(PENDING)
  
  // Financials
  subtotal         Decimal     @default(0) @db.Decimal(10, 2)
  total            Decimal     @default(0) @db.Decimal(10, 2)
  currency         Currency    @default(ARS)
  shippingAmount   Decimal     @default(0) @db.Decimal(10, 2) @map("shipping_amount")
  taxAmount        Decimal     @default(0) @db.Decimal(10, 2) @map("tax_amount")
  discountAmount   Decimal     @default(0) @db.Decimal(10, 2) @map("discount_amount")
  
  // Additional financial tracking
  taxRate          Decimal?    @db.Decimal(5, 4) @map("tax_rate")
  discountCode     String?     @db.VarChar(50) @map("discount_code")
  discountType     String?     @db.VarChar(20) @map("discount_type") // PERCENTAGE, FIXED_AMOUNT
  
  // Shipping and Billing
  shippingMethod   String?     @db.VarChar(100) @map("shipping_method")
  trackingNumber   String?     @db.VarChar(100) @map("tracking_number")
  shippingAddress  Json?       @map("shipping_address")
  billingAddress   Json?       @map("billing_address")
  
  // Additional order metadata
  customerNotes    String?     @db.Text @map("customer_notes")
  internalNotes    String?     @db.Text @map("internal_notes")
  ipAddress        String?     @db.VarChar(45) @map("ip_address")
  
  // Timestamps for order lifecycle
  paidAt           DateTime?   @map("paid_at")
  confirmedAt      DateTime?   @map("confirmed_at")
  processingAt     DateTime?   @map("processing_at")
  shippedAt        DateTime?   @map("shipped_at")
  deliveredAt      DateTime?   @map("delivered_at")
  cancelledAt      DateTime?   @map("cancelled_at")
  refundedAt       DateTime?   @map("refunded_at")
  
  // Relaciones
  items      OrderItem[]
  payments   Payment[]
  quotation  Quotation? @relation("QuotationToOrder")  // One-to-one relation with Quotation
  
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  
  // Índices
  @@index([userId])
  @@index([status])
  @@index([createdAt])
  @@index([currency])  // Agregado para búsquedas por moneda
  @@map("orders")
}

// Ítems de Orden
model OrderItem {
  id               String    @id @default(cuid())
  orderId          String    @map("order_id")
  order            Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId        String?   @map("product_id")
  product          Product?  @relation(fields: [productId], references: [id], onDelete: SetNull)
  variantId        String?   @map("variant_id")
  variant          ProductVariant? @relation(fields: [variantId], references: [id], onDelete: SetNull)
  quantity         Int       @default(1)
  
  // Pricing
  unitPrice        Decimal   @db.Decimal(10, 2) @map("unit_price")
  originalPrice    Decimal   @db.Decimal(10, 2) @map("original_price") // Price before any discounts
  discountAmount   Decimal   @default(0) @db.Decimal(10, 2) @map("discount_amount")
  taxAmount        Decimal   @default(0) @db.Decimal(10, 2) @map("tax_amount")
  lineTotal        Decimal   @db.Decimal(10, 2) @map("line_total")
  
  // Applied promotions/discounts
  appliedPromotions Json?    @map("applied_promotions") // Array of { code: string, name: string, discount: number }
  
  // Snapshots para preservar información histórica
  productName  String    @db.VarChar(160) @map("product_name")
  variantName  String?   @db.VarChar(120) @map("variant_name")
  sku          String?   @db.Citext   // Búsqueda case-insensitive
  
  createdAt    DateTime  @default(now()) @map("created_at")
  
  // Índices
  @@index([orderId])
  @@index([orderId, createdAt])  // Para búsquedas por orden y fecha
  @@index([productId])
  @@index([variantId])
  @@index([sku])
  @@map("order_items")
}

// Carritos
model Cart {
  id         String    @id @default(cuid())
  sessionId  String?   @unique @db.VarChar(255) @map("session_id")
  userId     String?   @map("user_id")
  user       User?     @relation(fields: [userId], references: [id])
  currency   Currency  @default(ARS)
  
  // Relaciones
  items CartItem[]
  
  createdAt  DateTime  @default(now()) @map("created_at")
  updatedAt  DateTime  @updatedAt @map("updated_at")
  
  // Índices
  @@index([sessionId])
  @@index([userId])
  @@map("carts")
}

// Ítems de Carrito
model CartItem {
  id           String    @id @default(cuid())
  cartId       String    @map("cart_id")
  cart         Cart      @relation(fields: [cartId], references: [id], onDelete: Cascade)
  productId    String    @map("product_id")
  product      Product   @relation(fields: [productId], references: [id])
  variantId    String?   @map("variant_id")
  variant      ProductVariant? @relation(fields: [variantId], references: [id])
  quantity     Int       @default(1)
  
  // Precio al momento de agregar al carrito
  unitPrice    Decimal   @db.Decimal(10, 2) @map("unit_price")
  currency     Currency  @default(ARS)
  
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")
  
  // Índices
  @@index([cartId])
  @@index([productId])
  @@index([variantId])
  @@map("cart_items")
}

// Direcciones
model Address {
  id          String    @id @default(cuid())
  userId      String    @map("user_id")
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  street      String    @db.VarChar(120)
  city        String    @db.VarChar(80)
  state       String    @db.VarChar(80)
  postalCode  String    @db.VarChar(16) @map("postal_code")
  country     String    @default("Argentina") @db.VarChar(56)
  isDefault   Boolean   @default(false) @map("is_default")
  
  deletedAt   DateTime? @default(dbgenerated("NULL")) @map("deleted_at")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  // Índices
  @@index([userId])
  @@map("addresses")
}

// Pagos
model Payment {
  id           String    @id @default(cuid())
  orderId      String    @map("order_id")
  order        Order     @relation(fields: [orderId], references: [id], onDelete: Cascade)
  amount       Decimal   @db.Decimal(10, 2)
  method       String    @db.VarChar(50)
  status       String    @db.VarChar(50)
  reference    String?   @unique @db.VarChar(100)
  processedAt  DateTime? @map("processed_at")
  
  createdAt    DateTime  @default(now()) @map("created_at")
  updatedAt    DateTime  @updatedAt @map("updated_at")
  
  // Índices
  @@index([orderId])
  @@index([status])
  @@index([reference])
  @@index([processedAt])
  @@map("payments")
}

// ============================== NEW MODELS ===================================

// For managing bulk/wholesale pricing
model BulkPricing {
  id          String    @id @default(cuid())
  productId   String
  product     Product   @relation(fields: [productId], references: [id])
  minQuantity Int
  price       Decimal   @db.Decimal(10, 2)
  isActive    Boolean   @default(true)
  startsAt    DateTime?
  expiresAt   DateTime?
  
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")
  
  @@index([productId, isActive])
  @@map("bulk_pricing")
}

// For managing promotions
model Promotion {
  id            String    @id @default(cuid())
  code          String    @unique
  description   String    @db.Text
  discountType  String    @db.VarChar(20) // PERCENTAGE, FIXED_AMOUNT
  discountValue Decimal   @db.Decimal(10, 2)
  minPurchase   Decimal?  @db.Decimal(10, 2)
  maxUses       Int?
  usedCount     Int       @default(0)
  startsAt      DateTime
  expiresAt     DateTime
  isActive      Boolean   @default(true)
  
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  
  @@index([code, isActive])
  @@index([expiresAt])
  @@map("promotions")
}

// ============================== EXTENSIONES ==================================
// Para habilitar búsquedas case-insensitive en emails y slugs
// [Previous schema content continues...]
