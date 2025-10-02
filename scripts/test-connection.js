import { prisma } from '../src/lib/server/db.js';

async function testConnection() {
  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful!');
    
    // Simple query to get categories count
    const categories = await prisma.category.findMany();
    console.log(`\n📚 Found ${categories.length} categories`);
    
    // Simple query to get products count
    const products = await prisma.product.findMany();
    console.log(`🛍️  Found ${products.length} products`);
    
    // Simple query to get variants count
    const variants = await prisma.variant.findMany({
      include: {
        stock: true
      }
    });
    console.log(`📦 Found ${variants.length} variants with stock`);
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
