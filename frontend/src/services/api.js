import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('token');
        window.location = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getProducts = async () => {
  const response = await api.get('/api/products');
  return response.data;
};

export const createProduct = async (product) => {
  const response = await api.post('/api/products', product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await api.put(`/api/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/api/products/${id}`);
};

export const getSales = async () => {
  const response = await api.get('/api/sales');
  return response.data;
};

export const createSale = async (sale) => {
  const response = await api.post('/api/sales', sale);
  return response.data;
};

export const cancelSale = async (id) => {
  const response = await api.put(`/api/sales/${id}/cancel`);
  return response.data;
};

export const getDashboardData = async (startDate, endDate) => {
  const response = await api.get('/api/dashboard', {
    params: { startDate, endDate }
  });
  return response.data;
};

export const exportToExcel = async (startDate, endDate) => {
  const response = await api.get('/api/dashboard/export/excel', {
    params: { startDate, endDate },
    responseType: 'blob'
  });
  return response.data;
};

export const exportToPDF = async (startDate, endDate) => {
  const response = await api.get('/api/dashboard/export/pdf', {
    params: { startDate, endDate },
    responseType: 'blob'
  });
  return response.data;
};

export default api; 