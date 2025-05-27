import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProductsPage from './components/ProductsPage';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  console.log('Token de autenticação:', token ? 'Presente' : 'Ausente');
  return !!token;
}

export default function App() {
  console.log('Renderizando App'); // Debug inicial
  const [auth, setAuth] = useState(isAuthenticated());
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Efeito para verificar autenticação
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      if (!isAuth) {
        setAuth(false);
      }
    };
    checkAuth();
  }, []); // Sem dependências, roda apenas na montagem

  // Efeito para logging
  useEffect(() => {
    console.log('Estado atual:', { auth, currentPage });
  }, [auth, currentPage]);

  const handleLogin = () => {
    console.log('Login realizado');
    setAuth(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    console.log('Logout realizado');
    localStorage.removeItem('token');
    setAuth(false);
  };

  if (!auth) {
    console.log('Usuário não autenticado, mostrando login');
    return <Login onLogin={handleLogin} />;
  }

  console.log('Renderizando página:', currentPage);

  return (
    <div className="app">
      <nav className="header">
        <button 
          className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => {
            console.log('Clique no Dashboard'); // Debug de clique
            setCurrentPage('dashboard');
          }}
        >
          Dashboard
        </button>
        <button 
          className={`nav-button ${currentPage === 'products' ? 'active' : ''}`}
          onClick={() => {
            console.log('Clique em Produtos'); // Debug de clique
            setCurrentPage('products');
          }}
        >
          Produtos
        </button>
        <button 
          className="nav-button"
          onClick={handleLogout}
          style={{ marginLeft: 'auto' }}
        >
          Sair
        </button>
      </nav>

      <main className="container">
        {console.log('Renderizando conteúdo, página atual:', currentPage)} {/* Debug de renderização */}
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'products' && <ProductsPage />}
      </main>
    </div>
  );
}
