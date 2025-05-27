const db = require('../models/db');

exports.getAll = async (req, res) => {
  try {
    const products = await db.all('SELECT * FROM products');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
};

exports.create = async (req, res) => {
  const { name, price } = req.body;
  if (!name || price == null) return res.status(400).json({ error: 'Campos obrigatórios.' });
  try {
    await db.run('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    res.status(201).json({ message: 'Produto criado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar produto.' });
  }
};

exports.update = async (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;
  try {
    await db.run('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
    res.json({ message: 'Produto atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar produto.' });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Produto removido com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover produto.' });
  }
}; 