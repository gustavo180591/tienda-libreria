# API v1 Documentation

## Base URL
```
https://api.tutienda.com/v1
```

## Autenticación
La mayoría de los endpoints requieren autenticación mediante JWT (JSON Web Token).

```http
Authorization: Bearer <token>
```

### POST /v1/auth/verify-email
- **Description**: Verificar dirección de email con código
- **Request Body**:
  - `token` (string, requerido): Token de verificación
  - `code` (string, requerido): Código de verificación
- **Responses**:
  - `200 OK`: Email verificado exitosamente
  - `400 Bad Request`: Token o código inválido
  - `410 Gone`: Token expirado
  - `500 Internal Server Error`: Error del servidor

### POST /v1/auth/resend-verification
- **Description**: Reenviar email de verificación
- **Request Body**:
  - `email` (string, requerido): Email a verificar
- **Responses**:
  - `200 OK`: Email de verificación reenviado
  - `400 Bad Request`: Email inválido o ya verificado
  - `429 Too Many Requests`: Demasiados intentos

### POST /v1/auth/2fa/setup
- **Description**: Configurar autenticación de dos factores
- **Authentication**: Requerido (JWT token)
- **Responses**:
  - `200 OK`: Configuración de 2FA iniciada
  - `400 Bad Request`: 2FA ya configurado
  - `401 Unauthorized`: No autenticado
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "secret": "JBSWY3DPEHPK3PXP",
      "qrCodeUrl": "otpauth://totp/Tienda:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=Tienda"
    }
  }
  ```

### POST /v1/auth/2fa/verify
- **Description**: Verificar código 2FA para completar configuración
- **Authentication**: Requerido (JWT token)
- **Request Body**:
  - `code` (string, requerido): Código del autenticador
  - `secret` (string, opcional): Secreto (solo si no se usó QR)
- **Responses**:
  - `200 OK`: 2FA configurado exitosamente
  - `400 Bad Request`: Código inválido
  - `401 Unauthorized`: No autenticado

### POST /v1/auth/2fa/disable
- **Description**: Desactivar 2FA
- **Authentication**: Requerido (JWT token)
- **Request Body**:
  - `code` (string, requerido): Código del autenticador
- **Responses**:
  - `200 OK`: 2FA desactivado
  - `400 Bad Request`: Código inválido
  - `401 Unauthorized`: No autenticado

### POST /v1/auth/2fa/backup-codes/generate
- **Description**: Generar códigos de respaldo para 2FA
- **Authentication**: Requerido (JWT token)
- **Responses**:
  - `200 OK`: Códigos generados (mostrar una sola vez)
  - `401 Unauthorized`: No autenticado
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "codes": ["ABCD-EFGH", "IJKL-MNOP", "QRST-UVWX", "YZ12-3456"]
    }
  }
  ```

### POST /v1/auth/2fa/backup-codes/verify
- **Description**: Usar un código de respaldo para autenticación
- **Request Body**:
  - `email` (string, requerido): Email del usuario
  - `code` (string, requerido): Código de respaldo
- **Responses**:
  - `200 OK`: Código válido, devuelve token JWT
  - `400 Bad Request`: Código inválido o ya usado
  - `404 Not Found`: Usuario no encontrado

## Gestión de Perfil de Usuario

### GET /v1/profile
- **Description**: Obtener perfil del usuario autenticado
- **Authentication**: Requerido (JWT token)
- **Responses**:
  - `200 OK`: Perfil obtenido exitosamente
  - `401 Unauthorized`: No autenticado
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "id": "user_123",
      "email": "usuario@ejemplo.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "phone": "+5491123456789",
      "avatar": "https://.../avatar.jpg",
      "emailVerified": true,
      "twoFactorEnabled": false,
      "preferences": {
        "language": "es",
        "currency": "ARS",
        "marketingEmails": true
      },
      "createdAt": "2023-01-15T10:30:00Z"
    }
  }
  ```

### PUT /v1/profile
- **Description**: Actualizar perfil de usuario
- **Authentication**: Requerido (JWT token)
- **Request Body**:
  - `firstName` (string, opcional)
  - `lastName` (string, opcional)
  - `phone` (string, opcional): Formato internacional
  - `avatar` (string, opcional): URL de la imagen de perfil
  - `preferences` (object, opcional):
    - `language` (string): Código de idioma (ej: 'es', 'en')
    - `currency` (string): Moneda preferida (ej: 'ARS', 'USD')
    - `marketingEmails` (boolean): Suscripción a emails de marketing
- **Responses**:
  - `200 OK`: Perfil actualizado exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado

### POST /v1/profile/change-password
- **Description**: Cambiar contraseña
- **Authentication**: Requerido (JWT token)
- **Request Body**:
  - `currentPassword` (string, requerido): Contraseña actual
  - `newPassword` (string, requerido): Nueva contraseña (mín. 8 caracteres)
- **Responses**:
  - `200 OK`: Contraseña actualizada exitosamente
  - `400 Bad Request`: Contraseña actual incorrecta o nueva contraseña inválida
  - `401 Unauthorized`: No autenticado
  - `429 Too Many Requests`: Demasiados intentos

### DELETE /v1/profile
- **Description**: Eliminar cuenta de usuario (soft delete)
- **Authentication**: Requerido (JWT token)
- **Request Body**:
  - `password` (string, requerido): Contraseña actual para confirmar
- **Responses**:
  - `204 No Content`: Cuenta eliminada exitosamente
  - `400 Bad Request`: Contraseña incorrecta
  - `401 Unauthorized`: No autenticado

## Gestión de Sesiones

### GET /v1/sessions
- **Description**: Listar sesiones activas del usuario
- **Authentication**: Requerido (JWT token)
- **Responses**:
  - `200 OK`: Lista de sesiones obtenida exitosamente
  - `401 Unauthorized`: No autenticado
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "sess_123",
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "location": "Buenos Aires, AR",
        "isCurrent": true,
        "lastActivity": "2023-10-04T15:30:00Z",
        "createdAt": "2023-10-01T10:15:30Z"
      },
      {
        "id": "sess_456",
        "ipAddress": "201.234.56.78",
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)",
        "location": "Córdoba, AR",
        "isCurrent": false,
        "lastActivity": "2023-10-03T09:20:15Z",
        "createdAt": "2023-09-28T14:30:00Z"
      }
    ]
  }
  ```

### DELETE /v1/sessions/:sessionId
- **Description**: Cerrar sesión específica
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `sessionId` (string, requerido): ID de la sesión a cerrar
- **Responses**:
  - `204 No Content`: Sesión cerrada exitosamente
  - `400 Bad Request`: No se puede cerrar la sesión actual
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso para cerrar esta sesión
  - `404 Not Found`: Sesión no encontrada

### POST /v1/sessions/logout-all
- **Description**: Cerrar todas las sesiones excepto la actual
- **Authentication**: Requerido (JWT token)
- **Responses**:
  - `204 No Content`: Todas las sesiones fueron cerradas
  - `401 Unauthorized`: No autenticado

## Códigos de Estado Comunes
- `200 OK`: La petición se completó exitosamente
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error en los datos enviados
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: No autorizado
- `404 Not Found`: Recurso no encontrado
- `422 Unprocessable Entity`: Error de validación
- `500 Internal Server Error`: Error del servidor

## Soporte y Contacto

### GET /v1/support/faqs
- **Description**: Obtener preguntas frecuentes
- **Authentication**: Opcional
- **Query Params**:
  - `category` (string, opcional): Filtrar por categoría
  - `q` (string, opcional): Buscar en preguntas y respuestas
- **Responses**:
  - `200 OK`: Lista de FAQs obtenida exitosamente
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "faq_123",
        "question": "¿Cuáles son los métodos de pago aceptados?",
        "answer": "Aceptamos tarjetas de crédito/débito, transferencias bancarias y MercadoPago.",
        "category": "pagos",
        "order": 1,
        "updatedAt": "2023-09-01T10:00:00Z"
      }
    ]
  }
  ```

### POST /v1/support/tickets
- **Description**: Crear un nuevo ticket de soporte
- **Authentication**: Requerido (JWT token)
- **Request Body**:
  - `subject` (string, requerido): Asunto del ticket
  - `message` (string, requerido): Mensaje detallado
  - `orderId` (string, opcional): ID del pedido relacionado
  - `attachments` (string[], opcional): URLs de archivos adjuntos (máx. 5MB c/u)
  - `priority` (string, opcional): 'low', 'normal', 'high' (default: 'normal')
- **Responses**:
  - `201 Created`: Ticket creado exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `413 Payload Too Large`: Archivos adjuntos muy grandes

### GET /v1/support/tickets
- **Description**: Listar tickets de soporte del usuario
- **Authentication**: Requerido (JWT token)
- **Query Params**:
  - `status` (string, opcional): Filtrar por estado ('open', 'pending', 'resolved', 'closed')
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 10, max: 50)
- **Responses**:
  - `200 OK`: Lista de tickets obtenida exitosamente
  - `401 Unauthorized`: No autenticado

### GET /v1/support/tickets/:ticketId
- **Description**: Obtener detalles de un ticket
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `ticketId` (string, requerido): ID del ticket
- **Responses**:
  - `200 OK`: Detalles del ticket
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso para ver este ticket
  - `404 Not Found`: Ticket no encontrado

### POST /v1/support/tickets/:ticketId/messages
- **Description**: Agregar mensaje a un ticket
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `ticketId` (string, requerido): ID del ticket
- **Request Body**:
  - `message` (string, requerido): Contenido del mensaje
  - `attachments` (string[], opcional): URLs de archivos adjuntos
- **Responses**:
  - `201 Created`: Mensaje agregado exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No puedes responder a este ticket
  - `404 Not Found`: Ticket no encontrado

### POST /v1/contact
- **Description**: Enviar mensaje a través del formulario de contacto
- **Authentication**: Opcional
- **Request Body**:
  - `name` (string, requerido): Nombre del remitente
  - `email` (string, requerido): Email de contacto
  - `subject` (string, requerido): Asunto del mensaje
  - `message` (string, requerido): Contenido del mensaje
  - `phone` (string, opcional): Teléfono de contacto
  - `orderNumber` (string, opcional): Número de pedido relacionado
- **Responses**:
  - `202 Accepted`: Mensaje recibido exitosamente
  - `400 Bad Request`: Datos inválidos
  - `429 Too Many Requests`: Demasiados intentos

### GET /v1/support/contact-options
- **Description**: Obtener opciones de contacto disponibles
- **Authentication**: Opcional
- **Responses**:
  - `200 OK`: Opciones de contacto
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "email": "soporte@tutienda.com",
      "phone": "+54 11 1234-5678",
      "whatsapp": "+5491112345678",
      "address": "Av. Corrientes 1234, CABA, Argentina",
      "businessHours": "Lunes a Viernes de 9:00 a 18:00 hs",
      "socialMedia": {
        "facebook": "https://facebook.com/tutienda",
        "instagram": "https://instagram.com/tutienda",
        "twitter": "https://twitter.com/tutienda"
      }
    }
  }
  ```

## API y Webhooks para Desarrolladores

### Autenticación

#### Autenticación con API Key
```http
GET /v1/endpoint
X-API-Key: tu_api_key_secreta
```

#### Autenticación con JWT (para endpoints de usuario)
```http
GET /v1/endpoint
Authorization: Bearer tu_jwt_token
```

### Convenciones de la API

#### Formato de Fechas
Todas las fechas están en formato ISO 8601 con timezone:
```
2023-10-04T13:45:30-03:00
```

#### Paginación
Los endpoints que devuelven listas usan paginación:
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

#### Límites de Tasa
- **API Pública**: 100 solicitudes por minuto por IP
- **API Autenticada**: 1000 solicitudes por minuto por clave
- **Webhooks**: 10 eventos por segundo por webhook

### Manejo de Errores
```json
{
  "success": false,
  "error": {
    "code": "validation_error",
    "message": "Error de validación",
    "details": [
      {
        "field": "email",
        "message": "Debe ser un email válido"
      }
    ]
  }
}
```

