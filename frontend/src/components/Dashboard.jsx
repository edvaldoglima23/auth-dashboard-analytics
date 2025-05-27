import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';
import DashboardKPIs from './DashboardKPIs';
import DashboardCharts from './DashboardCharts';
import api from '../services/api';

export default function Dashboard() {
  const [startDate, setStartDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [metrics, setMetrics] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [productTrends, setProductTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get('/api/dashboard', {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });

      const { 
        metrics: metricsData,
        salesByPeriod,
        salesByCategory,
        productTrends: trendsData
      } = response.data;

      setMetrics(metricsData);
      setSalesData({
        labels: salesByPeriod.map(item => new Date(item.date).toLocaleDateString('pt-BR')),
        values: salesByPeriod.map(item => item.total)
      });
      setCategoryData({
        labels: salesByCategory.map(item => item.category),
        values: salesByCategory.map(item => item.total)
      });
      setProductTrends({
        labels: trendsData.map(item => item.product),
        values: trendsData.map(item => item.trend)
      });
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
      setError('Não foi possível carregar os dados do dashboard. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [startDate, endDate]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        
        <Paper sx={{ p: 2, display: 'flex', gap: 2, mb: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data Inicial"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              format="dd/MM/yyyy"
            />
            <DatePicker
              label="Data Final"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              format="dd/MM/yyyy"
            />
          </LocalizationProvider>
        </Paper>

        {error && (
          <Paper sx={{ p: 2, mb: 3, bgcolor: 'error.light', color: 'error.contrastText' }}>
            <Typography>{error}</Typography>
          </Paper>
        )}

        {loading ? (
          <Typography>Carregando dados...</Typography>
        ) : (
          <>
            <DashboardKPIs metrics={metrics} />
            <DashboardCharts
              salesData={salesData}
              categoryData={categoryData}
              productTrends={productTrends}
            />
          </>
        )}
      </Box>
    </Container>
  );
} 