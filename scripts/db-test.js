// Simple script to test database connection
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function main() {
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Get categories count
    const categories = await prisma.category.findMany();
    console.log(`\n📚 Found ${categories.length} categories`);
    
    // Get products count
    const products = await prisma.product.findMany({
      include: {
        category: true,
        variants: {
          include: {
            stock: true
          }
        }
      }
    });
    
    console.log(`\n🛍️  Found ${products.length} products:`);
    products.forEach(product => {
      console.log(`\n  - ${product.name} (${product.category.name})`);
      product.variants.forEach(variant => {
        console.log(`    • ${variant.name}: ${variant.stock[0]?.quantity || 0} in stock`);
      });
    });
    
  } catch (error) {
    console.error('❌ Error testing database connection:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