### Códigos de Estado Comunes
- `200 OK`: Solicitud exitosa
- `201 Created`: Recurso creado
- `400 Bad Request`: Error en los datos
- `401 Unauthorized`: No autenticado
- `403 Forbidden`: Sin permisos
- `404 Not Found`: Recurso no encontrado
- `429 Too Many Requests`: Límite de tasa excedido
- `500 Internal Server Error`: Error del servidor

## Gestión de Claves API

### POST /v1/developer/api-keys
- **Description**: Generar una nueva clave API
- **Authentication**: Requerido (Rol: DEVELOPER, ADMIN)
- **Request Body**:
  ```json
  {
    "name": "Aplicación Móvil",
    "description": "Clave para la app móvil iOS",
    "permissions": [
      "products:read",
      "orders:read",
      "orders:create"
    ],
    "expiresAt": "2024-10-04T23:59:59Z"
  }
  ```
- **Responses**:
  - `201 Created`: Clave generada exitosamente
    ```json
    {
      "success": true,
      "data": {
        "id": "key_123",
        "name": "Aplicación Móvil",
        "key": "sk_test_1234567890abcdef",
        "permissions": ["products:read", "orders:read", "orders:create"],
        "expiresAt": "2024-10-04T23:59:59Z",
        "createdAt": "2023-10-04T13:45:30-03:00"
      }
    }
    ```
  - `400 Bad Request`: Permisos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: Sin permisos

### GET /v1/developer/api-keys
- **Description**: Listar claves API
- **Authentication**: Requerido (Rol: DEVELOPER, ADMIN)
- **Responses**:
  - `200 OK`: Lista de claves
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: Sin permisos

### DELETE /v1/developer/api-keys/:keyId
- **Description**: Revocar una clave API
- **Authentication**: Requerido (Rol: DEVELOPER, ADMIN)
- **Responses**:
  - `204 No Content`: Clave revocada
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: Sin permisos
  - `404 Not Found`: Clave no encontrada

## Webhooks

### Eventos Disponibles
- `order.created`: Nueva orden creada
- `order.updated`: Estado de orden actualizado
- `payment.succeeded`: Pago exitoso
- `payment.failed`: Pago fallido
- `customer.created`: Nuevo cliente registrado
- `product.updated`: Producto actualizado

### Configuración de Webhooks

#### POST /v1/developer/webhooks
- **Description**: Registrar un nuevo webhook
- **Authentication**: Requerido (Rol: DEVELOPER, ADMIN)
- **Request Body**:
  ```json
  {
    "url": "https://tudominio.com/webhook-handler",
    "events": ["order.created", "payment.succeeded"],
    "secret": "tu_secreto_para_firmar",
    "enabled": true
  }
  ```
- **Responses**:
  - `201 Created`: Webhook registrado
  - `400 Bad Request`: URL o eventos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: Sin permisos

#### Ejemplo de Payload de Webhook
```http
POST /webhook-handler
Content-Type: application/json
X-Webhook-Event: order.created
X-Webhook-Signature: t=1696437930,signature=abc123...

{
  "event": "order.created",
  "data": {
    "id": "order_123",
    "amount": 12500.50,
    "status": "pending",
    "customer": {
      "id": "cust_123",
      "email": "cliente@ejemplo.com"
    },
    "items": [
      {"id": "prod_123", "name": "Producto 1", "quantity": 1, "price": 10000}
    ]
  },
  "createdAt": "2023-10-04T13:45:30-03:00"
}
```

#### Validación de Firma
```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return `sha256=${digest}` === signature;
}
```

### SDKs Oficiales

#### JavaScript/Node.js
```bash
npm install @tutienda/sdk
```

```javascript
import { TiendaAPI } from '@tutienda/sdk';

const api = new TiendaAPI({
  apiKey: 'tu_api_key',
  environment: 'production' // o 'sandbox'
});

// Ejemplo de uso
const order = await api.orders.retrieve('order_123');
```

#### Python
```bash
pip install tutienda
```

```python
from tutienda import TiendaAPI

api = TiendaAPI(api_key='tu_api_key', environment='production')
order = api.orders.retrieve('order_123')
```

## Seguridad Avanzada

### Registro de Actividad

#### GET /v1/security/audit-logs
- **Description**: Obtener registros de auditoría detallados
- **Authentication**: Requerido (Rol: ADMIN, SECURITY)
- **Query Params**:
  - `action` (string, opcional): Filtrar por acción (ej: 'login', 'password.change')
  - `userId` (string, opcional): Filtrar por ID de usuario
  - `ip` (string, opcional): Filtrar por dirección IP
  - `dateFrom` (ISO date, opcional): Filtrar por fecha (desde)
  - `dateTo` (ISO date, opcional): Filtrar por fecha (hasta)
  - `page` (number, default: 1)
  - `limit` (number, default: 50, max: 200)
- **Responses**:
  - `200 OK`: Registros obtenidos exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "log_123",
        "action": "user.login",
        "userId": "user_456",
        "userEmail": "usuario@ejemplo.com",
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
        "location": {
          "country": "Argentina",
          "region": "Buenos Aires",
          "city": "CABA",
          "timezone": "America/Argentina/Buenos_Aires"
        },
        "metadata": {
          "status": "success",
          "method": "email",
          "deviceId": "dev_123"
        },
        "timestamp": "2023-10-04T10:15:30Z"
      }
    ],
    "meta": {
      "total": 1245,
      "page": 1,
      "limit": 50,
      "totalPages": 25
    }
  }
  ```

### Detección de Fraude

#### POST /v1/security/fraud/checkout
- **Description**: Verificar transacción en busca de fraude
- **Authentication**: Requerido
- **Request Body**:
  ```json
  {
    "userId": "user_123",
    "email": "usuario@ejemplo.com",
    "ipAddress": "192.168.1.100",
    "billingAddress": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "addressLine1": "Av. Corrientes 1234",
      "city": "Buenos Aires",
      "region": "CABA",
      "postalCode": "C1043",
      "country": "AR"
    },
    "shippingAddress": {
      "firstName": "Juan",
      "lastName": "Pérez",
      "addressLine1": "Av. Corrientes 1234",
      "city": "Buenos Aires",
      "region": "CABA",
      "postalCode": "C1043",
      "country": "AR"
    },
    "paymentMethod": {
      "type": "credit_card",
      "last4": "4242",
      "issuer": "visa"
    },
    "order": {
      "amount": 12500.50,
      "currency": "ARS",
      "items": [
        {"id": "prod_123", "name": "Producto 1", "quantity": 1, "price": 10000},
        {"id": "prod_456", "name": "Producto 2", "quantity": 1, "price": 2500.50}
      ]
    },
    "userBehavior": {
      "loginCountLastHour": 1,
      "failedLoginAttempts": 0,
      "accountAgeDays": 30,
      "previousOrders": 5,
      "totalSpent": 45000.75
    }
  }
  ```
- **Responses**:
  - `200 OK`: Análisis completado
    ```json
    {
      "success": true,
      "data": {
        "riskScore": 15,
        "riskLevel": "low",
        "reasons": ["IP segura", "Comportamiento normal"],
        "recommendation": "approve",
        "flags": []
      }
    }
    ```
  - `400 Bad Request`: Datos inválidos
  - `429 Too Many Requests`: Demasiadas solicitudes

### Cumplimiento Normativo (GDPR/CCPA)

#### GET /v1/security/compliance/export-data
- **Description**: Exportar todos los datos de un usuario (GDPR/CCPA)
- **Authentication**: Requerido (usuario propietario o ADMIN)
- **Query Params**:
  - `userId` (string, opcional): ID del usuario (solo ADMIN)
  - `format` (string, opcional): 'json' (default), 'html', 'pdf'
- **Responses**:
  - `200 OK`: Datos exportados exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Usuario no encontrado

#### DELETE /v1/security/compliance/delete-account
- **Description**: Eliminar cuenta y datos personales (Derecho al olvido - GDPR)
- **Authentication**: Requerido (usuario propietario o ADMIN)
- **Request Body**:
  ```json
  {
    "confirmation": "ELIMINAR MI CUENTA",
    "reason": "Ya no necesito el servicio",
    "feedback": "Me gustaría sugerir..."
  }
  ```
- **Responses**:
  - `202 Accepted`: Solicitud de eliminación recibida
  - `400 Bad Request`: Confirmación incorrecta
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso

#### POST /v1/security/compliance/request-consent
- **Description**: Registrar consentimiento del usuario
- **Authentication**: Requerido
- **Request Body**:
  ```json
  {
    "consentType": "marketing_emails",
    "granted": true,
    "preferences": {
      "email": true,
      "sms": false,
      "personalized_ads": true
    },
    "consentTextVersion": "1.0",
    "consentTimestamp": "2023-10-04T12:00:00Z"
  }
  ```
- **Responses**:
  - `200 OK`: Consentimiento registrado
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado

### Seguridad de la Cuenta

#### POST /v1/security/account/check-pwned
- **Description**: Verificar si el email/contraseña ha sido comprometido
- **Authentication**: Opcional
- **Request Body**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "contraseña123"
  }
  ```
- **Responses**:
  - `200 OK`: Verificación completada
    ```json
    {
      "success": true,
      "data": {
        "emailCompromised": true,
        "emailBreaches": [
          {
            "name": "Breach 2023",
            "date": "2023-06-15",
            "compromisedData": ["emails", "passwords"]
          }
        ],
        "passwordPwned": true,
        "passwordAppearances": 1245
      }
    }
    ```
  - `400 Bad Request`: Datos inválidos
  - `429 Too Many Requests`: Demasiadas solicitudes

## Marketing y Promociones

### Cupones y Descuentos

#### GET /v1/promotions/coupons
- **Description**: Listar cupones disponibles
- **Authentication**: Opcional
- **Query Params**:
  - `code` (string, opcional): Filtrar por código
  - `isActive` (boolean, opcional): Filtrar por estado activo
  - `type` (string, opcional): 'percentage', 'fixed_amount', 'free_shipping'
  - `page` (number, default: 1)
  - `limit` (number, default: 20, max: 100)
