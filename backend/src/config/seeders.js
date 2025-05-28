const bcrypt = require('bcrypt');
const { User } = require('../models');

async function createDefaultAdmin() {
  try {
    const email = 'admin@example.com';
    const password = 'Admin@2024!';
    const hashedPassword = await bcrypt.hash(password, 10);

    let admin = await User.findOne({ where: { email } });
    if (!admin) {
      await User.create({
        email,
        password: hashedPassword,
        role: 'admin'
      });
      console.log('Usuário admin criado com sucesso!');
    } else {
      // Atualiza a senha caso já exista
      admin.password = hashedPassword;
      admin.role = 'admin';
      await admin.save();
      console.log('Senha do usuário admin atualizada com sucesso!');
    }
  } catch (error) {
    console.error('Erro ao criar/atualizar usuário admin:', error);
  }
}

module.exports = { createDefaultAdmin }; 