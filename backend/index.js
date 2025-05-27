const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const sequelize = require('./src/config/database');
const { createDefaultAdmin } = require('./src/config/seeders');

dotenv.config();

const authRoutes = require('./src/routes/auth');
const salesRoutes = require('./src/routes/sales');
const productsRoutes = require('./src/routes/products');
const dashboardRoutes = require('./src/routes/dashboard');
const authenticateToken = require('./src/middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('API rodando com emoção! 🚀');
});

app.use('/api/auth', authRoutes);
app.use('/api/sales', authenticateToken, salesRoutes);
app.use('/api/products', authenticateToken, productsRoutes);
app.use('/api/dashboard', authenticateToken, dashboardRoutes);

const PORT = process.env.PORT || 3001;

// Inicializar banco de dados e criar usuário admin
async function initializeServer() {
  try {
    await sequelize.sync();
    console.log('Banco de dados sincronizado com sucesso!');
    
    await createDefaultAdmin();
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT} com emoção!`);
    });
  } catch (error) {
    console.error('Erro ao inicializar servidor:', error);
  }
}

initializeServer(); 