- **Responses**:
  - `200 OK`: Lista de cupones obtenida exitosamente
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "coupon_123",
        "code": "VERANO20",
        "type": "percentage",
        "value": 20,
        "description": "20% de descuento en toda la tienda",
        "minPurchase": 10000,
        "maxUses": 100,
        "usedCount": 42,
        "startsAt": "2023-12-01T00:00:00Z",
        "expiresAt": "2023-12-31T23:59:59Z",
        "isActive": true,
        "applicableProducts": ["prod_123", "prod_456"],
        "excludedProducts": ["prod_789"],
        "categories": ["libros", "libreria"]
      }
    ],
    "meta": {
      "total": 5,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```

#### POST /v1/promotions/coupons
- **Description**: Crear un nuevo cupón (Admin)
- **Authentication**: Requerido (Rol: ADMIN, MARKETING)
- **Request Body**:
  ```json
  {
    "code": "VERANO20",
    "type": "percentage",
    "value": 20,
    "description": "20% de descuento en verano",
    "minPurchase": 10000,
    "maxUses": 100,
    "maxUsesPerUser": 1,
    "startsAt": "2023-12-01T00:00:00Z",
    "expiresAt": "2023-12-31T23:59:59Z",
    "isActive": true,
    "applicableProducts": ["prod_123"],
    "excludedProducts": ["prod_789"],
    "categories": ["libros"],
    "excludeDiscountedItems": true
  }
  ```
- **Responses**:
  - `201 Created`: Cupón creado exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `409 Conflict`: El código ya existe

#### POST /v1/promotions/coupons/validate
- **Description**: Validar un código de cupón
- **Authentication**: Opcional (recomendado para verificación de usuario)
- **Request Body**:
  ```json
  {
    "code": "VERANO20",
    "items": [
      {"productId": "prod_123", "quantity": 1, "price": 10000},
      {"productId": "prod_789", "quantity": 2, "price": 5000}
    ],
    "subtotal": 20000,
    "shippingCost": 1500
  }
  ```
- **Responses**:
  - `200 OK`: Cupón válido
  - `400 Bad Request`: Cupón no aplicable
  - `404 Not Found`: Cupón no encontrado
  - `410 Gone`: Cupón expirado o sin usos disponibles

### Boletines y Campañas

#### POST /v1/marketing/subscribe
- **Description**: Suscribir un email al boletín
- **Request Body**:
  ```json
  {
    "email": "usuario@ejemplo.com",
    "firstName": "Juan"
  }
  ```
- **Responses**:
  - `200 OK`: Suscripción exitosa
  - `400 Bad Request`: Email inválido
  - `409 Conflict`: Email ya suscrito

#### POST /v1/marketing/campaigns
- **Description**: Crear una campaña de email (Admin)
- **Authentication**: Requerido (Rol: ADMIN, MARKETING)
- **Request Body**:
  ```json
  {
    "name": "Ofertas de Verano",
    "subject": "¡Hasta 50% de descuento en verano!",
    "previewText": "Descubre nuestras ofertas especiales de verano",
    "content": "<h1>¡Ofertas de Verano!</h1><p>Hasta 50% de descuento...</p>",
    "segment": "all",
    "scheduledAt": "2023-12-15T10:00:00Z",
    "tags": ["verano", "ofertas"]
  }
  ```
- **Responses**:
  - `202 Accepted`: Campaña programada
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso

### Landing Pages

#### GET /v1/landing-pages
- **Description**: Listar landing pages
- **Query Params**:
  - `isActive` (boolean, opcional): Filtrar por estado
  - `tag` (string, opcional): Filtrar por etiqueta
- **Responses**:
  - `200 OK`: Lista de landing pages
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "land_123",
        "title": "Ofertas de Verano",
        "slug": "ofertas-verano",
        "description": "Las mejores ofertas de la temporada",
        "content": "<h1>Ofertas de Verano</h1>...",
        "seo": {
          "metaTitle": "Ofertas de Verano 2023 | Tu Tienda",
          "metaDescription": "Descubre nuestras ofertas especiales de verano"
        },
        "isActive": true,
        "startsAt": "2023-12-01T00:00:00Z",
        "expiresAt": "2023-12-31T23:59:59Z",
        "tags": ["verano", "ofertas"],
        "createdAt": "2023-11-15T10:30:00Z"
      }
    ]
  }
  ```

#### POST /v1/landing-pages
- **Description**: Crear una landing page (Admin)
- **Authentication**: Requerido (Rol: ADMIN, MARKETING)
- **Request Body**:
  ```json
  {
    "title": "Nueva Colección Otoño",
    "slug": "nueva-coleccion-otono",
    "description": "Descubre nuestra nueva colección de otoño",
    "content": "<h1>Nueva Colección Otoño</h1>...",
    "seo": {
      "metaTitle": "Nueva Colección Otoño 2023",
      "metaDescription": "Descubre los últimos lanzamientos de otoño"
    },
    "isActive": true,
    "startsAt": "2023-03-01T00:00:00Z",
    "expiresAt": "2023-05-31T23:59:59Z",
    "tags": ["nuevo", "temporada"]
  }
  ```
- **Responses**:
  - `201 Created`: Landing page creada
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `409 Conflict`: El slug ya existe

## Formatos de Respuesta

### Éxito
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

### Error
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Error de validación",
    "details": [
      {
        "field": "email",
        "message": "El email es requerido"
      }
    ]
  }
}
```

# Endpoints

## Authentication

### POST /v1/auth/register
- **Description**: Register a new user account
- **Request Body**:
  - `email` (string, required): User's email (must be unique)
  - `password` (string, required): At least 8 characters
  - `firstName` (string, required)
  - `lastName` (string, required)
  - `phone` (string, optional)
  - `role` (string, optional, default: CUSTOMER): USER, ADMIN, etc.
- **Response**:
  - `201 Created` on success with user data and auth token
  - `400 Bad Request` for invalid data
  - `409 Conflict` if email already exists

### POST /v1/auth/login
- **Description**: User login
- **Request Body**:
  - `email` (string, required)
  - `password` (string, required)
- **Response**:
  - `200 OK` with user data and JWT token
  - `401 Unauthorized` for invalid credentials

### POST /v1/auth/refresh
- **Description**: Refresh access token using refresh token
- **Request Body**:
  - `refreshToken` (string, required)
- **Response**:
  - `200 OK` with new access token
  - `401 Unauthorized` if refresh token is invalid

### POST /v1/auth/logout
- **Description**: Invalidate refresh token
- **Authentication**: Required
- **Response**:
  - `200 OK` on success

### POST /v1/auth/forgot-password
- **Description**: Request password reset email
- **Request Body**:
  - `email` (string, required)
- **Response**:
  - `200 OK` always (for security)

### POST /v1/auth/reset-password
- **Description**: Reset password with token
- **Request Body**:
  - `token` (string, required): From reset email
  - `password` (string, required): New password
- **Response**:
  - `200 OK` on success
  - `400 Bad Request` for invalid or expired token
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

### POST /v1/auth/login
- **Description**: User login
- **Request Body**:
  - `email` (string, required): User's email
  - `password` (string, required): User's password

### GET /v1/auth/me
- **Description**: Get current user's profile
- **Authentication**: Required (JWT token)

## Users

### GET /v1/users
- **Description**: List all users (admin only)
- **Query Params**:
  - `role` (enum, optional): Filter by user role
  - `page` (number, default: 1): Pagination page
  - `limit` (number, default: 20): Items per page

### GET /v1/users/:id
- **Description**: Get user by ID
- **URL Params**:
  - `id` (string, required): User ID

### PUT /v1/users/:id
- **Description**: Update user
- **URL Params**:
  - `id` (string, required): User ID
- **Request Body**: Any updatable user fields

### DELETE /v1/users/:id
- **Description**: Delete user (soft delete)
- **URL Params**:
  - `id` (string, required): User ID

## Products

### GET /v1/products
- **Description**: List products with filtering
- **Authentication**: Optional
- **Query Params**:
  - `category` (string, optional): Filter by category ID
  - `search` (string, optional): Search in name/description
  - `minPrice`, `maxPrice` (number, optional): Price range
  - `inStock` (boolean, optional): Only show in-stock items
  - `sort` (string, optional): Sort field (price, name, createdAt, etc.)
  - `order` (enum: asc/desc, default: asc): Sort order
  - `page` (number, default: 1): Pagination page
  - `limit` (number, default: 20): Items per page
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "prod_123",
        "name": "Libro de Ejemplo",
        "description": "Descripción del producto",
        "price": 29.99,
        "stock": 100,
        "category": {
          "id": "cat_123",
          "name": "Libros"
        },
        "variants": [
          {
            "id": "var_123",
            "name": "Tapa blanda",
            "price": 29.99,
            "stock": 50
          }
        ]
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```
  
  **Error Responses**:
  - `400 Bad Request`: Invalid query parameters
  ```json
  {
    "success": false,
    "error": {
      "code": "INVALID_QUERY",
      "message": "Invalid query parameters"
    }
  }
  ```

### POST /v1/products
- **Description**: Create a new product (admin only)
- **Authentication**: Required (Admin)
- **Request Body**:
  - `name` (string, required): Product name
  - `description` (string, optional): Product description
  - `categoryId` (string, required): Category ID
  - `isActive` (boolean, default: true): Product status
  - `isbn` (string, optional): For books
  - `author` (string, optional): For books
  - `isEducational` (boolean, default: false)
  - `variants` (array, required): Array of product variants
    - `name` (string, required): Variant name
    - `price` (number, required): Variant price
    - `stock` (number, default: 0): Initial stock
    - `sku` (string, optional): Stock keeping unit
- **Response**:
  - `201 Created` on success
  - `400 Bad Request` for invalid data
  - `401 Unauthorized` if not authenticated
  - `403 Forbidden` if not admin

### GET /v1/products/:id
- **Description**: Get product by ID or slug
- **Authentication**: Optional
- **URL Params**:
  - `id` (string, required): Product ID or slug
- **Response**:
  - `200 OK` with product details
  - `404 Not Found` if product doesn't exist

### PUT /v1/products/:id
- **Description**: Update product
- **Authentication**: Required (Admin)
- **URL Params**:
  - `id` (string, required): Product ID
- **Request Body**: Same as POST, all fields optional
- **Response**:
  - `200 OK` with updated product
  - `404 Not Found` if product doesn't exist
  - `403 Forbidden` if not admin

### DELETE /v1/products/:id
- **Description**: Delete product (soft delete)
- **Authentication**: Required (Admin)
- **URL Params**:
  - `id` (string, required): Product ID
- **Response**:
  - `204 No Content` on success
  - `404 Not Found` if product doesn't exist

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

### POST /v1/orders
- **Description**: Create new order
- **Request Body**:
  - `items` (array, required): Array of order items
  - `shippingAddress` (object, required): Shipping address
  - `billingAddress` (object, optional): Billing address
  - `shippingMethod` (string, required)
  - `notes` (string, optional)

### GET /v1/orders/:id
- **Description**: Get order by ID
- **URL Params**:
  - `id` (string, required): Order ID

### POST /v1/orders/:id/cancelstatus
- **Description**: Update order status (admin only)
- **URL Params**:
  - `id` (string, required): Order ID
- **Request Body**:
  - `status` (string, required): New status
  - `notes` (string, optional): Status update notes

## Shopping Cart

### GET /v1/cart
- **Description**: Get user's shopping cart
- **Authentication**: Required
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "cart_123",
      "items": [
        {
          "id": "item_123",
          "productId": "prod_123",
          "variantId": "var_123",
          "name": "Libro de Ejemplo - Tapa blanda",
          "price": 29.99,
          "quantity": 2,
          "subtotal": 59.98,
          "image": "/images/products/prod_123.jpg"
        }
      ],
      "itemCount": 2,
      "subtotal": 59.98,
      "discount": 0,
      "tax": 12.6,
      "shipping": 10,
      "total": 82.58
    }
  }
  ```

### POST /v1/cart/items
- **Description**: Add item to cart
- **Authentication**: Required
- **Request Body**:
  - `productId` (string, required)
  - `variantId` (string, required)
  - `quantity` (number, required, min: 1)
- **Response**:
  - `200 OK` with updated cart
  - `400 Bad Request` for invalid data
  - `404 Not Found` if product/variant doesn't exist
  - `422 Unprocessable Entity` if insufficient stock

### PUT /v1/cart/items/:itemId
- **Description**: Update cart item quantity
- **Authentication**: Required
- **URL Params**:
  - `itemId` (string, required): Cart item ID
- **Request Body**:
  - `quantity` (number, required, min: 1)
- **Response**:
  - `200 OK` with updated cart
  - `400 Bad Request` for invalid quantity
  - `404 Not Found` if item not in cart
  - `422 Unprocessable Entity` if insufficient stock

### DELETE /v1/cart/items/:itemId
- **Description**: Remove item from cart
- **Authentication**: Required
- **URL Params**:
  - `itemId` (string, required): Cart item ID
- **Response**:
  - `200 OK` with updated cart
  - `404 Not Found` if item not in cart

## Payments

### POST /v1/payments/create-intent
- **Description**: Create payment intent (Stripe, MercadoPago, etc.)
- **Authentication**: Required
- **Request Body**:
  - `orderId` (string, required): Order ID
  - `paymentMethod` (string, required): stripe, mercadopago, etc.
- **Response**:
  - `200 OK` with payment client secret and details
  ```json
  {
    "success": true,
    "data": {
      "clientSecret": "pi_123_secret_456",
      "publishableKey": "pk_test_123",
      "amount": 8258,
      "currency": "ars"
    }
  }
  ```

### POST /v1/payments/webhook/:provider
- **Description**: Webhook for payment providers
- **Authentication**: None (signed by provider)
- **URL Params**:
  - `provider` (string, required): stripe, mercadopago, etc.
- **Headers**:
  - `Stripe-Signature` (for Stripe)
  - `X-Signature` (for MercadoPago)
- **Response**:
  - `200 OK` to acknowledge receipt
  - `400 Bad Request` for invalid payload
  - `401 Unauthorized` for invalid signature

### GET /v1/payments/methods
- **Description**: Get available payment methods
- **Authentication**: Optional
- **Query Params**:
  - `country` (string, optional): Filter by country (default: AR)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "credit_card",
        "name": "Tarjeta de crédito",
        "description": "Pago con tarjeta de crédito",
        "providers": ["stripe", "mercadopago"],
        "installments": [3, 6, 12],
        "icon": "/icons/credit-card.svg"
      },
      {
        "id": "transfer",
        "name": "Transferencia bancaria",
        "description": "Pago por transferencia",
        "providers": ["bank_transfer"],
        "icon": "/icons/bank-transfer.svg"
      }
    ]
  }
  ```
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

