import { OrderStatus, type Prisma, type Order, type OrderItem, type PaymentStatus } from '@prisma/client';
import { prisma } from '$lib/server/db';
import { stockService } from './stock.service';
import { env } from '$env/dynamic/private';

interface CreateOrderInput {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingMethod: 'delivery' | 'pickup';
  shippingAddress?: string;
  paymentMethod: string;
  items: Array<{
    variantId: string;
    quantity: number;
    price: number;
  }>;
}

export class OrderService {
  /**
   * Create a new order with stock reservation
   */
  async createOrder(data: CreateOrderInput): Promise<{
    order: Order & { items: OrderItem[] };
    requiresPayment: boolean;
  }> {
    return await prisma.$transaction(async (tx) => {
      // 1. Generate order number
      const orderNumber = await this.generateOrderNumber();
      
      // 2. Calculate total amount
      const totalAmount = data.items.reduce((sum, item) => 
        sum + (item.quantity * Number(item.price)), 0);

      // 3. Create order
      const order = await tx.order.create({
        data: {
          orderNumber,
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          customerPhone: data.customerPhone,
          status: OrderStatus.PENDING,
          totalAmount,
          paymentMethod: data.paymentMethod,
          shippingMethod: data.shippingMethod,
          shippingAddress: data.shippingAddress,
          items: {
            create: data.items.map(item => ({
              variantId: item.variantId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: { items: true },
      });

      // 4. Reserve stock for each item
      for (const item of data.items) {
        const reserved = await stockService.reserveStock(
          item.variantId,
          order.id,
          item.quantity
        );
        
        if (!reserved) {
          throw new Error(`Insufficient stock for variant ${item.variantId}`);
        }
      }

      // 5. If it's a cash on delivery order, mark as processing
      // Otherwise, it will be updated when payment is received
      const requiresPayment = data.paymentMethod !== 'cash_on_delivery';
      
      return { order, requiresPayment };
    });
  }

  /**
   * Confirm payment and update order status
   */
  async confirmPayment(
    orderId: string,
    paymentData: {
      transactionId: string;
      amount: number;
      paymentMethod: string;
      details?: any;
    }
  ): Promise<{ success: boolean; order: Order | null }> {
    return await prisma.$transaction(async (tx) => {
      // 1. Find the order
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order) {
        return { success: false, order: null };
      }

      // 2. Update stock for each item
      for (const item of order.items) {
        const success = await stockService.confirmStockDeduction(
          item.variantId,
          item.quantity,
          order.id
        );
        
        if (!success) {
          throw new Error(`Failed to update stock for variant ${item.variantId}`);
        }
      }

      // 3. Create payment record
      await tx.payment.create({
        data: {
          orderId: order.id,
          amount: paymentData.amount,
          paymentMethod: paymentData.paymentMethod,
          status: 'COMPLETED',
          transactionId: paymentData.transactionId,
          paymentDetails: paymentData.details || {},
          processedAt: new Date(),
        },
      });

      // 4. Update order status
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { 
          status: OrderStatus.PROCESSING,
          updatedAt: new Date(),
        },
      });

      return { success: true, order: updatedOrder };
    });
  }

  /**
   * Cancel an order and release reserved stock
   */
  async cancelOrder(orderId: string): Promise<boolean> {
    return await prisma.$transaction(async (tx) => {
      // 1. Find the order with items
      const order = await tx.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order || order.status === 'CANCELLED') {
        return false;
      }

      // 2. Release reserved stock for each item
      for (const item of order.items) {
        await stockService.releaseStock(item.variantId, orderId);
      }

      // 3. Update order status to cancelled
      await tx.order.update({
        where: { id: orderId },
        data: { 
          status: 'CANCELLED',
          updatedAt: new Date(),
        },
      });

      return true;
    });
  }

  /**
   * Generate a unique order number
   */
  private async generateOrderNumber(): Promise<string> {
    const prefix = 'ORD';
    const date = new Date();
    const dateStr = date.getFullYear().toString().slice(-2) +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      date.getDate().toString().padStart(2, '0');
    
    // Get the count of orders today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const count = await prisma.order.count({
      where: {
        createdAt: {
          gte: today,
        },
      },
    });

    const orderNumber = `${prefix}${dateStr}${(count + 1).toString().padStart(4, '0')}`;
    return orderNumber;
  }

  /**
   * Get order details by ID
   */
  async getOrderById(orderId: string) {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
        payments: true,
      },
    });
  }

  /**
   * Get orders by customer email
   */
  async getOrdersByEmail(email: string) {
    return await prisma.order.findMany({
      where: { customerEmail: email },
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }
}

export const orderService = new OrderService();
