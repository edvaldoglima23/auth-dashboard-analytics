const db = require('../models/db');

exports.getAll = async (req, res) => {
  try {
    const sales = await db.all('SELECT * FROM sales WHERE userId = ?', [req.user.userId]);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar vendas.' });
  }
};

exports.create = async (req, res) => {
  const { product, amount, date } = req.body;
  if (!product || !amount || !date) return res.status(400).json({ error: 'Campos obrigatórios.' });
  try {
    await db.run('INSERT INTO sales (product, amount, date, userId) VALUES (?, ?, ?, ?)', [product, amount, date, req.user.userId]);
    res.status(201).json({ message: 'Venda criada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar venda.' });
  }
};

exports.update = async (req, res) => {
  const { product, amount, date } = req.body;
  const { id } = req.params;
  try {
    await db.run('UPDATE sales SET product = ?, amount = ?, date = ? WHERE id = ? AND userId = ?', [product, amount, date, id, req.user.userId]);
    res.json({ message: 'Venda atualizada com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar venda.' });
  }
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    await db.run('DELETE FROM sales WHERE id = ? AND userId = ?', [id, req.user.userId]);
    res.json({ message: 'Venda removida com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover venda.' });
  }
};

exports.metrics = async (req, res) => {
  try {
    const sales = await db.all('SELECT amount FROM sales WHERE userId = ?', [req.user.userId]);
    const totalVendas = sales.length;
    const valorTotal = sales.reduce((acc, s) => acc + s.amount, 0);
    res.json({ totalVendas, valorTotal });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao calcular métricas.' });
  }
}; 