import { PrismaClient, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';


const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.$transaction([
    prisma.payment.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.stock.deleteMany(),
    prisma.variant.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  console.log('✅ Database cleared');

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Libros',
        slug: 'libros',
        description: 'Libros de diversos géneros y autores',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Librería',
        slug: 'libreria',
        description: 'Útiles escolares y de oficina',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Papelería',
        slug: 'papeleria',
        description: 'Productos de papelería y oficina',
      },
    }),
  ]);

  console.log('✅ Categories created');

  // Create products
  const products = await Promise.all([
    // Libros
    prisma.product.create({
      data: {
        name: 'Cien años de soledad',
        slug: 'cien-anos-de-soledad',
        description: 'Obra maestra del realismo mágico de Gabriel García Márquez',
        price: new Prisma.Decimal(25.99),
        categoryId: categories[0].id,
        images: ['/images/cien-anos-soledad.jpg'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Cuaderno Universitario',
        slug: 'cuaderno-universitario',
        description: 'Cuaderno universitario tapa dura, 200 hojas rayadas',
        price: new Prisma.Decimal(12.50),
        categoryId: categories[1].id,
        images: ['/images/cuaderno-universitario.jpg'],
      },
    }),
    prisma.product.create({
      data: {
        name: 'Juego de Escuadras',
        slug: 'juego-escuadras',
        description: 'Juego de escuadras de 45° y 60°',
        price: new Prisma.Decimal(8.75),
        categoryId: categories[2].id,
        images: ['/images/escuadras.jpg'],
      },
    }),
  ]);

  console.log('✅ Products created');

  // Create variants and stock
  const variants = await Promise.all([
    // Cien años de soledad - Tapa blanda
    prisma.variant.create({
      data: {
        name: 'Tapa blanda',
        sku: 'LIB-001-TB',
        productId: products[0].id,
        price: new Prisma.Decimal(25.99),
        stock: {
          create: {
            quantity: 10,
            location: 'Estante A1',
          },
        },
      },
    }),
    // Cien años de soledad - Tapa dura
    prisma.variant.create({
      data: {
        name: 'Tapa dura',
        sku: 'LIB-001-TD',
        productId: products[0].id,
        price: new Decimal(35.99),
        stock: {
          create: {
            quantity: 5,
            location: 'Estante A2',
          },
        },
      },
    }),
    // Cuaderno Universitario - A4
    prisma.variant.create({
      data: {
        name: 'A4',
        sku: 'CUAD-001-A4',
        productId: products[1].id,
        price: new Prisma.Decimal(12.50),
        stock: {
          create: {
            quantity: 50,
            location: 'Estante B1',
          },
        },
      },
    }),
    // Juego de Escuadras - Estándar
    prisma.variant.create({
      data: {
        name: 'Estándar',
        sku: 'ESC-001-STD',
        productId: products[2].id,
        price: new Prisma.Decimal(8.75),
        stock: {
          create: {
            quantity: 30,
            location: 'Estante C1',
          },
        },
      },
    }),
  ]);

  console.log('✅ Variants and stock created');

  console.log('\n🌱 Database seeded successfully!');
  console.log('\nSample data created:');
  console.log(`- ${categories.length} categories`);
  console.log(`- ${products.length} products`);
  console.log(`- ${variants.length} variants with stock`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export {};