## Shipping

### GET /api/shipping/zones
- **Description**: List all shipping zones
- **Query Params**:
  - `isActive` (boolean, optional): Filter active/inactive zones
  - `page` (number, default: 1)
  - `limit` (number, default: 20)

### GET /api/shipping/zones/:id
- **Description**: Get shipping zone by ID
- **URL Params**:
  - `id` (string, required): Zone ID

### POST /api/shipping/zones
- **Description**: Create new shipping zone (admin only)
- **Request Body**:
  - `name` (string, required): Zone name
  - `description` (string, optional)
  - `countries` (array, required): Array of country codes
  - `isActive` (boolean, default: true)

### GET /api/shipping/rates
- **Description**: List shipping rates
- **Query Params**:
  - `zoneId` (string, optional): Filter by zone
  - `isActive` (boolean, optional): Filter active/inactive rates
  - `page` (number, default: 1)
  - `limit` (number, default: 20)

### POST /api/shipping/rates
- **Description**: Create new shipping rate (admin only)
- **Request Body**:
  - `zoneId` (string, required): Zone ID
  - `name` (string, required): Rate name
  - `minOrderValue` (number, default: 0)
  - `maxOrderValue` (number, optional)
  - `price` (number, required)
  - `estimatedDays` (string, optional)
  - `isActive` (boolean, default: true)

## Bulk Pricing

### GET /api/bulk-pricing
- **Description**: List bulk pricing rules
- **Query Params**:
  - `productId` (string, optional): Filter by product
  - `isActive` (boolean, optional): Filter active/inactive rules
  - `page` (number, default: 1)
  - `limit` (number, default: 20)

### POST /api/bulk-pricing
- **Description**: Create bulk pricing rule (admin only)
- **Request Body**:
  - `productId` (string, required)
  - `minQuantity` (number, required)
  - `price` (number, required)
  - `isActive` (boolean, default: true)
  - `startsAt` (datetime, optional)
  - `expiresAt` (datetime, optional)

## Promotions

### GET /api/promotions
- **Description**: List promotions
- **Query Params**:
  - `isActive` (boolean, optional): Filter active/inactive
  - `code` (string, optional): Filter by code
  - `page` (number, default: 1)
  - `limit` (number, default: 20)

### POST /api/promotions
- **Description**: Create promotion (admin only)
- **Request Body**:
  - `code` (string, required): Promotion code
  - `description` (string, required)
  - `discountType` (string, required): "PERCENTAGE" or "FIXED_AMOUNT"
  - `discountValue` (number, required)
  - `minPurchase` (number, optional)
  - `maxUses` (number, optional)
  - `startsAt` (datetime, required)
  - `expiresAt` (datetime, required)
  - `isActive` (boolean, default: true)

## Payments

### GET /api/payments
- **Description**: Get payment history
- **Query Params**:
  - `orderId` (string, optional): Filter by order ID
  - `status` (string, optional): Filter by status
  - `startDate`, `endDate` (date, optional): Date range
  - `page` (number, default: 1)
  - `limit` (number, default: 20)

### GET /api/payments/:id
- **Description**: Get payment details
- **URL Params**:
  - `id` (string, required): Payment ID

### POST /api/payments/process
- **Description**: Process a payment (typically called by payment gateway webhook)
- **Request Body**:
  - `orderId` (string, required)
  - `amount` (number, required)
  - `paymentMethod` (string, required)
  - `transactionId` (string, required)
  - `status` (string, required)
  - `metadata` (object, optional): Additional payment data

## Institutions

### GET /api/institutions
- **Description**: List institutions (admin only)
- **Query Params**:
  - `search` (string, optional): Search by name or taxId
  - `isActive` (boolean, optional): Filter active/inactive
  - `page` (number, default: 1)
  - `limit` (number, default: 20)

### POST /api/institutions
- **Description**: Create new institution (admin only)
- **Request Body**:
  - `name` (string, required): Institution name
  - `taxId` (string, required): CUIT/CUIL
  - `address` (string, required)
  - `phone` (string, optional)
  - `email` (string, optional)
  - `contactName` (string, optional)
  - `isActive` (boolean, default: true)

### GET /api/institutions/:id
- **Description**: Get institution by ID
- **URL Params**:
  - `id` (string, required): Institution ID

### PUT /api/institutions/:id
- **Description**: Update institution
- **URL Params**:
  - `id` (string, required): Institution ID
- **Request Body**: Same as POST, all fields optional

### DELETE /api/institutions/:id
- **Description**: Delete institution (soft delete)
- **URL Params**:
  - `id` (string, required): Institution ID

## Quotations (Presupuestos/Cotizaciones)

### POST /v1/quotations
- **Description**: Create a new quotation
- **Authentication**: Required
- **Request Body**:
  - `items` (array, required): Array of items with `productId`, `variantId`, `quantity`
  - `expiresInDays` (number, optional, default: 7): Days until expiration
  - `notes` (string, optional): Additional notes
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "quo_123",
      "reference": "COT-2023-001",
      "status": "DRAFT",
      "subtotal": 2999.99,
      "taxAmount": 630.0,
      "total": 3629.99,
      "currency": "ARS",
      "expiresAt": "2023-12-31T23:59:59Z",
      "items": [
        {
          "productId": "prod_123",
          "variantId": "var_123",
          "name": "Libro de Ejemplo - Tapa dura",
          "quantity": 2,
          "unitPrice": 1499.99,
          "subtotal": 2999.98
        }
      ]
    }
  }
  ```
  - `201 Created` on success
  - `400 Bad Request` for invalid data
  - `404 Not Found` if product/variant doesn't exist

### GET /v1/quotations/:id
- **Description**: Get quotation by ID or reference
- **Authentication**: Owner or Admin
- **URL Params**:
  - `id` (string, required): Quotation ID or reference
- **Response**:
  - `200 OK` with quotation details
  - `404 Not Found` if quotation doesn't exist
  - `403 Forbidden` if not authorized

### POST /v1/quotations/:id/accept
- **Description**: Accept a quotation (converts to order)
- **Authentication**: Owner
- **URL Params**:
  - `id` (string, required): Quotation ID
- **Response**:
  - `200 OK` with order details
  - `400 Bad Request` if quotation is expired or invalid
  - `404 Not Found` if quotation doesn't exist

### POST /v1/quotations/:id/decline
- **Description**: Decline a quotation
- **Authentication**: Owner
- **URL Params**:
  - `id` (string, required): Quotation ID
- **Request Body**:
  - `reason` (string, optional): Reason for declining
- **Response**:
  - `200 OK` on success
  - `404 Not Found` if quotation doesn't exist

### GET /v1/quotations
- **Description**: List user's quotations
- **Authentication**: Required
- **Query Params**:
  - `status` (string, optional): Filter by status (DRAFT, SENT, ACCEPTED, etc.)
  - `startDate`, `endDate` (ISO date, optional): Date range
  - `page` (number, default: 1)
  - `limit` (number, default: 20)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "quo_123",
        "reference": "COT-2023-001",
        "status": "ACCEPTED",
        "total": 3629.99,
        "currency": "ARS",
        "expiresAt": "2023-12-31T23:59:59Z",
        "createdAt": "2023-01-15T10:30:00Z"
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```

## Shipping Zones (Zonas de Envío)

### GET /v1/shipping/zones
- **Description**: List shipping zones
- **Authentication**: Admin
- **Query Params**:
  - `isActive` (boolean, optional): Filter by active status
  - `country` (string, optional): Filter by country code
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "zone_123",
        "name": "Buenos Aires",
        "description": "Ciudad Autónoma de Buenos Aires",
        "countries": ["AR"],
        "isActive": true,
        "rates": [
          {
            "id": "rate_123",
            "name": "Estándar",
            "price": 1200.00,
            "estimatedDays": "3-5 días hábiles"
          }
        ]
      }
    ]
  }
  ```

### POST /v1/shipping/zones
- **Description**: Create a new shipping zone
- **Authentication**: Admin
- **Request Body**:
  - `name` (string, required): Zone name
  - `description` (string, optional)
  - `countries` (array, required): Array of ISO country codes
  - `rates` (array, required): Array of rate objects with `name`, `price`, etc.
- **Response**:
  - `201 Created` with zone details
  - `400 Bad Request` for invalid data

### PUT /v1/shipping/zones/:id
- **Description**: Update shipping zone
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, required): Zone ID
- **Request Body**: Same as POST (all fields optional)
- **Response**:
  - `200 OK` with updated zone
  - `404 Not Found` if zone doesn't exist

### DELETE /v1/shipping/zones/:id
- **Description**: Delete shipping zone (soft delete)
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, required): Zone ID
- **Response**:
  - `204 No Content` on success
  - `404 Not Found` if zone doesn't exist

### POST /v1/shipping/calculate
- **Description**: Calculate shipping cost
- **Authentication**: Optional
- **Request Body**:
  - `items` (array, required): Array of `{productId, variantId, quantity}`
  - `postalCode` (string, required)
  - `country` (string, required, default: "AR")
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "availableMethods": [
        {
          "id": "standard",
          "name": "Envío Estándar",
          "price": 1200.00,
          "estimatedDays": "3-5 días hábiles",
          "zoneId": "zone_123"
        }
      ]
    }
  }
  ```

## Notifications

### GET /v1/notifications
- **Description**: List user's notifications
- **Authentication**: Required (JWT token)
- **Query Params**:
  - `isRead` (boolean, optional): Filter by read/unread status
  - `type` (string, optional): Filter by notification type
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 20, max: 100)
- **Responses**:
  - `200 OK`: Lista de notificaciones obtenida exitosamente
  - `400 Bad Request`: Parámetros de consulta inválidos
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `403 Forbidden`: No tienes permiso para ver estas notificaciones
  - `500 Internal Server Error`: Error del servidor
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "notif_123",
        "type": "ORDER_UPDATE",
        "title": "¡Tu pedido ha sido enviado!",
        "message": "Tu pedido #ORD-12345 ha sido enviado. N° de seguimiento: AB123456789AR",
        "isRead": false,
        "metadata": {
          "orderId": "order_123",
          "trackingNumber": "AB123456789AR"
        },
        "createdAt": "2023-01-15T10:30:00Z"
      }
    ],
    "meta": {
      "total": 5,
      "unreadCount": 3,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```

### GET /v1/notifications/unread-count
- **Description**: Get count of unread notifications
- **Authentication**: Required (JWT token)
- **Responses**:
  - `200 OK`: Conteo de no leídas obtenido exitosamente
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `500 Internal Server Error`: Error del servidor
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "count": 3
    }
  }
  ```

### PUT /v1/notifications/:id/read
- **Description**: Mark notification as read
- **Authentication**: Owner (JWT token)
- **URL Params**:
  - `id` (string, required): Notification ID (UUID format)
- **Responses**:
  - `200 OK`: Notificación marcada como leída
  - `400 Bad Request`: ID de notificación inválido
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `403 Forbidden`: No tienes permiso para marcar esta notificación
  - `404 Not Found`: Notificación no encontrada
  - `410 Gone`: Notificación ya fue leída anteriormente
  - `500 Internal Server Error`: Error del servidor

### PUT /v1/notifications/read-all
- **Description**: Mark all notifications as read
- **Authentication**: Required (JWT token)
- **Request Body**:
  - `olderThan` (ISO date, optional): Solo marcar notificaciones anteriores a esta fecha
- **Responses**:
  - `200 OK`: Notificaciones marcadas como leídas
  - `400 Bad Request`: Fecha inválida en el parámetro olderThan
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "updatedCount": 3,
      "timestamp": "2023-10-04T10:30:00Z"
    }
  }
  ```

## Product Variants

### GET /v1/products/:productId/variants
- **Description**: List variants for a product
- **Authentication**: Optional
- **URL Params**:
  - `productId` (string, required): Product ID or slug
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "var_123",
        "name": "Tapa blanda",
        "sku": "LIB-001-TB",
        "price": 29.99,
        "stock": 50,
        "isActive": true,
        "images": [
          {
            "id": "img_123",
            "url": "/images/products/libro-ejemplo-tb.jpg",
            "alt": "Libro de Ejemplo - Tapa blanda"
          }
        ],
        "attributes": {
          "format": "Tapa blanda",
          "pages": 320
        }
      }
    ]
  }
  ```

