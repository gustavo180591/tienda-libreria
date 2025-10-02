import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { orderService } from '$lib/server/services/order.service';

interface CheckoutRequest {
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

export const POST: RequestHandler = async ({ request }) => {
  const data: CheckoutRequest = await request.json();
  
  try {
    const { order, requiresPayment } = await orderService.createOrder({
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      shippingMethod: data.shippingMethod,
      shippingAddress: data.shippingAddress,
      paymentMethod: data.paymentMethod,
      items: data.items,
    });

    // If payment is required (not cash on delivery), prepare payment
    if (requiresPayment) {
      // Here you would integrate with a payment provider like MercadoPago
      // For now, we'll just return the order with a payment URL
      return json({
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        requiresPayment: true,
        paymentUrl: `/checkout/payment/${order.id}`, // This would be replaced with actual payment URL
      });
    }

    // For cash on delivery, just return the order
    return json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      requiresPayment: false,
    });
  } catch (err: unknown) {
    console.error('Checkout error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Error processing your order';
    throw error(400, {
      message: errorMessage,
    });
  }
};
