const sequelize = require('./database');
const Product = require('../models/Product');
const Sale = require('../models/Sale');
const User = require('../models/User');
const bcrypt = require('bcrypt');

async function initDb() {
  try {
    // Sincroniza os modelos com o banco de dados
    await sequelize.sync({ force: true });

    // Cria usuário admin
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });

    // Cria alguns produtos
    const products = await Product.bulkCreate([
      {
        name: 'Smartphone XYZ',
        description: 'Smartphone de última geração',
        price: 1999.99,
        category: 'eletrônicos',
        stock: 50
      },
      {
        name: 'Notebook ABC',
        description: 'Notebook para trabalho e estudo',
        price: 3499.99,
        category: 'eletrônicos',
        stock: 30
      },
      {
        name: 'Camiseta Casual',
        description: 'Camiseta 100% algodão',
        price: 49.99,
        category: 'roupas',
        stock: 100
      },
      {
        name: 'Refrigerante Cola',
        description: 'Refrigerante sabor cola 2L',
        price: 8.99,
        category: 'bebidas',
        stock: 200
      },
      {
        name: 'Chocolate Premium',
        description: 'Chocolate 70% cacau',
        price: 12.99,
        category: 'alimentos',
        stock: 150
      }
    ]);

    // Cria algumas vendas
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    const sales = [];
    for (let i = 0; i < 50; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const date = new Date(
        lastMonth.getTime() + Math.random() * (today.getTime() - lastMonth.getTime())
      );

      sales.push({
        productId: product.id,
        quantity: quantity,
        unitPrice: product.price,
        total: quantity * product.price,
        paymentMethod: ['credit_card', 'debit_card', 'cash', 'pix'][Math.floor(Math.random() * 4)],
        createdAt: date,
        updatedAt: date
      });
    }

    await Sale.bulkCreate(sales);

    console.log('Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error);
  }
}

module.exports = initDb; 