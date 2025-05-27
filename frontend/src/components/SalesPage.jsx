import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../services/api';

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSale, setNewSale] = useState({
    productId: '',
    quantity: 1,
    paymentMethod: 'credit_card'
  });

  const fetchSales = async () => {
    try {
      const response = await api.get('/api/sales');
      setSales(response.data);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
      setError('Não foi possível carregar as vendas');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setError('Não foi possível carregar os produtos');
    }
  };

  useEffect(() => {
    Promise.all([fetchSales(), fetchProducts()])
      .finally(() => setLoading(false));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSale(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/api/sales', newSale);
      setNewSale({
        productId: '',
        quantity: 1,
        paymentMethod: 'credit_card'
      });
      fetchSales();
    } catch (error) {
      console.error('Erro ao criar venda:', error);
      setError('Não foi possível criar a venda');
    }
  };

  const handleCancelSale = async (id) => {
    try {
      await api.put(`/api/sales/${id}/cancel`);
      fetchSales();
    } catch (error) {
      console.error('Erro ao cancelar venda:', error);
      setError('Não foi possível cancelar a venda');
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Vendas
      </Typography>

      {error && (
        <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.light', color: 'error.contrastText' }}>
          <Typography>{error}</Typography>
        </Paper>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Nova Venda
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Produto</InputLabel>
                <Select
                  name="productId"
                  value={newSale.productId}
                  onChange={handleInputChange}
                  required
                >
                  {products.map(product => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} - R$ {product.price}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Quantidade"
                type="number"
                name="quantity"
                value={newSale.quantity}
                onChange={handleInputChange}
                required
                inputProps={{ min: 1 }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
                <InputLabel>Forma de Pagamento</InputLabel>
                <Select
                  name="paymentMethod"
                  value={newSale.paymentMethod}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="credit_card">Cartão de Crédito</MenuItem>
                  <MenuItem value="debit_card">Cartão de Débito</MenuItem>
                  <MenuItem value="cash">Dinheiro</MenuItem>
                  <MenuItem value="pix">PIX</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Registrar Venda
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Histórico de Vendas
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Total</th>
                <th>Pagamento</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sales.map(sale => (
                <tr key={sale.id}>
                  <td>{new Date(sale.createdAt).toLocaleDateString('pt-BR')}</td>
                  <td>{sale.Product.name}</td>
                  <td>{sale.quantity}</td>
                  <td>
                    {sale.unitPrice.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                  <td>
                    {sale.total.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </td>
                  <td>
                    {sale.paymentMethod === 'credit_card' && 'Cartão de Crédito'}
                    {sale.paymentMethod === 'debit_card' && 'Cartão de Débito'}
                    {sale.paymentMethod === 'cash' && 'Dinheiro'}
                    {sale.paymentMethod === 'pix' && 'PIX'}
                  </td>
                  <td>
                    <span className={sale.status === 'completed' ? 'success-message' : 'error-message'}>
                      {sale.status === 'completed' ? 'Concluída' : 'Cancelada'}
                    </span>
                  </td>
                  <td>
                    {sale.status === 'completed' && (
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancelSale(sale.id)}
                      >
                        Cancelar
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>
    </Container>
  );
} 