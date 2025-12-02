import React, { useState } from "react";
import { credits } from "../data/creditsData";

export default function Solicitar() {
  const [formData, setFormData] = useState({
    creditType: "",
    fullName: "",
    email: "",
    phone: "",
    amount: "",
    months: 12,
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [applications, setApplications] = useState([]);

  const selectedCredit = credits.find(c => c.id === parseInt(formData.creditType));

  // Validaciones en tiempo real
  const validateForm = () => {
    const errors = {};

    if (!formData.creditType) errors.creditType = "Selecciona un tipo de crédito";
    if (!formData.fullName.trim()) errors.fullName = "El nombre es obligatorio";
    if (!formData.email.includes("@")) errors.email = "Email inválido";
    if (!formData.phone || formData.phone.length < 7) errors.phone = "Teléfono inválido";

    if (!formData.amount) {
      errors.amount = "El monto es obligatorio";
    } else {
      const amount = parseFloat(formData.amount);
      if (selectedCredit) {
        if (amount < selectedCredit.minAmount) {
          errors.amount = `Monto mínimo: ${selectedCredit.minAmount}`;
        }
        if (amount > selectedCredit.maxAmount) {
          errors.amount = `Monto máximo: ${selectedCredit.maxAmount}`;
        }
      }
    }

    if (!formData.months || formData.months < 1 || formData.months > 120) {
      errors.months = "El plazo debe estar entre 1 y 120 meses";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Calcular cuota mensual
  const calculateMonthlyFee = () => {
    if (!selectedCredit || !formData.amount || !formData.months) return 0;

    const principal = parseFloat(formData.amount);
    const monthlyRate = selectedCredit.interestRate / 12;
    const months = parseInt(formData.months);

    if (monthlyRate === 0) {
      return principal / months;
    }

    const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
    const denominator = Math.pow(1 + monthlyRate, months) - 1;
    return numerator / denominator;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setSuccessMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!showSummary) {
      setShowSummary(true);
      return;
    }

    // Guardar solicitud
    const newApplication = {
      id: Date.now(),
      ...formData,
      monthlyFee: calculateMonthlyFee(),
      creditName: selectedCredit?.name,
      date: new Date().toLocaleDateString('es-ES'),
    };

    setApplications(prev => [...prev, newApplication]);
    setSuccessMessage("✅ ¡Solicitud enviada exitosamente! Tu solicitud ha sido registrada.");
    
    // Limpiar formulario
    setTimeout(() => {
      setFormData({
        creditType: "",
        fullName: "",
        email: "",
        phone: "",
        amount: "",
        months: 12,
      });
      setShowSummary(false);
      setFormErrors({});
      setSuccessMessage("");
    }, 3000);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const monthlyFee = calculateMonthlyFee();
  const totalAmount = monthlyFee * parseInt(formData.months);

  return (
    <main>
      <h1>📝 Solicitar Crédito</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem", fontSize: "1.05rem" }}>
        Completa el formulario para solicitar tu crédito
      </p>

      {successMessage && (
        <div className="alert alert-success" style={{ maxWidth: "600px", margin: "0 auto 1.5rem" }}>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Tipo de Crédito */}
        <div className="form-group">
          <label htmlFor="creditType">Tipo de Crédito *</label>
          <select
            id="creditType"
            name="creditType"
            value={formData.creditType}
            onChange={handleChange}
          >
            <option value="">-- Selecciona un crédito --</option>
            {credits.map(credit => (
              <option key={credit.id} value={credit.id}>
                {credit.name} ({(credit.interestRate * 100).toFixed(2)}%)
              </option>
            ))}
          </select>
          {formErrors.creditType && <span className="error-message">{formErrors.creditType}</span>}
        </div>

        {/* Nombre Completo */}
        <div className="form-group">
          <label htmlFor="fullName">Nombre Completo *</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Tu nombre completo"
            value={formData.fullName}
            onChange={handleChange}
          />
          {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>

        {/* Teléfono */}
        <div className="form-group">
          <label htmlFor="phone">Teléfono *</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="3001234567"
            value={formData.phone}
            onChange={handleChange}
          />
          {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
        </div>

        {/* Monto */}
        <div className="form-group">
          <label htmlFor="amount">Monto Solicitado ($) *</label>
          <input
            id="amount"
            type="number"
            name="amount"
            placeholder="Ingresa el monto"
            value={formData.amount}
            onChange={handleChange}
          />
          {formErrors.amount && <span className="error-message">{formErrors.amount}</span>}
          {selectedCredit && formData.amount && (
            <span className="success-message">
              ✓ Monto válido entre {formatAmount(selectedCredit.minAmount)} y {formatAmount(selectedCredit.maxAmount)}
            </span>
          )}
        </div>

        {/* Plazo */}
        <div className="form-group">
          <label htmlFor="months">Plazo (meses) *</label>
          <input
            id="months"
            type="number"
            name="months"
            min="1"
            max="120"
            value={formData.months}
            onChange={handleChange}
          />
          {formErrors.months && <span className="error-message">{formErrors.months}</span>}
        </div>

        {/* Resumen */}
        {selectedCredit && formData.amount && monthlyFee > 0 && (
          <div className="summary-section">
            <h3>📊 Resumen de tu Solicitud</h3>
            <div className="summary-item">
              <label>Producto Crediticio:</label>
              <span className="summary-item-value">{selectedCredit.name}</span>
            </div>
            <div className="summary-item">
              <label>Monto Solicitado:</label>
              <span className="summary-item-value">{formatAmount(parseFloat(formData.amount))}</span>
            </div>
            <div className="summary-item">
              <label>Tasa de Interés:</label>
              <span className="summary-item-value">{(selectedCredit.interestRate * 100).toFixed(2)}%</span>
            </div>
            <div className="summary-item">
              <label>Plazo:</label>
              <span className="summary-item-value">{formData.months} meses</span>
            </div>
            <div className="summary-item">
              <label>Monto Total a Pagar:</label>
              <span className="summary-item-value">{formatAmount(totalAmount)}</span>
            </div>
            <div className="monthly-fee-highlight">
              Cuota Mensual Estimada: {formatAmount(monthlyFee)}
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="btn-group">
          {showSummary ? (
            <>
              <button type="submit" className="btn btn-success">
                ✅ Confirmar Solicitud
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowSummary(false)}
              >
                ← Atrás
              </button>
            </>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (validateForm()) {
                  setShowSummary(true);
                }
              }}
            >
              Revisar Resumen →
            </button>
          )}
        </div>
      </form>

      {/* Historial de Solicitudes */}
      {applications.length > 0 && (
        <div style={{ maxWidth: "600px", margin: "3rem auto 0" }}>
          <h2>📋 Historial de Solicitudes</h2>
          {applications.map(app => (
            <div key={app.id} className="alert alert-info" style={{ marginBottom: "1rem" }}>
              <strong>{app.creditName}</strong> - {app.fullName}<br/>
              Monto: {formatAmount(app.amount)} | Cuota: {formatAmount(app.monthlyFee)}<br/>
              <small>Fecha: {app.date}</small>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
