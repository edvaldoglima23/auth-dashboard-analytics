const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const authRoutes = require('./routes/auth');
const salesRoutes = require('./routes/sales');
const { authenticateToken } = require('./middlewares/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('API rodando com emoção! 🚀');
});

app.use('/api/auth', authRoutes);
app.use('/api/sales', authenticateToken, salesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} com emoção!`);
}); 