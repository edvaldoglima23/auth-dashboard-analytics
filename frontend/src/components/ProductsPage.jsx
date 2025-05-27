import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, deleteProduct } from '../services/api';
import ProductsList from './ProductsList';

export default function ProductsPage() {
  console.log('Renderizando ProductsPage'); // Debug

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    console.log('Buscando produtos...'); // Debug
    try {
      const data = await getProducts();
      console.log('Produtos recebidos:', data); // Debug
      setProducts(data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      setError('Erro ao carregar produtos. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createProduct({
        name,
        price: parseFloat(price.replace(/\./g, '').replace(',', '.'))
      });
      setName('');
      setPrice('');
      fetchProducts();
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      setError('Erro ao criar produto. Tente novamente.');
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      setError('Erro ao remover produto. Tente novamente.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>Gerenciar Produtos</h2>
      
      <div className="form-group" style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ flex: 2 }}
        />
        <input
          type="text"
          placeholder="Preço"
          value={price}
          onChange={e => setPrice(e.target.value.replace(/[^0-9.,]/g, ''))}
          required
          style={{ flex: 1 }}
        />
        <button 
          type="button" 
          onClick={handleAddProduct} 
          disabled={loading}
          style={{ minWidth: '120px' }}
        >
          {loading ? 'Adicionando...' : 'Adicionar'}
        </button>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <ProductsList
        products={products}
        onDeleteProduct={handleDeleteProduct}
        onProductUpdated={fetchProducts}
      />
    </div>
  );
} 