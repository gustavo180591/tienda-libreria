import { prisma } from '$lib/server/db';
import { redis } from '$lib/server/redis';

export class StockService {
  /**
   * Check if there's enough stock available for a variant
   * @param variantId The variant ID to check
   * @param quantity The quantity to check against
   * @returns Boolean indicating if stock is available
   */
  async isStockAvailable(variantId: string, quantity: number): Promise<boolean> {
    // Get current stock from database
    const stock = await prisma.stock.findFirst({
      where: { variantId },
      select: { quantity: true },
    });

    if (!stock) return false;

    // Get reserved stock from Redis
    const reservedQuantity = await redis.getReservedQuantity(variantId);
    
    // Available stock = total stock - reserved stock
    const availableStock = stock.quantity - reservedQuantity;
    
    return availableStock >= quantity;
  }

  /**
   * Reserve stock for a specific order
   * @param variantId The variant ID to reserve
   * @param orderId The order ID for the reservation
   * @param quantity The quantity to reserve
   * @returns Boolean indicating if the reservation was successful
   */
  async reserveStock(variantId: string, orderId: string, quantity: number): Promise<boolean> {
    // First check if we have enough stock
    const isAvailable = await this.isStockAvailable(variantId, quantity);
    if (!isAvailable) return false;

    // Try to reserve in Redis
    const reserved = await redis.reserveStock(variantId, orderId, quantity);
    return reserved;
  }

  /**
   * Release reserved stock (when order is cancelled or expires)
   * @param variantId The variant ID
   * @param orderId The order ID that reserved the stock
   */
  async releaseStock(variantId: string, orderId: string): Promise<void> {
    await redis.releaseReservation(variantId, orderId);
  }

  /**
   * Update stock after order is confirmed
   * @param variantId The variant ID
   * @param quantity The quantity to deduct from stock
   * @param orderId The order ID that's being confirmed
   */
  async confirmStockDeduction(variantId: string, quantity: number, orderId: string): Promise<boolean> {
    // Start a transaction to ensure data consistency
    return await prisma.$transaction(async (tx) => {
      // 1. Get current stock with row-level locking
      const stock = await tx.stock.findFirst({
        where: { variantId },
        select: { id: true, quantity: true },
        // Lock the row to prevent concurrent updates
        ...(tx.$queryRaw`FOR UPDATE` as any),
      });

      if (!stock || stock.quantity < quantity) {
        return false; // Not enough stock
      }

      // 2. Update the stock
      await tx.stock.update({
        where: { id: stock.id },
        data: { quantity: { decrement: quantity } },
      });

      // 3. Release the reservation
      await this.releaseStock(variantId, orderId);

      return true;
    });
  }

  /**
   * Get available stock for a variant (total - reserved)
   * @param variantId The variant ID
   * @returns Available quantity
   */
  async getAvailableStock(variantId: string): Promise<number> {
    const stock = await prisma.stock.findFirst({
      where: { variantId },
      select: { quantity: true },
    });

    if (!stock) return 0;

    const reservedQuantity = await redis.getReservedQuantity(variantId);
    return Math.max(0, stock.quantity - reservedQuantity);
  }
}

export const stockService = new StockService();
