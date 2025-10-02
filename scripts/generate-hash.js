const bcrypt = require('bcryptjs');

async function generateHash() {
  const password = 'Admin123!'; // Cambia esto por tu contraseña
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Password:', password);
  console.log('Hash:', hash);
}

generateHash().catch(console.error);