### GET /v1/variants/:id
- **Description**: Get variant by ID
- **Authentication**: Optional
- **URL Params**:
  - `id` (string, required): Variant ID
- **Response**:
  - `200 OK` with variant details
  - `404 Not Found` if variant doesn't exist

### POST /v1/variants
- **Description**: Create new variant (admin only)
- **Authentication**: Admin
- **Request Body**:
  - `productId` (string, required): Parent product ID
  - `name` (string, required): Variant name
  - `sku` (string, required): Unique SKU
  - `price` (number, required)
  - `stock` (number, default: 0)
  - `isActive` (boolean, default: true)
  - `attributes` (object, optional): Custom attributes
- **Response**:
  - `201 Created` with new variant
  - `400 Bad Request` for invalid data

### PUT /v1/variants/:id
- **Description**: Update variant
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, required): Variant ID
- **Request Body**: Same as POST, all fields optional
- **Response**:
  - `200 OK` with updated variant
  - `404 Not Found` if variant doesn't exist

## Media

### POST /v1/media/upload
- **Description**: Upload media file
- **Authentication**: Admin
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `file` (file, required): The file to upload
  - `type` (string, required): `PRODUCT` or `VARIANT`
  - `productId` (string, required if type=PRODUCT)
  - `variantId` (string, required if type=VARIANT)
  - `alt` (string, optional): Alt text
  - `isPrimary` (boolean, optional): Set as primary image
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "img_123",
      "url": "/uploads/products/123/filename.jpg",
      "alt": "Product image",
      "type": "image/jpeg",
      "size": 10240,
      "width": 800,
      "height": 600,
      "isPrimary": true
    }
  }
  ```

### DELETE /v1/media/:id
- **Description**: Delete media
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, required): Media ID
- **Response**:
  - `204 No Content` on success
  - `404 Not Found` if media doesn't exist

## Bulk Pricing

### GET /v1/products/:productId/bulk-pricing
- **Description**: Get bulk pricing tiers for a product
- **Authentication**: Optional
- **URL Params**:
  - `productId` (string, required): Product ID or slug
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "bulk_123",
        "minQuantity": 5,
        "price": 25.99,
        "discount": "13%",
        "isActive": true,
        "startsAt": "2023-01-01T00:00:00Z",
        "expiresAt": "2023-12-31T23:59:59Z"
      },
      {
        "id": "bulk_124",
        "minQuantity": 10,
        "price": 22.99,
        "discount": "23%",
        "isActive": true
      }
    ]
  }
  ```

### POST /v1/bulk-pricing
- **Description**: Create bulk pricing tier (admin only)
- **Authentication**: Admin
- **Request Body**:
  - `productId` (string, required)
  - `minQuantity` (number, required)
  - `price` (number, required)
  - `isActive` (boolean, default: true)
  - `startsAt` (ISO date, optional)
  - `expiresAt` (ISO date, optional)
- **Response**:
  - `201 Created` with new bulk pricing tier
  - `400 Bad Request` for invalid data
  - `409 Conflict` if tier already exists for quantity

### DELETE /v1/bulk-pricing/:id
- **Description**: Delete bulk pricing tier
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, required): Bulk pricing ID
- **Response**:
  - `204 No Content` on success
  - `404 Not Found` if tier doesn't exist

## Shipping Rates (Tarifas de Envío)

### GET /v1/shipping/rates
- **Description**: Listar tarifas de envío
- **Authentication**: Admin
- **Query Params**:
  - `zoneId` (string, opcional): Filtrar por zona de envío
  - `isActive` (boolean, opcional): Filtrar por estado activo/inactivo
  - `minOrderValue` (number, opcional): Filtrar por valor mínimo de pedido
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 20, max: 100)
- **Responses**:
  - `200 OK`: Lista de tarifas obtenida exitosamente
  - `400 Bad Request`: Parámetros de consulta inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "rate_123",
        "name": "Envío Estándar",
        "zoneId": "zone_123",
        "zoneName": "Buenos Aires",
        "minOrderValue": 0,
        "maxOrderValue": 5000,
        "price": 1200.00,
        "estimatedDays": "3-5 días hábiles",
        "isActive": true,
        "createdAt": "2023-01-15T10:30:00Z"
      }
    ],
    "meta": {
      "total": 5,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```

### GET /v1/shipping/rates/:id
- **Description**: Obtener detalles de una tarifa de envío
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID de la tarifa
- **Responses**:
  - `200 OK`: Tarifa obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Tarifa no encontrada
  - `500 Internal Server Error`: Error del servidor

### POST /v1/shipping/rates
- **Description**: Crear nueva tarifa de envío
- **Authentication**: Admin
- **Request Body**:
  - `zoneId` (string, requerido): ID de la zona de envío
  - `name` (string, requerido): Nombre de la tarifa
  - `minOrderValue` (number, opcional, default: 0): Valor mínimo de pedido
  - `maxOrderValue` (number, opcional): Valor máximo de pedido
  - `price` (number, requerido, min: 0): Precio del envío
  - `estimatedDays` (string, opcional): Días estimados de entrega
  - `isActive` (boolean, opcional, default: true): Si la tarifa está activa
- **Responses**:
  - `201 Created`: Tarifa creada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Zona no encontrada
  - `409 Conflict`: Conflicto con otra tarifa
  - `500 Internal Server Error`: Error del servidor
- **Request Example**:
  ```json
  {
    "zoneId": "zone_123",
    "name": "Envío Express",
    "minOrderValue": 1000,
    "price": 2500.00,
    "estimatedDays": "24-48 horas",
    "isActive": true
  }
  ```

### PUT /v1/shipping/rates/:id
- **Description**: Actualizar tarifa de envío
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID de la tarifa
- **Request Body**: Igual que POST, todos los campos son opcionales
- **Responses**:
  - `200 OK`: Tarifa actualizada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Tarifa no encontrada
  - `409 Conflict`: Conflicto con otra tarifa
  - `500 Internal Server Error`: Error del servidor

### DELETE /v1/shipping/rates/:id
- **Description**: Eliminar tarifa de envío
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID de la tarifa
- **Responses**:
  - `204 No Content`: Tarifa eliminada exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Tarifa no encontrada
  - `500 Internal Server Error`: Error del servidor

### GET /v1/shipping/rates/calculate
- **Description**: Calcular costos de envío para un carrito
- **Authentication**: Opcional
- **Query Params**:
  - `postalCode` (string, requerido): Código postal de destino
  - `country` (string, opcional, default: "AR"): Código de país (ISO 3166-1 alpha-2)
- **Request Body**:
  - `items` (array, requerido): Array de ítems del carrito
    - `productId` (string, requerido)
    - `variantId` (string, opcional)
    - `quantity` (number, requerido, min: 1)
- **Responses**:
  - `200 OK`: Cálculo exitoso
  - `400 Bad Request`: Datos inválidos
  - `404 Not Found`: No hay opciones de envío disponibles
  - `500 Internal Server Error`: Error del servidor
- **Request Example**:
  ```json
  {
    "items": [
      {"productId": "prod_123", "quantity": 2},
      {"productId": "prod_456", "variantId": "var_789", "quantity": 1}
    ]
  }
  ```
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "rate_123",
        "name": "Envío Estándar",
        "price": 1200.00,
        "estimatedDays": "3-5 días hábiles",
        "zoneId": "zone_123"
      },
      {
        "id": "rate_456",
        "name": "Envío Express",
        "price": 2500.00,
        "estimatedDays": "24-48 horas",
        "zoneId": "zone_123"
      }
    ]
  }
  ```

## School Supply Lists (Listas de Útiles Escolares)

### GET /v1/school-supply-lists
- **Description**: Obtener listas de útiles del usuario
- **Authentication**: Requerido (JWT token)
- **Query Params**:
  - `isTemplate` (boolean, opcional): Filtrar por plantillas
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 20, max: 50)
- **Responses**:
  - `200 OK`: Lista obtenida exitosamente
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "list_123",
        "name": "Lista 1er Grado 2024",
        "description": "Lista completa para primer grado",
        "isTemplate": false,
        "itemsCount": 12,
        "createdAt": "2024-02-15T10:30:00Z",
        "updatedAt": "2024-02-15T10:30:00Z"
      }
    ],
    "meta": {
      "total": 3,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```

### GET /v1/school-supply-lists/:id
- **Description**: Obtener detalles de una lista de útiles
- **Authentication**: Propietario o Admin
- **URL Params**:
  - `id` (string, requerido): ID de la lista
- **Responses**:
  - `200 OK`: Lista obtenida exitosamente
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `403 Forbidden`: No tienes permiso para ver esta lista
  - `404 Not Found`: Lista no encontrada
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "id": "list_123",
      "name": "Lista 1er Grado 2024",
      "description": "Lista completa para primer grado",
      "isTemplate": false,
      "items": [
        {
          "productId": "prod_123",
          "variantId": "var_123",
          "name": "Cuaderno Tapa Dura 48hs",
          "quantity": 2,
          "notes": "Raya ancha"
        },
        {
          "productId": "prod_456",
          "variantId": "var_789",
          "name": "Lápiz Negro N°2",
          "quantity": 12,
          "notes": "Marca Faber-Castell"
        }
      ],
      "createdAt": "2024-02-15T10:30:00Z",
      "updatedAt": "2024-02-15T10:30:00Z"
    }
  }
  ```

### POST /v1/school-supply-lists
- **Description**: Crear una nueva lista de útiles
- **Authentication**: Requerido (JWT token)
- **Request Body**:
  - `name` (string, requerido): Nombre de la lista
  - `description` (string, opcional): Descripción
  - `isTemplate` (boolean, opcional, default: false)
  - `items` (array, opcional): Array de ítems
    - `productId` (string, requerido)
    - `variantId` (string, opcional)
    - `quantity` (number, requerido, min: 1)
    - `notes` (string, opcional)
- **Responses**:
  - `201 Created`: Lista creada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `404 Not Found`: Producto o variante no encontrado
- **Request Example**:
  ```json
  {
    "name": "Lista 2do Grado 2024",
    "description": "Lista de útiles para segundo grado",
    "isTemplate": false,
    "items": [
      {
        "productId": "prod_123",
        "variantId": "var_123",
        "quantity": 2,
        "notes": "Raya ancha"
      }
    ]
  }
  ```

### PUT /v1/school-supply-lists/:id
- **Description**: Actualizar una lista de útiles
- **Authentication**: Propietario o Admin
- **URL Params**:
  - `id` (string, requerido): ID de la lista
- **Request Body**: Igual que POST, todos los campos son opcionales
- **Responses**:
  - `200 OK`: Lista actualizada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `403 Forbidden`: No tienes permiso para actualizar esta lista
  - `404 Not Found`: Lista no encontrada

### DELETE /v1/school-supply-lists/:id
- **Description**: Eliminar una lista de útiles
- **Authentication**: Propietario o Admin
- **URL Params**:
  - `id` (string, requerido): ID de la lista
- **Responses**:
  - `204 No Content`: Lista eliminada exitosamente
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `403 Forbidden`: No tienes permiso para eliminar esta lista
  - `404 Not Found`: Lista no encontrada

### POST /v1/school-supply-lists/:id/duplicate
- **Description**: Duplicar una lista de útiles
- **Authentication**: Propietario o Admin
- **URL Params**:
  - `id` (string, requerido): ID de la lista a duplicar
- **Request Body**:
  - `name` (string, opcional): Nuevo nombre para la copia
  - `isTemplate` (boolean, opcional): Sobrescribir si es plantilla
- **Responses**:
  - `201 Created`: Lista duplicada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: Token no proporcionado o inválido
  - `403 Forbidden`: No tienes permiso para duplicar esta lista
  - `404 Not Found`: Lista no encontrada

## Audit Logs (Registros de Auditoría)

### GET /v1/audit-logs
- **Description**: Obtener registros de auditoría
- **Authentication**: Admin
- **Query Params**:
  - `entityType` (string, opcional): Filtrar por tipo de entidad (ej: 'User', 'Order', 'Product')
  - `entityId` (string, opcional): Filtrar por ID de entidad específica
  - `action` (string, opcional): Filtrar por acción (ej: 'CREATE', 'UPDATE', 'DELETE')
  - `userId` (string, opcional): Filtrar por ID de usuario
  - `startDate` (ISO date, opcional): Fecha de inicio (inclusivo)
  - `endDate` (ISO date, opcional): Fecha de fin (inclusivo)
  - `q` (string, opcional): Búsqueda en campos de texto
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 50, max: 200)
  - `sort` (string, opcional): Campo para ordenar (ej: 'createdAt', '-createdAt' para orden descendente)
