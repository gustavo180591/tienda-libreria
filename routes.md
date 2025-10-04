# API Routes Documentation

## Authentication

### POST /api/auth/register
- **Description**: Register a new user
- **Request Body**:
  - `email` (string, required): User's email (case-insensitive)
  - `password` (string, required): User's password (will be hashed)
  - `firstName` (string, optional): User's first name
  - `lastName` (string, optional): User's last name
  - `role` (enum, default: CUSTOMER): User role (ADMIN, MANAGER, CUSTOMER, INSTITUTION, TEACHER, WHOLESALE)
  - `institutionId` (string, optional): ID of the institution if applicable
  - `taxId` (string, optional): CUIT/CUIL for institutions/wholesale
  - `phone` (string, optional): Contact phone number
  - `marketingOptIn` (boolean, default: false): Marketing preferences

### POST /api/auth/login
- **Description**: User login
- **Request Body**:
  - `email` (string, required): User's email
  - `password` (string, required): User's password

### GET /api/auth/me
- **Description**: Get current user's profile
- **Authentication**: Required (JWT token)

## Users

### GET /api/users
- **Description**: List all users (admin only)
- **Query Params**:
  - `role` (enum, optional): Filter by user role
  - `page` (number, default: 1): Pagination page
  - `limit` (number, default: 20): Items per page

### GET /api/users/:id
- **Description**: Get user by ID
- **URL Params**:
  - `id` (string, required): User ID

### PUT /api/users/:id
- **Description**: Update user
- **URL Params**:
  - `id` (string, required): User ID
- **Request Body**: Any updatable user fields

### DELETE /api/users/:id
- **Description**: Delete user (soft delete)
- **URL Params**:
  - `id` (string, required): User ID

## Products

### GET /api/products
- **Description**: List products with filtering
- **Query Params**:
  - `category` (string, optional): Filter by category ID
  - `search` (string, optional): Search in name/description
  - `minPrice`, `maxPrice` (number, optional): Price range
  - `inStock` (boolean, optional): Only show in-stock items
  - `sort` (string, optional): Sort field (price, name, createdAt, etc.)
  - `order` (enum: asc/desc, default: asc): Sort order
  - `page` (number, default: 1): Pagination page
  - `limit` (number, default: 20): Items per page

### POST /api/products
- **Description**: Create a new product (admin only)
- **Request Body**:
  - `name` (string, required): Product name
  - `description` (string, optional): Product description
  - `categoryId` (string, required): Category ID
  - `isActive` (boolean, default: true): Product status
  - `isbn` (string, optional): For books
  - `author` (string, optional): For books
  - `isEducational` (boolean, default: false)
  - `variants` (array): Array of product variants

### GET /api/products/:id
- **Description**: Get product by ID or slug
- **URL Params**:
  - `id` (string, required): Product ID or slug

### PUT /api/products/:id
- **Description**: Update product
- **URL Params**:
  - `id` (string, required): Product ID

### DELETE /api/products/:id
- **Description**: Delete product (soft delete)
- **URL Params**:
  - `id` (string, required): Product ID

## Categories

### GET /api/categories
- **Description**: List all categories
- **Query Params**:
  - `includeInactive` (boolean, default: false): Include inactive categories

### POST /api/categories
- **Description**: Create new category (admin only)
- **Request Body**:
  - `name` (string, required): Category name
  - `description` (string, optional)
  - `isActive` (boolean, default: true)

### GET /api/categories/:id
- **Description**: Get category by ID or slug
- **URL Params**:
  - `id` (string, required): Category ID or slug

## Orders

### GET /api/orders
- **Description**: List orders (filtered by current user, admin sees all)
- **Query Params**:
  - `status` (string, optional): Filter by status
  - `startDate`, `endDate` (date, optional): Date range
  - `page` (number, default: 1)
  - `limit` (number, default: 20)

### POST /api/orders
- **Description**: Create new order
- **Request Body**:
  - `items` (array, required): Array of order items
  - `shippingAddress` (object, required): Shipping address
  - `billingAddress` (object, optional): Billing address
  - `shippingMethod` (string, required)
  - `notes` (string, optional)

