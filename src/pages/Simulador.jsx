import React, { useState, useMemo } from "react";
import { credits } from "../data/creditsData";
import CreditCard from "../components/CreditCard";

export default function Simulador() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [sortByRate, setSortByRate] = useState("none");

  const filteredCredits = useMemo(() => {
    let result = credits.filter(credit => {
      // Búsqueda por nombre
      const matchesSearch = credit.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Filtro por monto
      const creditMinAmount = credit.minAmount;
      const creditMaxAmount = credit.maxAmount;
      const userMin = minAmount ? parseFloat(minAmount) : 0;
      const userMax = maxAmount ? parseFloat(maxAmount) : Infinity;

      const matchesAmount = !(creditMinAmount > userMax || creditMaxAmount < userMin);

      return matchesSearch && matchesAmount;
    });

    // Ordenar por tasa de interés
    if (sortByRate === "asc") {
      result.sort((a, b) => a.interestRate - b.interestRate);
    } else if (sortByRate === "desc") {
      result.sort((a, b) => b.interestRate - a.interestRate);
    }

    return result;
  }, [searchTerm, minAmount, maxAmount, sortByRate]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setMinAmount("");
    setMaxAmount("");
    setSortByRate("none");
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main>
      <h1>🔍 Simulador de Créditos</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem", fontSize: "1.05rem" }}>
        Filtra y compara nuestros productos según tus necesidades
      </p>

      {/* Sección de Filtros */}
      <div className="filters-section">
        <h3>Filtros de Búsqueda</h3>
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="search">🔎 Buscar por nombre:</label>
            <input
              id="search"
              type="text"
              placeholder="Ej: Hipotecario, Educativo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="minAmount">💰 Monto Mínimo:</label>
            <input
              id="minAmount"
              type="number"
              placeholder="Monto mínimo"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="maxAmount">💰 Monto Máximo:</label>
            <input
              id="maxAmount"
              type="number"
              placeholder="Monto máximo"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="sortRate">📊 Ordenar por tasa de interés:</label>
            <select
              id="sortRate"
              value={sortByRate}
              onChange={(e) => setSortByRate(e.target.value)}
            >
              <option value="none">Sin ordenar</option>
              <option value="asc">Menor a Mayor</option>
              <option value="desc">Mayor a Menor</option>
            </select>
          </div>

          <button className="clear-filters-btn" onClick={handleClearFilters}>
            🗑️ Limpiar Filtros
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>
        <p style={{ color: "#6b7280", fontSize: "0.95rem" }}>
          Se encontraron <strong>{filteredCredits.length}</strong> {filteredCredits.length === 1 ? "crédito" : "créditos"}
        </p>
      </div>

      {filteredCredits.length === 0 ? (
        <div className="no-results">
          <div className="no-results-icon">❌</div>
          <h3>No hay créditos disponibles</h3>
          <p>Intenta cambiar los filtros de búsqueda para ver más opciones</p>
        </div>
      ) : (
        <div className="credits-grid">
          {filteredCredits.map(credit => (
            <CreditCard key={credit.id} credit={credit} />
          ))}
        </div>
      )}
    </main>
  );
}
