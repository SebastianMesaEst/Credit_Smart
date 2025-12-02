import React from "react";

export default function CreditCard({ credit }) {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="credit-card">
      <h2>{credit.name}</h2>
      <p>{credit.description}</p>
      
      <div className="credit-card-highlight">
        <p><strong>Tasa de Interés:</strong></p>
        <p style={{ fontSize: "1.5rem", color: "#f59e0b", fontWeight: "bold" }}>
          {(credit.interestRate * 100).toFixed(2)}%
        </p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <p><strong>Monto Mínimo:</strong></p>
        <p style={{ color: "#2563eb", fontSize: "1.1rem" }}>{formatAmount(credit.minAmount)}</p>
      </div>

      <div>
        <p><strong>Monto Máximo:</strong></p>
        <p style={{ color: "#2563eb", fontSize: "1.1rem" }}>{formatAmount(credit.maxAmount)}</p>
      </div>

      <button className="btn btn-primary" style={{ marginTop: "auto" }}>
        Solicitar este Crédito
      </button>
    </div>
  );
}
