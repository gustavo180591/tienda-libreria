// @ts-check
import { PrismaClient } from '@prisma/client';

// Simple logger with TypeScript types
const logger = {
  /** @param {string} message */
  info: (message) => console.log(`[${new Date().toISOString()}] INFO: ${message}`),
  
  /**
   * @param {string} message
   * @param {unknown} [error]
   */
  error: (message, error) => {
    console.error(`[${new Date().toISOString()}] ERROR: ${message}`);
    if (error) {
      console.error(error);
    }
  }
};

const prisma = new PrismaClient();

// Graceful shutdown handler
const shutdown = async () => {
  logger.info('Worker shutting down...');
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

// Main worker function
const main = async () => {
  try {
    logger.info('Worker started');
    
    // Example: Process pending orders
    const pendingOrders = await prisma.order.findMany({
      where: { status: 'PENDING' },
      take: 10
    });
    
    logger.info(`Found ${pendingOrders.length} pending orders`);
    
    // Add your background task logic here
    
  } catch (error) {
    logger.error('Worker error:', error);
  } finally {
    // Schedule next run after a delay (e.g., every 30 seconds)
    setTimeout(main, 30000);
  }
};

// Start the worker
main().catch((error) => {
  logger.error('Unhandled worker error:', error);
  process.exit(1);
});
