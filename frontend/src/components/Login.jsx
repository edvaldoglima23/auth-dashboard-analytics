import React, { useState } from 'react';
import { login } from '../services/api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Escolha um dos temas: 'default', 'dark', 'gradient', 'clean'
  const theme = 'gradient';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await login(email, password);
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        onLogin();
      } else {
        setError(response.error || 'Erro ao fazer login');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Email ou senha inválidos. Tente novamente.');
    }
    
    setLoading(false);
  };

  return (
    <div className={`login-container ${theme}`}>
      <div className={`login-card ${theme}`}>
        <h1 className={`login-title ${theme}`}>Dashboard Corporativo</h1>
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className={`input-group ${theme}`}>
            <label htmlFor="email">Email</label>
            <div className="icon-input">
              <i className="fas fa-envelope"></i>
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="Seu email corporativo"
              />
            </div>
          </div>
          
          <div className={`input-group ${theme}`}>
            <label htmlFor="password">Senha</label>
            <div className="icon-input">
              <i className="fas fa-lock"></i>
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="Sua senha"
              />
            </div>
          </div>

          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Lembrar-me</label>
          </div>
          
          <div className="forgot-password">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Esqueceu sua senha?
            </a>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            className={`login-button ${theme}`}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="divider">
            <span>ou continue com</span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button 
              type="button" 
              className="social-button"
              onClick={() => alert('Em breve!')}
              style={{ background: '#db4437' }}
            >
              Google
            </button>
            <button 
              type="button" 
              className="social-button"
              onClick={() => alert('Em breve!')}
              style={{ background: '#4267B2' }}
            >
              Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 