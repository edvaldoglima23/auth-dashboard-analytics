const express = require('express');
const router = express.Router();
const { Product } = require('../models');
const { Op, Sequelize: sequelize } = require('sequelize');
const authenticateToken = require('../middleware/auth');

// Listar todos os produtos
router.get('/', authenticateToken, async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// Criar novo produto
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Dados inválidos' });
    }
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Atualizar produto
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, status } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.update({
      name,
      description,
      price,
      category,
      stock,
      status
    });

    res.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Dados inválidos' });
    }
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Excluir produto
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro ao excluir produto' });
  }
});

module.exports = router; 