- **Responses**:
  - `200 OK`: Registros obtenidos exitosamente
  - `400 Bad Request`: Parámetros inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "log_123",
        "action": "UPDATE",
        "entityType": "Product",
        "entityId": "prod_123",
        "userId": "user_456",
        "userEmail": "admin@example.com",
        "oldData": {
          "price": 1999.99,
          "stock": 10
        },
        "newData": {
          "price": 2499.99,
          "stock": 15
        },
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...",
        "createdAt": "2023-10-04T10:15:30Z"
      }
    ],
    "meta": {
      "total": 1250,
      "page": 1,
      "limit": 50,
      "totalPages": 25
    }
  }
  ```

### GET /v1/audit-logs/:id
- **Description**: Obtener detalles de un registro de auditoría
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID del registro
- **Responses**:
  - `200 OK`: Registro obtenido exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Registro no encontrado
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "id": "log_123",
      "action": "CREATE",
      "entityType": "Order",
      "entityId": "order_789",
      "userId": "user_456",
      "userEmail": "cliente@example.com",
      "oldData": null,
      "newData": {
        "status": "PENDING",
        "total": 3598.97,
        "items": [
          {"productId": "prod_123", "quantity": 1, "price": 1999.99},
          {"productId": "prod_456", "quantity": 2, "price": 799.99}
        ]
      },
      "ipAddress": "201.234.56.78",
      "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)...",
      "createdAt": "2023-10-04T09:30:15Z"
    }
  }
  ```

### GET /v1/audit-logs/export
- **Description**: Exportar registros de auditoría (CSV/Excel)
- **Authentication**: Admin
- **Query Params**: Mismos que GET /v1/audit-logs
- **Headers**:
  - `Accept: text/csv` o `Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- **Responses**:
  - `200 OK`: Archivo de exportación
  - `400 Bad Request`: Parámetros inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `500 Internal Server Error`: Error del servidor
- **Response Headers**:
  - `Content-Type`: `text/csv` o `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
  - `Content-Disposition`: `attachment; filename=audit-logs-{timestamp}.{csv|xlsx}`

### POST /v1/audit-logs
- **Description**: Crear registro de auditoría manual (para integraciones)
- **Authentication**: API Key (Header: `X-API-Key`)
- **Request Body**:
  - `action` (string, requerido): Acción realizada (ej: 'CUSTOM_ACTION')
  - `entityType` (string, requerido): Tipo de entidad afectada
  - `entityId` (string, requerido): ID de la entidad afectada
  - `description` (string, opcional): Descripción detallada
  - `metadata` (object, opcional): Datos adicionales en formato JSON
- **Responses**:
  - `201 Created`: Registro creado exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: API Key inválida
  - `500 Internal Server Error`: Error del servidor
- **Request Example**:
  ```json
  {
    "action": "INTEGRATION_SYNC",
    "entityType": "Inventory",
    "entityId": "inv_123",
    "description": "Sincronización de inventario con sistema externo",
    "metadata": {
      "externalSystem": "SAP",
      "itemsUpdated": 42,
      "durationMs": 1250
    }
  }
  ```

### GET /v1/audit-logs/activity-feed
- **Description**: Obtener actividad reciente del sistema (feed de actividades)
- **Authentication**: Requerido (JWT token)
- **Query Params**:
  - `types` (string[], opcional): Filtrar por tipos de entidad
  - `limit` (number, default: 20, max: 100): Cantidad de registros a devolver
- **Responses**:
  - `200 OK`: Actividad obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "log_123",
        "action": "CREATE",
        "entityType": "Order",
        "entityId": "order_789",
        "summary": "Nuevo pedido #ORD-2023-1001 creado",
        "userId": "user_123",
        "userName": "Juan Pérez",
        "userAvatar": "/avatars/user_123.jpg",
        "createdAt": "2023-10-04T10:15:30Z"
      },
      {
        "id": "log_122",
        "action": "UPDATE",
        "entityType": "Product",
        "entityId": "prod_456",
        "summary": "Precio actualizado de $1,999.99 a $2,199.99",
        "userId": "user_456",
        "userName": "Admin Sistema",
        "userAvatar": "/avatars/user_456.jpg",
        "createdAt": "2023-10-04T09:30:15Z"
      }
    ]
  }
  ```

## Institutions (Instituciones)

### GET /v1/institutions
- **Description**: Listar instituciones
- **Authentication**: Admin o Usuario con rol INSTITUTION
- **Query Params**:
  - `type` (string, opcional): Filtrar por tipo de institución (ej: 'SCHOOL', 'UNIVERSITY', 'GOVERNMENT')
  - `status` (string, opcional): Filtrar por estado (ej: 'PENDING', 'ACTIVE', 'SUSPENDED')
  - `q` (string, opcional): Búsqueda por nombre o RUC/CUIT
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 20, max: 100)
- **Responses**:
  - `200 OK`: Lista de instituciones obtenida exitosamente
  - `400 Bad Request`: Parámetros inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "inst_123",
        "name": "Colegio San Martín",
        "type": "SCHOOL",
        "taxId": "30-12345678-9",
        "address": {
          "street": "Av. Siempre Viva 123",
          "city": "Buenos Aires",
          "state": "Buenos Aires",
          "postalCode": "C1406",
          "country": "AR"
        },
        "contact": {
          "name": "María González",
          "email": "contacto@colegiosanmartin.edu.ar",
          "phone": "+54 11 1234-5678"
        },
        "status": "ACTIVE",
        "createdAt": "2023-01-15T10:30:00Z"
      }
    ],
    "meta": {
      "total": 15,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```

### POST /v1/institutions/register
- **Description**: Registrar nueva institución (proceso de solicitud)
- **Authentication**: Opcional (dependiendo del flujo)
- **Request Body**:
  - `name` (string, requerido): Nombre de la institución
  - `type` (string, requerido): Tipo de institución
  - `taxId` (string, requerido): RUC/CUIT/CUIL
  - `address` (object, requerido):
    - `street` (string, requerido)
    - `city` (string, requerido)
    - `state` (string, opcional)
    - `postalCode` (string, requerido)
    - `country` (string, requerido, default: "AR")
  - `contact` (object, requerido):
    - `name` (string, requerido): Nombre del contacto
    - `email` (string, requerido)
    - `phone` (string, opcional)
  - `adminUser` (object, opcional): Datos del administrador
    - `email` (string, requerido si se incluye)
    - `firstName` (string, requerido si se incluye)
    - `lastName` (string, requerido si se incluye)
    - `phone` (string, opcional)
- **Responses**:
  - `201 Created`: Solicitud de registro recibida
  - `400 Bad Request`: Datos inválidos
  - `409 Conflict`: Institución ya registrada
  - `500 Internal Server Error`: Error del servidor
- **Request Example**:
  ```json
  {
    "name": "Instituto Técnico N°45",
    "type": "TECHNICAL_SCHOOL",
    "taxId": "30-87654321-9",
    "address": {
      "street": "Belgrano 1234",
      "city": "Córdoba",
      "state": "Córdoba",
      "postalCode": "5000",
      "country": "AR"
    },
    "contact": {
      "name": "Carlos López",
      "email": "secretaria@it45.edu.ar",
      "phone": "+54 351 555-1234"
    },
    "adminUser": {
      "email": "admin@it45.edu.ar",
      "firstName": "Carlos",
      "lastName": "López",
      "phone": "+54 9 351 555-4321"
    }
  }
  ```

### GET /v1/institutions/:id
- **Description**: Obtener detalles de una institución
- **Authentication**: Admin o Usuario de la institución
- **URL Params**:
  - `id` (string, requerido): ID o slug de la institución
- **Responses**:
  - `200 OK`: Institución obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Institución no encontrada
  - `500 Internal Server Error`: Error del servidor

### PUT /v1/institutions/:id
- **Description**: Actualizar información de la institución
- **Authentication**: Admin o Administrador de la institución
- **URL Params**:
  - `id` (string, requerido): ID de la institución
- **Request Body**: Igual que POST, todos los campos son opcionales
- **Responses**:
  - `200 OK`: Institución actualizada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Institución no encontrada
  - `500 Internal Server Error`: Error del servidor

### PATCH /v1/institutions/:id/status
- **Description**: Actualizar estado de la institución (solo admin)
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID de la institución
- **Request Body**:
  - `status` (string, requerido): Nuevo estado (ej: 'ACTIVE', 'SUSPENDED')
  - `reason` (string, opcional): Razón del cambio de estado
- **Responses**:
  - `200 OK`: Estado actualizado exitosamente
  - `400 Bad Request`: Estado inválido
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Institución no encontrada
  - `500 Internal Server Error`: Error del servidor

### GET /v1/institutions/:id/users
- **Description**: Listar usuarios de la institución
- **Authentication**: Admin o Administrador de la institución
- **URL Params**:
  - `id` (string, requerido): ID de la institución
- **Query Params**:
  - `role` (string, opcional): Filtrar por rol
  - `status` (string, opcional): Filtrar por estado
  - `q` (string, opcional): Búsqueda por nombre o email
  - `page` (number, default: 1)
  - `limit` (number, default: 20)
- **Responses**:
  - `200 OK`: Lista de usuarios obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Institución no encontrada
  - `500 Internal Server Error`: Error del servidor

### POST /v1/institutions/:id/invite
- **Description**: Invitar usuario a la institución
- **Authentication**: Admin o Administrador de la institución
- **URL Params**:
  - `id` (string, requerido): ID de la institución
- **Request Body**:
  - `email` (string, requerido): Email del usuario a invitar
  - `role` (string, requerido): Rol en la institución
  - `message` (string, opcional): Mensaje personalizado
- **Responses**:
  - `201 Created`: Invitación enviada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Institución no encontrada
  - `409 Conflict`: Usuario ya es miembro
  - `500 Internal Server Error`: Error del servidor

## Promotions (Promociones)

