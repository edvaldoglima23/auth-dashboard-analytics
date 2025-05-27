import React, { useEffect, useState } from 'react';
import { getSales, createSale, getMetrics, logout } from '../services/api';
import Metrics from './Metrics';
import SaleForm from './SaleForm';
import SalesList from './SalesList';

export default function Dashboard({ onLogout }) {
  const [sales, setSales] = useState([]);
  const [metrics, setMetrics] = useState({ totalVendas: 0, valorTotal: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [salesData, metricsData] = await Promise.all([
      getSales(),
      getMetrics()
    ]);
    setSales(salesData);
    setMetrics(metricsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddSale = async (sale) => {
    await createSale(sale);
    fetchData();
  };

  const handleDeleteSale = async (id) => {
    await fetch(`http://localhost:3001/api/sales/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    });
    fetchData();
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f6f8',
    }}>
      <div className="header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10 }}>
        <span>Dashboard Corporativo</span>
        <span style={{ fontSize: 16, fontWeight: 400, marginLeft: 16 }}>Usuário | <button onClick={handleLogout} style={{ background: 'transparent', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Sair</button></span>
      </div>
      <div style={{
        maxWidth: 1000,
        margin: '90px auto 0 auto',
        padding: 32,
        background: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}>
        {loading ? (
          <div>Carregando...</div>
        ) : (
          <>
            <div style={{ width: '100%' }}>
              <Metrics totalVendas={metrics.totalVendas} valorTotal={metrics.valorTotal} />
            </div>
            <div style={{ width: '100%', marginBottom: 24 }}>
              <SaleForm onAddSale={handleAddSale} />
            </div>
            <div style={{ width: '100%' }}>
              <SalesList sales={sales} onDeleteSale={handleDeleteSale} />
            </div>
          </>
        )}
      </div>
    </div>
  );
} 