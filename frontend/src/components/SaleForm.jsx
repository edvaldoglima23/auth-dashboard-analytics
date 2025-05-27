import React, { useState } from 'react';

function formatMoney(value) {
    const onlyNums = value.replace(/\D/g, '');
    if (!onlyNums) return '';
    const cents = parseFloat(onlyNums) / 100;
    return cents.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SaleForm({ onAddSale }) {
    const [product, setProduct] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (!product || !amount || !date) {
            setError('Preencha todos os campos');
            setLoading(false);
            return;
        }
        const valorNumerico = parseFloat(amount.replace(/\./g, '').replace(',', '.'));
        await onAddSale({ product, amount: valorNumerico, date });
        setProduct('');
        setAmount('');
        setDate('');
        setLoading(false);
    };

    const inputStyle = { width: '100%', height: 40, boxSizing: 'border-box' };

    return (
        <form
            onSubmit={handleSubmit}
            className={error ? 'form-error' : ''}
            style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                marginBottom: 32,
                maxWidth: 700,
                width: '100%',
                alignItems: 'end',
                background: '#fff',
                padding: 24,
                borderRadius: 12,
                boxShadow: '0 2px 8px #0001',
                flexWrap: 'wrap'
            }}
        >
            <div style={{ flex: 1, minWidth: 180, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label style={{ marginBottom: 4, fontWeight: 500 }}>Produto</label>
                <input
                    type="text"
                    placeholder="Produto"
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <div style={{ flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label style={{ marginBottom: 4, fontWeight: 500 }}>Valor</label>
                <input
                    type="text"
                    placeholder="Valor"
                    value={amount}
                    onChange={e => setAmount(formatMoney(e.target.value))}
                    style={inputStyle}
                />
            </div>
            <div style={{ flex: 1, minWidth: 140, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <label style={{ marginBottom: 4, fontWeight: 500 }}>Data</label>
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={inputStyle}
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                style={{
                    minWidth: 120,
                    height: 40,
                    marginBottom: 0
                }}
            >
                {loading ? 'Adicionando...' : 'Adicionar'}
            </button>
            {error && (
                <div style={{ color: 'red', width: '100%', textAlign: 'left', marginTop: 8 }}>
                    {error}
                </div>
            )}
        </form>
    );
} 