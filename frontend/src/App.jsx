import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductsPage from './components/ProductsPage';
import SalesPage from './components/SalesPage';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ptBR from 'date-fns/locale/pt-BR';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <div style={{ minHeight: '100vh', background: '#f4f6f8' }}>
        <div className="header">
          <div className="header-title">Dashboard Corporativo</div>
          <div className="header-nav">
            <button
              className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => handlePageChange('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`nav-button ${currentPage === 'products' ? 'active' : ''}`}
              onClick={() => handlePageChange('products')}
            >
              Produtos
            </button>
            <button
              className={`nav-button ${currentPage === 'sales' ? 'active' : ''}`}
              onClick={() => handlePageChange('sales')}
            >
              Vendas
            </button>
            <button className="nav-button" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: '90px auto 0 auto', padding: '0 32px' }}>
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'products' && <ProductsPage />}
          {currentPage === 'sales' && <SalesPage />}
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default App;
