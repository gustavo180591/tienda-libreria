import { createClient } from 'redis';
import { env } from '$env/dynamic/private';

const REDIS_URL = env.REDIS_URL || 'redis://localhost:6379';
const RESERVATION_TTL = 15 * 60; // 15 minutes in seconds

class RedisClient {
  private client: ReturnType<typeof createClient>;
  private static instance: RedisClient;
  private isConnected = false;

  private constructor() {
    this.client = createClient({
      url: REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 5) {
            console.error('Max reconnection attempts reached. Giving up.');
            return new Error('Could not connect to Redis after multiple attempts');
          }
          return Math.min(retries * 100, 5000);
        },
      },
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));
  }

  public static getInstance(): RedisClient {
    if (!RedisClient.instance) {
      RedisClient.instance = new RedisClient();
    }
    return RedisClient.instance;
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
      console.log('🚀 Connected to Redis');
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
      console.log('🔌 Disconnected from Redis');
    }
  }

  private getReservationKey(variantId: string, orderId: string): string {
    return `reservation:${variantId}:${orderId}`;
  }

  public async reserveStock(variantId: string, orderId: string, quantity: number): Promise<boolean> {
    const key = this.getReservationKey(variantId, orderId);
    try {
      const result = await this.client.set(key, quantity.toString(), {
        NX: true,
        EX: RESERVATION_TTL,
      });
      return result === 'OK';
    } catch (error) {
      console.error('Error reserving stock:', error);
      return false;
    }
  }

  public async releaseReservation(variantId: string, orderId: string): Promise<void> {
    const key = this.getReservationKey(variantId, orderId);
    await this.client.del(key);
  }

  public async getReservation(variantId: string, orderId: string): Promise<number | null> {
    const key = this.getReservationKey(variantId, orderId);
    const result = await this.client.get(key);
    return result ? parseInt(result, 10) : null;
  }

  public async getReservedQuantity(variantId: string): Promise<number> {
    const pattern = `reservation:${variantId}:*`;
    const keys = await this.client.keys(pattern);
    
    if (keys.length === 0) return 0;
    
    const values = await Promise.all(keys.map(key => this.client.get(key)));
    return values.reduce((sum, value) => sum + (value ? parseInt(value, 10) : 0), 0);
  }
}

export const redis = RedisClient.getInstance();

// Handle application shutdown
process.on('SIGINT', async () => {
  await redis.disconnect();
  process.exit(0);
});

export default redis;
