import React, { useState } from 'react';
import { updateProduct } from '../services/api';

export default function ProductsList({ products, onDeleteProduct, onProductUpdated }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const startEdit = (product) => {
    setEditId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName('');
    setEditPrice('');
  };

  const saveEdit = async () => {
    setLoading(true);
    try {
      await updateProduct(editId, {
        name: editName,
        price: parseFloat(editPrice.replace(/\./g, '').replace(',', '.'))
      });
      setEditId(null);
      setEditName('');
      setEditPrice('');
      onProductUpdated();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
    setLoading(false);
  };

  if (!products.length) {
    return <div className="error-message">Nenhum produto cadastrado.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          <tr key={product.id}>
            <td>
              {editId === product.id ? (
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  style={{ width: '100%' }}
                />
              ) : (
                product.name
              )}
            </td>
            <td>
              {editId === product.id ? (
                <input
                  type="text"
                  value={editPrice}
                  onChange={e => setEditPrice(e.target.value.replace(/[^0-9.,]/g, ''))}
                  style={{ width: '120px' }}
                />
              ) : (
                `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
              )}
            </td>
            <td>
              {editId === product.id ? (
                <div className="form-group">
                  <button onClick={saveEdit} disabled={loading}>
                    {loading ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button onClick={cancelEdit} disabled={loading}>
                    Cancelar
                  </button>
                </div>
              ) : (
                <div className="form-group">
                  <button onClick={() => startEdit(product)}>
                    Editar
                  </button>
                  <button 
                    onClick={() => onDeleteProduct(product.id)}
                    className="danger-button"
                  >
                    Remover
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
} 