### GET /api/orders/:id
- **Description**: Get order by ID
- **URL Params**:
  - `id` (string, required): Order ID

### PUT /api/orders/:id/status
- **Description**: Update order status (admin only)
- **URL Params**:
  - `id` (string, required): Order ID
- **Request Body**:
  - `status` (string, required): New status
  - `notes` (string, optional): Status update notes

## Shopping Cart

### GET /api/cart
- **Description**: Get current user's cart
- **Authentication**: Required (or session-based)

### POST /api/cart/items
- **Description**: Add item to cart
- **Request Body**:
  - `productId` (string, required)
  - `variantId` (string, optional)
  - `quantity` (number, default: 1)

### PUT /api/cart/items/:id
- **Description**: Update cart item quantity
- **URL Params**:
  - `id` (string, required): Cart item ID
- **Request Body**:
  - `quantity` (number, required): New quantity

### DELETE /api/cart/items/:id
- **Description**: Remove item from cart
- **URL Params**:
  - `id` (string, required): Cart item ID

## School Supply Lists

### GET /api/school-supply-lists
- **Description**: Get user's school supply lists
- **Query Params**:
  - `isTemplate` (boolean, optional): Filter templates

### POST /api/school-supply-lists
- **Description**: Create new school supply list
- **Request Body**:
  - `name` (string, required)
  - `description` (string, optional)
  - `items` (array, required): Array of { productId, variantId, quantity, notes? }
  - `isTemplate` (boolean, default: false)

### GET /api/school-supply-lists/:id
- **Description**: Get school supply list by ID
- **URL Params**:
  - `id` (string, required): List ID

### PUT /api/school-supply-lists/:id
- **Description**: Update school supply list
- **URL Params**:
  - `id` (string, required): List ID

### DELETE /api/school-supply-lists/:id
- **Description**: Delete school supply list
- **URL Params**:
  - `id` (string, required): List ID

## Quotations

### GET /api/quotations
- **Description**: Get user's quotations
- **Query Params**:
  - `status` (string, optional): Filter by status

### POST /api/quotations
- **Description**: Request a quotation
- **Request Body**:
  - `items` (array, required): Array of { productId, variantId, quantity }
  - `notes` (string, optional)

### GET /api/quotations/:id
- **Description**: Get quotation by ID
- **URL Params**:
  - `id` (string, required): Quotation ID

### POST /api/quotations/:id/convert-to-order
- **Description**: Convert quotation to order
- **URL Params**:
  - `id` (string, required): Quotation ID

## Notifications

### GET /api/notifications
- **Description**: Get user's notifications
- **Query Params**:
  - `isRead` (boolean, optional): Filter by read status
  - `type` (string, optional): Filter by notification type

### PUT /api/notifications/:id/read
- **Description**: Mark notification as read
- **URL Params**:
  - `id` (string, required): Notification ID

## Addresses

### GET /api/addresses
- **Description**: Get user's addresses

### POST /api/addresses
- **Description**: Add new address
- **Request Body**:
  - `street` (string, required)
  - `city` (string, required)
  - `state` (string, required)
  - `postalCode` (string, required)
  - `country` (string, default: "Argentina")
  - `isDefault` (boolean, default: false)

### PUT /api/addresses/:id
- **Description**: Update address
- **URL Params**:
  - `id` (string, required): Address ID

### DELETE /api/addresses/:id
- **Description**: Delete address
- **URL Params**:
  - `id` (string, required): Address ID

## Admin Endpoints

### GET /api/admin/dashboard
- **Description**: Admin dashboard statistics
- **Authentication**: Admin required

### GET /api/admin/orders
- **Description**: List all orders (admin only)
- **Query Params**: Same as /api/orders with additional filters

### PUT /api/admin/orders/:id/status
- **Description**: Update order status
- **URL Params**:
  - `id` (string, required): Order ID
- **Request Body**:
  - `status` (string, required): New status
  - `trackingNumber` (string, optional): Tracking number if shipped

### GET /api/admin/users
- **Description**: List all users (admin only)
- **Query Params**: Various filters for user management