import { prisma, connectDB } from '../src/lib/server/db.js';

async function testConnection() {
  try {
    // Test connection
    await connectDB();
    
    // Test query: Get all categories with their products
    const categories = await prisma.category.findMany({
      include: {
        products: {
          include: {
            variants: {
              include: {
                stock: true
              }
            }
          }
        }
      }
    });

    console.log('\n📊 Database Test Results:');
    console.log('✅ Database connection successful!');
    console.log(`\n📚 Found ${categories.length} categories:`);
    
    categories.forEach(category => {
      console.log(`\n📁 ${category.name} (${category.products.length} products):`);
      
      category.products.forEach(product => {
        console.log(`  - ${product.name} (${product.variants.length} variants)`);
        
        product.variants.forEach(variant => {
          console.log(`    • ${variant.name} - Stock: ${variant.stock[0]?.quantity || 0} (${variant.stock[0]?.location || 'N/A'})`);
        });
      });
    });
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

testConnection();
