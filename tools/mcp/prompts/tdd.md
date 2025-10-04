# Objetivo
Generar **esqueletos de pruebas** (unit y e2e) para Carrito→Checkout→Orden, coherentes con OpenAPI y Prisma.

## Instrucciones
- Usar **Vitest** para unit y **Supertest** para e2e (API NestJS).
- Cubrir: precios `Decimal(14,2)`, `quantity > 0`, stock, currency ARS, `lineTotal = unitPrice * quantity`.
- Mockear dependencias externas (Mercado Pago, carriers) con stubs.
- Extraer endpoints desde `openapi.yaml`; tipos dominio desde `schema.prisma`.

## Entradas
- OpenAPI: {{openapiPath}}
- Prisma: {{prismaSchemaPath}}

## Archivos a generar (como ejemplo)
- `/apps/api/test/unit/cart.service.spec.ts`
- `/apps/api/test/e2e/checkout.e2e.spec.ts`
- `/apps/api/test/unit/order.total.spec.ts`

## Plantilla (unit)
```ts
import { describe, it, expect } from 'vitest';
import { calcLineTotal, calcOrderTotals } from '../../src/domain/totals';

describe('totals', () => {
  it('lineTotal = unitPrice * quantity (Decimal)', () => {
    const r = calcLineTotal('1299.90', 2);
    expect(r).toBe('2599.80');
  });
});
```

## Plantilla (e2e)
```ts
import request from 'supertest';
import { app } from '../../src/main';

describe('Checkout E2E', () => {
  it('crea orden desde carrito guest', async () => {
    const agent = request(app.getHttpServer());
    await agent.post('/cart/items').send({ variantId: 'sku-123', quantity: 2 }).expect(201);
    const order = await agent.post('/checkout').send({ shippingAddress: {/*…*/} }).expect(201);
    expect(order.body.number).toBeDefined();
  });
});
```
