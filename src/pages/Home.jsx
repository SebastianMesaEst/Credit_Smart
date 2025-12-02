import React from "react";
import { credits } from "../data/creditsData";
import CreditCard from "../components/CreditCard";

export default function Home() {
  return (
    <main>
      <h1>💳 Catálogo de Créditos</h1>
      <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "2rem", fontSize: "1.05rem" }}>
        Explora nuestros productos crediticios diseñados para ti
      </p>
      <div className="credits-grid">
        {credits.map(c => <CreditCard key={c.id} credit={c} />)}
      </div>
    </main>
  );
}
