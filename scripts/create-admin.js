const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminUser() {
  const email = 'admin@libreria.com';
  const password = 'Admin123!'; // Cambia esto por una contraseña segura
  
  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log(`El usuario con email ${email} ya existe`);
      return;
    }

    // Crear el hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear el usuario administrador
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: 'ADMIN'
      }
    });

    console.log('Usuario administrador creado exitosamente:');
    console.log(`Email: ${email}`);
    console.log(`Contraseña: ${password}`);
    console.log('\n¡Importante! Por favor, cambia esta contraseña después del primer inicio de sesión.');
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();
