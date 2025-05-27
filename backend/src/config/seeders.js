const bcrypt = require('bcrypt');
const { User } = require('../models');

async function createDefaultAdmin() {
  try {
    const adminExists = await User.findOne({
      where: { email: 'admin@example.com' }
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Usuário admin criado com sucesso!');
    } else {
      console.log('Usuário admin já existe.');
    }
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  }
}

module.exports = { createDefaultAdmin }; 