import React from 'react';

export default function Metrics({ totalVendas, valorTotal }) {
  return (
    <div style={{ display: 'flex', gap: 24, marginBottom: 24, alignItems: 'flex-start', justifyContent: 'flex-start' }}>
      <div className="card" style={{ minWidth: 180, textAlign: 'left' }}>
        <div style={{ fontSize: 14, color: '#888' }}>Total de Vendas</div>
        <div style={{ fontSize: 28, fontWeight: 'bold' }}>{totalVendas ?? 0}</div>
      </div>
      <div className="card" style={{ minWidth: 180, textAlign: 'left' }}>
        <div style={{ fontSize: 14, color: '#888' }}>Valor Total</div>
        <div style={{ fontSize: 28, fontWeight: 'bold' }}>
          R$ {(valorTotal ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </div>
      </div>
    </div>
  );
} 