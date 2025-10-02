import { OrderStatus, type Order, type OrderItem } from '@prisma/client';
import { prisma } from '$lib/server/db';

interface CreateOrderInput {
  userId: string;
  items: Array<{
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
  notes?: string;
}

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export class OrderService {
  /**
   * Create a new order with stock reservation
   */
  async createOrder(data: CreateOrderInput): Promise<{
    order: OrderWithItems;
    requiresPayment: boolean;
  }> {
    return await prisma.$transaction(async (tx) => {
      // 1. Generate order number
      const orderNumber = await this.generateOrderNumber();
      
      // 2. Calculate total amount
      const total = data.items.reduce((sum, item) => 
        sum + (item.quantity * Number(item.price)), 0);

      // 3. Create order
      const order = await tx.order.create({
        data: {
          orderNumber,
          userId: data.userId,
          status: OrderStatus.PENDING,
          total,
          shippingAddress: data.shippingAddress,
          notes: data.notes,
          items: {
            create: data.items.map(item => ({
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { 
          items: {
            include: {
              product: true,
              variant: true,
            },
          },
        },
      });

      // 4. Update stock for each variant
      for (const item of data.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { 
              stock: { 
                decrement: item.quantity 
              },
            },
          });
        }
      }
      
      return { 
        order, 
        requiresPayment: true // For now, all orders require payment
      };
    });
  }

  /**
   * Generate a unique order number
   */
  private async generateOrderNumber(): Promise<string> {
    const count = await prisma.order.count();
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const sequence = (count + 1).toString().padStart(4, '0');
    
    return `ORD-${year}${month}${day}-${sequence}`;
  }

  /**
   * Get order by ID
   */
  async getOrderById(id: string): Promise<OrderWithItems | null> {
    return await prisma.order.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });
  }

  /**
   * Get orders by user ID
   */
  async getOrdersByUserId(userId: string): Promise<OrderWithItems[]> {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Update order status
   */
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  /**
   * Cancel an order and restore stock
   */
  async cancelOrder(orderId: string): Promise<Order> {
    return await prisma.$transaction(async (tx) => {
      // 1. Get the order with items
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { 
          items: {
            include: {
              variant: true,
            },
          },
        },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      if (order.status === OrderStatus.CANCELLED) {
        return order; // Already cancelled
      }

      // 2. Restore stock for each item with a variant
      for (const item of order.items) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { 
              stock: { 
                increment: item.quantity 
              },
            },
          });
        }
      }

      // 3. Update order status to cancelled
      return await tx.order.update({
        where: { id: orderId },
        data: { 
          status: OrderStatus.CANCELLED,
          updatedAt: new Date(),
        },
      });
    });
  }
}

export const orderService = new OrderService();
