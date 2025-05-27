import React from 'react';
import { Grid as MuiGrid } from '@mui/material';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const Grid = styled(MuiGrid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
}));

const GridItem = styled('div')(({ theme }) => ({
  flex: '1 1 270px',
  minWidth: 0,
}));

export default function DashboardKPIs({ metrics }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value / 100);
  };

  return (
    <Grid container>
      <GridItem>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Typography color="textSecondary" variant="subtitle2" gutterBottom>
            Vendas do Mês
          </Typography>
          <Typography component="p" variant="h4">
            {formatCurrency(metrics?.totalSales || 0)}
          </Typography>
          <Typography
            color={metrics?.salesGrowth >= 0 ? 'success.main' : 'error.main'}
            sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}
          >
            {formatPercentage(metrics?.salesGrowth || 0)} vs mês anterior
          </Typography>
        </Paper>
      </GridItem>

      <GridItem>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Typography color="textSecondary" variant="subtitle2" gutterBottom>
            Média de Vendas
          </Typography>
          <Typography component="p" variant="h4">
            {formatCurrency(metrics?.averageSale || 0)}
          </Typography>
          <Typography color="textSecondary" sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
            por venda
          </Typography>
        </Paper>
      </GridItem>

      <GridItem>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Typography color="textSecondary" variant="subtitle2" gutterBottom>
            Produto Mais Vendido
          </Typography>
          <Typography component="p" variant="h4" noWrap>
            {metrics?.topProduct?.name || '-'}
          </Typography>
          <Typography color="textSecondary" sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
            {metrics?.topProduct?.quantity || 0} unidades
          </Typography>
        </Paper>
      </GridItem>

      <GridItem>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 140,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Typography color="textSecondary" variant="subtitle2" gutterBottom>
            Total de Produtos
          </Typography>
          <Typography component="p" variant="h4">
            {metrics?.totalProducts || 0}
          </Typography>
          <Typography color="textSecondary" sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
            em catálogo
          </Typography>
        </Paper>
      </GridItem>
    </Grid>
  );
} 