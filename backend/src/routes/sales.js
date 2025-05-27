const express = require('express');
const router = express.Router();
const { Sale, Product } = require('../models');
const { Op, Sequelize: sequelize } = require('sequelize');
const authenticateToken = require('../middleware/auth');

// Listar todas as vendas
router.get('/', authenticateToken, async (req, res) => {
  try {
    const sales = await Sale.findAll({
      include: [{
        model: Product,
        attributes: ['name', 'category']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(sales);
  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }
});

// Criar nova venda
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity, paymentMethod } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Estoque insuficiente' });
    }

    const sale = await Sale.create({
      productId,
      quantity,
      unitPrice: product.price,
      total: product.price * quantity,
      paymentMethod
    });

    await product.update({
      stock: product.stock - quantity
    });

    res.status(201).json(sale);
  } catch (error) {
    console.error('Erro ao criar venda:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Dados inválidos' });
    }
    res.status(500).json({ error: 'Erro ao criar venda' });
  }
});

// Cancelar venda
router.put('/:id/cancel', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByPk(id, {
      include: [Product]
    });

    if (!sale) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }

    if (sale.status === 'cancelled') {
      return res.status(400).json({ error: 'Venda já está cancelada' });
    }

    await sale.update({ status: 'cancelled' });
    
    // Retorna o produto ao estoque
    await sale.Product.update({
      stock: sale.Product.stock + sale.quantity
    });

    res.json(sale);
  } catch (error) {
    console.error('Erro ao cancelar venda:', error);
    res.status(500).json({ error: 'Erro ao cancelar venda' });
  }
});

module.exports = router; 