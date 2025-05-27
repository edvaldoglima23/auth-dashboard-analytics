import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

export default function App() {
  const [auth, setAuth] = useState(isAuthenticated());

  return auth ? (
    <Dashboard onLogout={() => setAuth(false)} />
  ) : (
    <Login onLogin={() => setAuth(true)} />
  );
}
