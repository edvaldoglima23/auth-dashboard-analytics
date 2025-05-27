import React from 'react';

function formatDateBR(dateStr) {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    if (!isNaN(date)) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return dateStr;
}

export default function SalesList({ sales, onDeleteSale }) {
    if (!sales.length) return <div style={{ color: '#888', marginBottom: 24, textAlign: 'left' }}>Nenhuma venda cadastrada.</div>;
    return (
        <table style={{ width: '100%', maxWidth: 900, margin: '0', borderCollapse: 'collapse', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', marginBottom: 24 }}>
            <thead>
                <tr style={{ background: '#f4f6f8' }}>
                    <th style={{ padding: 10, textAlign: 'left' }}>Produto</th>
                    <th style={{ padding: 10, textAlign: 'right' }}>Valor</th>
                    <th style={{ padding: 10, textAlign: 'center' }}>Data</th>
                    <th style={{ padding: 10 }}></th>
                </tr>
            </thead>
            <tbody>
                {sales.map(sale => (
                    <tr key={sale.id} className="card">
                        <td style={{ padding: 10, textAlign: 'left' }}>{sale.product}</td>
                        <td style={{ padding: 10, textAlign: 'right' }}>R$ {sale.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                        <td style={{ padding: 10, textAlign: 'center' }}>{formatDateBR(sale.date)}</td>
                        <td style={{ padding: 10, textAlign: 'center' }}>
                            <button onClick={() => onDeleteSale(sale.id)} style={{ background: '#e33', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', fontWeight: 600 }}>Remover</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
} 