const API_URL = 'http://localhost:3001/api';

function getToken() {
  return localStorage.getItem('token');
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function getSales() {
  const res = await fetch(`${API_URL}/sales`, {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  });
  return res.json();
}

export async function createSale(sale) {
  const res = await fetch(`${API_URL}/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getToken()
    },
    body: JSON.stringify(sale)
  });
  return res.json();
}

export async function getMetrics() {
  const res = await fetch(`${API_URL}/sales/metrics`, {
    headers: { 'Authorization': 'Bearer ' + getToken() }
  });
  return res.json();
}

export function logout() {
  localStorage.removeItem('token');
} 