### GET /v1/promotions
- **Description**: Listar promociones activas
- **Authentication**: Opcional
- **Query Params**:
  - `type` (string, opcional): Tipo de promoción (ej: 'PERCENTAGE', 'FIXED_AMOUNT', 'BUY_X_GET_Y')
  - `category` (string, opcional): Filtrar por categoría
  - `q` (string, opcional): Búsqueda por nombre o código
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 20, max: 100)
- **Responses**:
  - `200 OK`: Lista de promociones obtenida exitosamente
  - `400 Bad Request`: Parámetros inválidos
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "promo_123",
        "code": "VERANO20",
        "name": "Oferta de Verano",
        "description": "20% de descuento en todos los productos",
        "type": "PERCENTAGE",
        "value": 20,
        "minPurchaseAmount": 5000,
        "startDate": "2023-12-01T00:00:00Z",
        "endDate": "2023-12-31T23:59:59Z",
        "maxUses": 1000,
        "currentUses": 342,
        "applicableCategories": ["libros", "libreria"],
        "isActive": true,
        "createdAt": "2023-11-15T10:30:00Z"
      }
    ],
    "meta": {
      "total": 5,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```

### GET /v1/promotions/validate
- **Description**: Validar código de promoción
- **Authentication**: Opcional (requerido para códigos de un solo uso)
- **Query Params**:
  - `code` (string, requerido): Código de promoción
  - `items` (array, opcional): Array de items para validar la promoción
    - `productId` (string, requerido)
    - `variantId` (string, opcional)
    - `quantity` (number, requerido)
    - `price` (number, requerido)
- **Responses**:
  - `200 OK`: Promoción válida
  - `400 Bad Request`: Código inválido o parámetros incorrectos
  - `404 Not Found`: Promoción no encontrada
  - `410 Gone`: Promoción expirada o agotada
  - `500 Internal Server Error`: Error del servidor
- **Request Example**:
  ```json
  {
    "code": "VERANO20",
    "items": [
      {
        "productId": "prod_123",
        "variantId": "var_456",
        "quantity": 2,
        "price": 2499.99
      }
    ]
  }
  ```
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "isValid": true,
      "promotion": {
        "id": "promo_123",
        "code": "VERANO20",
        "name": "Oferta de Verano",
        "description": "20% de descuento en todos los productos",
        "type": "PERCENTAGE",
        "value": 20,
        "appliesTo": "SUBTOTAL",
        "discountAmount": 999.99,
        "originalAmount": 4999.95,
        "finalAmount": 3999.96
      }
    }
  }
  ```

### POST /v1/promotions
- **Description**: Crear nueva promoción (solo admin)
- **Authentication**: Admin
- **Request Body**:
  - `code` (string, requerido): Código único
  - `name` (string, requerido): Nombre de la promoción
  - `description` (string, opcional): Descripción detallada
  - `type` (string, requerido): Tipo de promoción
  - `value` (number, requerido): Valor del descuento
  - `appliesTo` (string, opcional): A qué aplica (ej: 'SUBTOTAL', 'SHIPPING')
  - `minPurchaseAmount` (number, opcional): Monto mínimo de compra
  - `startDate` (ISO date, opcional): Fecha de inicio (default: ahora)
  - `endDate` (ISO date, opcional): Fecha de fin (sin fecha = sin expiración)
  - `maxUses` (number, opcional): Máximo de usos totales
  - `maxUsesPerUser` (number, opcional): Máximo de usos por usuario
  - `applicableCategories` (string[], opcional): Categorías aplicables
  - `excludedProducts` (string[], opcional): Productos excluidos
  - `isActive` (boolean, opcional): Estado inicial (default: true)
- **Responses**:
  - `201 Created`: Promoción creada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `409 Conflict`: El código ya existe
  - `500 Internal Server Error`: Error del servidor

### GET /v1/promotions/:id
- **Description**: Obtener detalles de una promoción
- **Authentication**: Opcional (solo admin para ver inactivas)
- **URL Params**:
  - `id` (string, requerido): ID o código de la promoción
- **Responses**:
  - `200 OK`: Promoción obtenida exitosamente
  - `401 Unauthorized`: No autenticado (solo para promociones inactivas)
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Promoción no encontrada
  - `500 Internal Server Error`: Error del servidor

### PUT /v1/promotions/:id
- **Description**: Actualizar promoción
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID de la promoción
- **Request Body**: Igual que POST, todos los campos son opcionales
- **Responses**:
  - `200 OK`: Promoción actualizada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Promoción no encontrada
  - `409 Conflict`: El código ya existe
  - `500 Internal Server Error`: Error del servidor

### DELETE /v1/promotions/:id
- **Description**: Eliminar promoción (soft delete)
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID de la promoción
- **Responses**:
  - `204 No Content`: Promoción eliminada exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Promoción no encontrada
  - `500 Internal Server Error`: Error del servidor

### POST /v1/promotions/:id/disable
- **Description**: Desactivar promoción
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID de la promoción
- **Responses**:
  - `200 OK`: Promoción desactivada exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Promoción no encontrada
  - `500 Internal Server Error`: Error del servidor

### POST /v1/promotions/:id/enable
- **Description**: Reactivar promoción
- **Authentication**: Admin
- **URL Params**:
  - `id` (string, requerido): ID de la promoción
- **Responses**:
  - `200 OK`: Promoción reactivada exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Promoción no encontrada
  - `500 Internal Server Error`: Error del servidor

## Wishlist (Lista de deseos)

### GET /v1/wishlists/me
- **Description**: Obtener la lista de deseos del usuario autenticado
- **Authentication**: Requerido (JWT token)
- **Query Params**:
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 20, max: 100)
- **Responses**:
  - `200 OK`: Lista de deseos obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "wish_123",
        "productId": "prod_456",
        "product": {
          "id": "prod_456",
          "name": "Cuaderno Universitario A4",
          "price": 2499.99,
          "images": ["https://.../cuaderno.jpg"],
          "inStock": true,
          "variantId": "var_789"
        },
        "createdAt": "2023-10-01T15:30:00Z"
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
  ```

### POST /v1/wishlists/items
- **Description**: Añadir producto a la lista de deseos
- **Authentication**: Requerido (JWT token)
- **Request Body**:
  - `productId` (string, requerido): ID del producto a añadir
  - `variantId` (string, opcional): ID de la variante específica
- **Responses**:
  - `201 Created`: Producto añadido exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `404 Not Found`: Producto no encontrado
  - `409 Conflict`: El producto ya está en la lista de deseos
  - `500 Internal Server Error`: Error del servidor

### DELETE /v1/wishlists/items/:itemId
- **Description**: Eliminar producto de la lista de deseos
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `itemId` (string, requerido): ID del ítem a eliminar
- **Responses**:
  - `204 No Content`: Producto eliminado exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Ítem no encontrado
  - `500 Internal Server Error`: Error del servidor

### POST /v1/wishlists/items/:itemId/move-to-cart
- **Description**: Mover producto de la lista de deseos al carrito
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `itemId` (string, requerido): ID del ítem a mover
- **Request Body**:
  - `quantity` (number, default: 1): Cantidad a añadir al carrito
- **Responses**:
  - `200 OK`: Producto movido al carrito exitosamente
  - `400 Bad Request`: Cantidad inválida o producto sin stock
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Ítem no encontrado
  - `500 Internal Server Error`: Error del servidor

## Reviews & Ratings (Reseñas y calificaciones)

### GET /v1/products/:productId/reviews
- **Description**: Obtener reseñas de un producto
- **Authentication**: Opcional
- **URL Params**:
  - `productId` (string, requerido): ID del producto
- **Query Params**:
  - `rating` (number, opcional): Filtrar por calificación (1-5)
  - `sort` (string, opcional): Ordenar por 'newest', 'highest', 'lowest', 'most_helpful'
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 10, max: 50)
- **Responses**:
  - `200 OK`: Reseñas obtenidas exitosamente
  - `404 Not Found`: Producto no encontrado
  - `500 Internal Server Error`: Error del servidor
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "rev_123",
        "rating": 5,
        "title": "Excelente producto",
        "comment": "Superó mis expectativas, muy buena calidad.",
        "user": {
          "id": "user_456",
          "name": "Ana López",
          "avatar": "/avatars/user_456.jpg"
        },
        "verifiedPurchase": true,
        "createdAt": "2023-09-15T14:30:00Z",
        "helpfulCount": 12,
        "images": ["https://.../foto1.jpg"]
      }
    ],
    "meta": {
      "averageRating": 4.7,
      "totalRatings": 128,
      "ratingDistribution": {
        "5": 65,
        "4": 45,
        "3": 12,
        "2": 4,
        "1": 2
      },
      "total": 1,
      "page": 1,
      "limit": 10,
      "totalPages": 13
    }
  }
  ```

### POST /v1/products/:productId/reviews
- **Description**: Crear una reseña
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `productId` (string, requerido): ID del producto
- **Request Body**:
  - `rating` (number, requerido): Calificación (1-5)
  - `title` (string, requerido): Título de la reseña
  - `comment` (string, requerido): Comentario detallado
  - `images` (string[], opcional): URLs de imágenes adjuntas
- **Responses**:
  - `201 Created`: Reseña creada exitosamente
  - `400 Bad Request`: Datos inválidos o no calificable
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso para reseñar
  - `404 Not Found`: Producto no encontrado
  - `409 Conflict`: Ya has reseñado este producto
  - `500 Internal Server Error`: Error del servidor

### PUT /v1/reviews/:reviewId
- **Description**: Actualizar una reseña existente
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `reviewId` (string, requerido): ID de la reseña
- **Request Body**: Igual que POST, todos los campos son opcionales
- **Responses**:
  - `200 OK`: Reseña actualizada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No eres el autor de la reseña
  - `404 Not Found`: Reseña no encontrada
  - `500 Internal Server Error`: Error del servidor

### POST /v1/reviews/:reviewId/helpful
- **Description**: Marcar una reseña como útil
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `reviewId` (string, requerido): ID de la reseña
- **Responses**:
  - `200 OK`: Voto registrado exitosamente
  - `400 Bad Request`: Ya has votado esta reseña
  - `401 Unauthorized`: No autenticado
  - `404 Not Found`: Reseña no encontrada
  - `500 Internal Server Error`: Error del servidor

## Returns & Refunds (Devoluciones y reembolsos)

### POST /v1/orders/:orderId/returns
- **Description**: Solicitar devolución o reembolso
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `orderId` (string, requerido): ID del pedido
- **Request Body**:
  - `items` (array, requerido): Items a devolver
    - `orderItemId` (string, requerido): ID del ítem del pedido
    - `quantity` (number, requerido): Cantidad a devolver
    - `reason` (string, requerido): Razón de la devolución
    - `comments` (string, opcional): Comentarios adicionales
  - `refundMethod` (string, requerido): Método de reembolso ('original', 'store_credit', 'exchange')
  - `preferredResolution` (string, opcional): Resolución preferida
  - `attachments` (string[], opcional): URLs de comprobantes o fotos
- **Responses**:
  - `201 Created`: Solicitud de devolución creada exitosamente
  - `400 Bad Request`: Datos inválidos o no reembolsable
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso para devolver este pedido
  - `404 Not Found`: Pedido no encontrado
  - `500 Internal Server Error`: Error del servidor

### GET /v1/returns
- **Description**: Listar devoluciones del usuario
- **Authentication**: Requerido (JWT token)
- **Query Params**:
  - `status` (string, opcional): Filtrar por estado
  - `page` (number, default: 1, min: 1)
  - `limit` (number, default: 10, max: 50)
- **Responses**:
  - `200 OK`: Lista de devoluciones obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `500 Internal Server Error`: Error del servidor

### GET /v1/returns/:returnId
- **Description**: Obtener detalles de una devolución
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `returnId` (string, requerido): ID de la devolución
- **Responses**:
  - `200 OK`: Devolución obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso para ver esta devolución
  - `404 Not Found`: Devolución no encontrada
  - `500 Internal Server Error`: Error del servidor

### POST /v1/returns/:returnId/cancel
- **Description**: Cancelar una solicitud de devolución
- **Authentication**: Requerido (JWT token)
- **URL Params**:
  - `returnId` (string, requerido): ID de la devolución
- **Responses**:
  - `200 OK`: Devolución cancelada exitosamente
  - `400 Bad Request`: No se puede cancelar en este estado
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso para cancelar esta devolución
  - `404 Not Found`: Devolución no encontrada
  - `500 Internal Server Error`: Error del servidor

## Panel de Administración

