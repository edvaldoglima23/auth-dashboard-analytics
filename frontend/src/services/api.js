const API_URL = 'http://localhost:3001/api';

function getToken() {
  const token = localStorage.getItem('token');
  console.log('Token atual:', token); // Debug
  return token;
}

export async function login(email, password) {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    console.log('Login response:', data); // Debug
    return data;
  } catch (err) {
    console.error('Erro no login:', err);
    throw err;
  }
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

export async function getProducts() {
  const token = getToken();
  if (!token) {
    console.error('Token não encontrado');
    throw new Error('Não autorizado');
  }

  try {
    const res = await fetch(`${API_URL}/products`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('Status da resposta:', res.status); // Debug
    const data = await res.json();
    console.log('Produtos recebidos:', data); // Debug
    return data;
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    throw err;
  }
}

export async function createProduct(product) {
  const token = getToken();
  if (!token) throw new Error('Não autorizado');

  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });
  return res.json();
}

export async function deleteProduct(id) {
  const token = getToken();
  if (!token) throw new Error('Não autorizado');

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

export async function updateProduct(id, product) {
  const token = getToken();
  if (!token) throw new Error('Não autorizado');

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });
  return res.json();
} 