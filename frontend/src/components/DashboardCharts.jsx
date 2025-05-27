import React from 'react';
import { Grid as MuiGrid } from '@mui/material';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

const Grid = styled(MuiGrid)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(3),
  marginTop: theme.spacing(2)
}));

const GridItem = styled('div')({
  '&.full-width': {
    flex: '1 1 100%',
  },
  '&.chart-large': {
    flex: '1 1 66.666%',
  },
  '&.chart-small': {
    flex: '1 1 33.333%',
  }
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function DashboardCharts({ salesData, categoryData, productTrends }) {
  const salesChartData = {
    labels: salesData?.labels || [],
    datasets: [
      {
        label: 'Vendas',
        data: salesData?.values || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1
      }
    ]
  };

  const salesChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Vendas por Período'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            return new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(value);
          }
        }
      }
    }
  };

  const categoryChartData = {
    labels: categoryData?.labels || [],
    datasets: [
      {
        label: 'Vendas por Categoria',
        data: categoryData?.values || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const trendsChartData = {
    labels: productTrends?.labels || [],
    datasets: [
      {
        label: 'Tendência de Vendas',
        data: productTrends?.values || [],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1
      }
    ]
  };

  const trendsChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tendência de Vendas por Produto'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Grid container>
      <GridItem className="chart-large">
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Line options={salesChartOptions} data={salesChartData} />
        </Paper>
      </GridItem>

      <GridItem className="chart-small">
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Pie data={categoryChartData} />
        </Paper>
      </GridItem>

      <GridItem className="full-width">
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 400,
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          <Bar options={trendsChartOptions} data={trendsChartData} />
        </Paper>
      </GridItem>
    </Grid>
  );
} 