### GET /v1/admin/dashboard
- **Description**: Estadísticas del panel de administración
- **Authentication**: Requerido (Rol: ADMIN)
- **Responses**:
  - `200 OK`: Estadísticas obtenidas exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "sales": {
        "today": 1250.75,
        "week": 8450.30,
        "month": 32500.50,
        "change": 12.5
      },
      "orders": {
        "pending": 15,
        "processing": 8,
        "shipped": 32,
        "delivered": 124,
        "cancelled": 3
      },
      "customers": {
        "total": 1245,
        "newThisMonth": 156,
        "active": 843,
        "inactive": 402
      },
      "products": {
        "total": 342,
        "lowStock": 12,
        "outOfStock": 5,
        "topSelling": [
          {"id": "prod_123", "name": "Cuaderno Universitario", "sales": 124},
          {"id": "prod_456", "name": "Juego de Escuadras", "sales": 98}
        ]
      },
      "recentActivity": [
        {
          "id": "act_123",
          "type": "ORDER_CREATED",
          "description": "Nuevo pedido #ORD-1001",
          "user": "usuario@ejemplo.com",
          "timestamp": "2023-10-04T15:30:00Z"
        }
      ]
    }
  }
  ```

### GET /v1/admin/users
- **Description**: Listar usuarios (con filtros avanzados)
- **Authentication**: Requerido (Rol: ADMIN)
- **Query Params**:
  - `q` (string, opcional): Búsqueda por nombre, email o ID
  - `role` (string, opcional): Filtrar por rol
  - `status` (string, opcional): 'active', 'inactive', 'suspended'
  - `dateFrom` (ISO date, opcional): Filtrar por fecha de creación (desde)
  - `dateTo` (ISO date, opcional): Filtrar por fecha de creación (hasta)
  - `page` (number, default: 1)
  - `limit` (number, default: 20, max: 100)
  - `sort` (string, opcional): Campo para ordenar (ej: 'createdAt', '-lastLogin')
- **Responses**:
  - `200 OK`: Lista de usuarios obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "user_123",
        "email": "usuario@ejemplo.com",
        "firstName": "Juan",
        "lastName": "Pérez",
        "role": "CUSTOMER",
        "status": "active",
        "lastLogin": "2023-10-04T10:15:30Z",
        "createdAt": "2023-01-15T10:30:00Z",
        "orderCount": 5,
        "totalSpent": 12500.75
      }
    ],
    "meta": {
      "total": 1245,
      "page": 1,
      "limit": 20,
      "totalPages": 63
    }
  }
  ```

### POST /v1/admin/users
- **Description**: Crear nuevo usuario (admin)
- **Authentication**: Requerido (Rol: ADMIN)
- **Request Body**:
  - `email` (string, requerido)
  - `password` (string, requerido, min: 8 caracteres)
  - `firstName` (string, requerido)
  - `lastName` (string, requerido)
  - `role` (string, requerido): 'ADMIN', 'MANAGER', 'CUSTOMER', etc.
  - `phone` (string, opcional)
  - `sendWelcomeEmail` (boolean, opcional): Enviar email de bienvenida
- **Responses**:
  - `201 Created`: Usuario creado exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `409 Conflict`: El email ya está registrado

### GET /v1/admin/users/:userId
- **Description**: Obtener detalles de un usuario
- **Authentication**: Requerido (Rol: ADMIN)
- **URL Params**:
  - `userId` (string, requerido): ID del usuario
- **Responses**:
  - `200 OK`: Detalles del usuario
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Usuario no encontrado

### PUT /v1/admin/users/:userId
- **Description**: Actualizar usuario (admin)
- **Authentication**: Requerido (Rol: ADMIN)
- **URL Params**:
  - `userId` (string, requerido): ID del usuario
- **Request Body**: Igual que POST, todos los campos son opcionales
- **Responses**:
  - `200 OK`: Usuario actualizado exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Usuario no encontrado

### POST /v1/admin/users/:userId/status
- **Description**: Cambiar estado de un usuario
- **Authentication**: Requerido (Rol: ADMIN)
- **URL Params**:
  - `userId` (string, requerido): ID del usuario
- **Request Body**:
  - `status` (string, requerido): 'active', 'inactive', 'suspended'
  - `reason` (string, opcional): Razón del cambio de estado
- **Responses**:
  - `200 OK`: Estado actualizado exitosamente
  - `400 Bad Request`: Estado inválido
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `404 Not Found`: Usuario no encontrado

### GET /v1/admin/reports/sales
- **Description**: Reporte de ventas
- **Authentication**: Requerido (Rol: ADMIN, MANAGER)
- **Query Params**:
  - `period` (string, opcional): 'today', 'week', 'month', 'year', 'custom'
  - `startDate` (ISO date, opcional): Fecha de inicio (para 'custom')
  - `endDate` (ISO date, opcional): Fecha de fin (para 'custom')
  - `groupBy` (string, opcional): 'day', 'week', 'month', 'category', 'product'
  - `category` (string, opcional): Filtrar por categoría
  - `format` (string, opcional): 'json' (default), 'csv', 'excel'
- **Responses**:
  - `200 OK`: Reporte generado exitosamente
  - `400 Bad Request`: Parámetros inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso

### GET /v1/admin/settings
- **Description**: Obtener configuración del sitio
- **Authentication**: Requerido (Rol: ADMIN)
- **Responses**:
  - `200 OK`: Configuración obtenida exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
- **Response Example**:
  ```json
  {
    "success": true,
    "data": {
      "general": {
        "siteName": "Mi Tienda",
        "siteUrl": "https://tutienda.com",
        "defaultCurrency": "ARS",
        "timezone": "America/Argentina/Buenos_Aires",
        "maintenanceMode": false
      },
      "email": {
        "fromEmail": "no-reply@tutienda.com",
        "fromName": "Mi Tienda",
        "smtpHost": "smtp.sendgrid.net",
        "smtpPort": 587,
        "smtpSecure": true
      },
      "payment": {
        "methods": ["credit_card", "mercadopago", "bank_transfer"],
        "testMode": false,
        "currency": "ARS"
      },
      "shipping": {
        "enabled": true,
        "freeShippingThreshold": 15000,
        "defaultWeightUnit": "g"
      },
      "tax": {
        "enabled": true,
        "defaultRate": 21,
        "pricesIncludeTax": false
      },
      "seo": {
        "metaTitle": "Mi Tienda - Productos de Librería y Papelería",
        "metaDescription": "Encuentra los mejores productos de librería, papelería y útiles escolares al mejor precio.",
        "socialImage": "/images/og-image.jpg"
      }
    }
  }
  ```

### PUT /v1/admin/settings
- **Description**: Actualizar configuración del sitio
- **Authentication**: Requerido (Rol: ADMIN)
- **Request Body**:
  - `settings` (object, requerido): Objeto con la configuración a actualizar (solo los campos a modificar)
- **Responses**:
  - `200 OK`: Configuración actualizada exitosamente
  - `400 Bad Request`: Datos inválidos
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso

### GET /v1/admin/audit-logs
- **Description**: Obtener registros de auditoría
- **Authentication**: Requerido (Rol: ADMIN)
- **Query Params**:
  - `action` (string, opcional): Filtrar por acción (ej: 'login', 'user.update')
  - `userId` (string, opcional): Filtrar por ID de usuario
  - `entityType` (string, opcional): Filtrar por tipo de entidad (ej: 'User', 'Order')
  - `entityId` (string, opcional): Filtrar por ID de entidad
  - `startDate` (ISO date, opcional): Filtrar por fecha (desde)
  - `endDate` (ISO date, opcional): Filtrar por fecha (hasta)
  - `page` (number, default: 1)
  - `limit` (number, default: 50, max: 200)
- **Responses**:
  - `200 OK`: Registros obtenidos exitosamente
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
- **Response Example**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "log_123",
        "action": "user.update",
        "userId": "user_456",
        "userEmail": "admin@tutienda.com",
        "entityType": "User",
        "entityId": "user_789",
        "ipAddress": "192.168.1.100",
        "userAgent": "Mozilla/5.0...",
        "metadata": {
          "changes": {
            "status": ["active", "suspended"]
          }
        },
        "createdAt": "2023-10-04T10:15:30Z"
      }
    ],
    "meta": {
      "total": 1245,
      "page": 1,
      "limit": 50,
      "totalPages": 25
    }
  }
  ```

### POST /v1/admin/backup
- **Description**: Crear copia de seguridad
- **Authentication**: Requerido (Rol: ADMIN)
- **Request Body**:
  - `type` (string, opcional): 'full', 'database', 'files' (default: 'database')
  - `description` (string, opcional): Descripción de la copia
- **Responses**:
  - `202 Accepted`: Copia de seguridad iniciada
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
  - `429 Too Many Requests`: Demasiadas copias recientes

### GET /v1/admin/backups
- **Description**: Listar copias de seguridad
- **Authentication**: Requerido (Rol: ADMIN)
- **Query Params**:
  - `type` (string, opcional): Filtrar por tipo
  - `page` (number, default: 1)
  - `limit` (number, default: 20)
- **Responses**:
  - `200 OK`: Lista de copias de seguridad
  - `401 Unauthorized`: No autenticado
  - `403 Forbidden`: No tienes permiso
      "totalOrders": 1250,
      "totalRevenue": 1250000.00,
      "newCustomers": 42,
      "pendingOrders": 18,
      "topProducts": [
        {"id": "prod_123", "name": "Libro de Ejemplo", "sales": 125, "revenue": 12500.00},
        {"id": "prod_456", "name": "Cuaderno Universitario", "sales": 98, "revenue": 9800.00}
      ],
      "recentActivity": [
        {"type": "ORDER", "id": "order_123", "action": "CREATED", "timestamp": "2023-10-04T10:15:00Z"},
        {"type": "USER", "id": "user_456", "action": "REGISTERED", "timestamp": "2023-10-04T09:30:00Z"}
      ]
    }
  }
  ```

### GET /v1/admin/orders
- **Description**: List all orders (admin only)
- **Authentication**: Admin required
- **Query Params**:
  - `status` (string, optional): Filter by status
  - `startDate`, `endDate` (ISO date, optional): Date range
  - `customerId` (string, optional): Filter by customer
  - `sort` (string, optional): Sort field (createdAt, total, etc.)
  - `order` (enum: asc/desc, default: desc)
  - `page` (number, default: 1)
  - `limit` (number, default: 20)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "order_123",
        "orderNumber": "ORD-2023-001234",
        "customer": {
          "id": "user_123",
          "email": "cliente@ejemplo.com",
          "name": "Juan Pérez"
        },
        "status": "PROCESSING",
        "total": 12500.00,
        "items": 3,
        "createdAt": "2023-10-04T10:15:00Z",
        "updatedAt": "2023-10-04T10:20:00Z"
      }
    ],
    "meta": {
      "total": 1250,
      "page": 1,
      "limit": 20,
      "totalPages": 63
    }
  }
  ```

### PUT /v1/admin/orders/:id/status
- **Description**: Update order status
- **URL Params**:
  - `id` (string, required): Order ID
- **Request Body**:
  - `status` (string, required): New status
  - `trackingNumber` (string, optional): Tracking number if shipped
  - `notes` (string, optional): Status update notes

### GET /v1/admin/users
- **Description**: List all users (admin only)
- **Authentication**: Admin required
- **Query Params**:
  - `role` (string, optional): Filter by role
  - `isActive` (boolean, optional): Filter active/inactive users
  - `search` (string, optional): Search in email/name
  - `page` (number, default: 1)
  - `limit` (number, default: 20)
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "user_123",
        "email": "cliente@ejemplo.com",
        "firstName": "Juan",
        "lastName": "Pérez",
        "role": "CUSTOMER",
        "isActive": true,
        "ordersCount": 5,
        "lastLogin": "2023-10-04T09:30:00Z",
        "createdAt": "2023-01-15T10:30:00Z"
      }
    ],
    "meta": {
      "total": 150,
      "page": 1,
      "limit": 20,
      "totalPages": 8
    }
  }
  ```

### GET /v1/admin/audit-logs
- **Description**: Get audit logs
- **Query Params**:
  - `entityType` (string, optional): Filter by entity type
  - `entityId` (string, optional): Filter by entity ID
  - `userId` (string, optional): Filter by user ID
  - `startDate`, `endDate` (date, optional): Date range
  - `action` (string, optional): Filter by action type
  - `page` (number, default: 1)
  - `limit` (number, default: 50)

### GET /v1/admin/stats
- **Description**: Get system statistics
- **Response**:
  - `users`: Total user count
  - `products`: Total product count
  - `orders`: Order statistics (total, pending, completed, etc.)
  - `revenue`: Revenue statistics
  - `inventory`: Low stock items count

### GET /v1/admin/backup
- **Description**: Create database backup (admin only)
- **Response**:
  - `filename`: Backup filename
  - `size`: File size in bytes
  - `createdAt`: Backup timestamp