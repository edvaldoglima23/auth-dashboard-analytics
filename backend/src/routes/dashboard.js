const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { Product, Sale } = require('../models');
const { Op, Sequelize } = require('sequelize');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit-table');

router.get('/', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Métricas gerais
    const totalSales = await Sale.sum('total', {
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      }
    }) || 0;

    const averageSale = await Sale.findOne({
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('total')), 'average']
      ],
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      raw: true
    });

    const topProduct = await Sale.findOne({
      attributes: [
        'productId',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      include: [{
        model: Product,
        attributes: ['name']
      }],
      group: ['productId', 'Product.id', 'Product.name'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'DESC']],
      raw: true
    });

    const totalProducts = await Product.count();

    // Vendas por período
    const salesByPeriod = await Sale.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
      ],
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']],
      raw: true
    });

    // Vendas por categoria
    const salesByCategory = await Sale.findAll({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total']
      ],
      include: [{
        model: Product,
        attributes: ['category']
      }],
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      group: ['Product.category', 'Product.id'],
      raw: true
    });

    // Tendência de vendas por produto
    const productTrends = await Sale.findAll({
      attributes: [
        'productId',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      include: [{
        model: Product,
        attributes: ['name']
      }],
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      group: ['productId', 'Product.id', 'Product.name'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'DESC']],
      limit: 10,
      raw: true
    });

    res.json({
      metrics: {
        totalSales,
        averageSale: averageSale?.average || 0,
        topProduct: {
          name: topProduct?.['Product.name'] || 'Nenhum',
          quantity: parseInt(topProduct?.count || 0)
        },
        totalProducts
      },
      salesByPeriod: salesByPeriod.map(item => ({
        date: item.date,
        total: parseFloat(item.total || 0)
      })),
      salesByCategory: salesByCategory.map(item => ({
        category: item['Product.category'] || 'Sem categoria',
        total: parseFloat(item.total || 0)
      })),
      productTrends: productTrends.map(item => ({
        product: item['Product.name'],
        trend: parseInt(item.count)
      }))
    });
  } catch (error) {
    console.error('Erro ao buscar dados do dashboard:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
});

router.get('/export/excel', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sales = await Sale.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      include: [{
        model: Product,
        attributes: ['name', 'category']
      }],
      order: [['createdAt', 'DESC']]
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Relatório de Vendas');

    worksheet.columns = [
      { header: 'Data', key: 'date', width: 15 },
      { header: 'Produto', key: 'product', width: 30 },
      { header: 'Categoria', key: 'category', width: 20 },
      { header: 'Quantidade', key: 'quantity', width: 15 },
      { header: 'Valor Total', key: 'total', width: 15 }
    ];

    sales.forEach(sale => {
      worksheet.addRow({
        date: sale.createdAt.toLocaleDateString('pt-BR'),
        product: sale.Product.name,
        category: sale.Product.category,
        quantity: sale.quantity,
        total: sale.total
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=relatorio-vendas.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Erro ao gerar relatório Excel:', error);
    res.status(500).json({ error: 'Erro ao gerar relatório Excel' });
  }
});

router.get('/export/pdf', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const start = new Date(startDate);
    const end = new Date(endDate);

    const sales = await Sale.findAll({
      where: {
        createdAt: {
          [Op.between]: [start, end]
        }
      },
      include: [{
        model: Product,
        attributes: ['name', 'category']
      }],
      order: [['createdAt', 'DESC']]
    });

    const doc = new PDFDocument();
    doc.pipe(res);

    // Cabeçalho
    doc.fontSize(20).text('Relatório de Vendas', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Período: ${start.toLocaleDateString('pt-BR')} a ${end.toLocaleDateString('pt-BR')}`, { align: 'center' });
    doc.moveDown();

    // Tabela de vendas
    const table = {
      headers: ['Data', 'Produto', 'Categoria', 'Quantidade', 'Total'],
      rows: sales.map(sale => [
        sale.createdAt.toLocaleDateString('pt-BR'),
        sale.Product.name,
        sale.Product.category,
        sale.quantity.toString(),
        sale.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      ])
    };

    await doc.table(table, {
      prepareHeader: () => doc.font('Helvetica-Bold').fontSize(10),
      prepareRow: () => doc.font('Helvetica').fontSize(10)
    });

    // Rodapé
    doc.moveDown();
    const totalVendas = sales.reduce((sum, sale) => sum + sale.total, 0);
    doc.fontSize(12).text(`Total de Vendas: ${totalVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, { align: 'right' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio-vendas.pdf');

    doc.end();
  } catch (error) {
    console.error('Erro ao gerar relatório PDF:', error);
    res.status(500).json({ error: 'Erro ao gerar relatório PDF' });
  }
});

module.exports = router; 