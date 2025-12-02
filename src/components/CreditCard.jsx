import React from 'react';

export default function CreditCard({ name, rate, amount, img }) {
  return (
    <article className="card">
      {img && <img src={img} alt={name} className="card-img" />}
      <div className="card-body">
        <h3>{name}</h3>
        <p className="rate">Tasa: <strong>{rate}% anual</strong></p>
        <p className="amount">Monto: {amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits:0 })}</p>
      </div>
    </article>
  );
}