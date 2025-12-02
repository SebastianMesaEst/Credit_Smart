import React, { useState } from 'react';
import { credits } from '../data/credits';

export default function Simulator() {
  const [q, setQ] = useState('');
  const [range, setRange] = useState('all');

  const products = credits.map(c => ({...c, img: `/src/assets/${c.id===1? 'credito-libre.svg' : c.id===2? 'credito-vehiculo.svg' : 'credito-vivienda.svg'}`}));

  const applyFilters = () => {
    // filtering handled inline in render
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).filter(p => {
    if(range==='low') return p.amount <= 5000000;
    if(range==='medium') return p.amount > 5000000 && p.amount <= 50000000;
    if(range==='high') return p.amount > 50000000;
    return true;
  });

  return (
    <section className="simulator">
      <h2>Simulador de Créditos</h2>
      <form className="search-panel" onSubmit={(e)=>e.preventDefault()}>
        <div className="form-row"><label htmlFor="q">Buscar por producto</label><input id="q" value={q} onChange={e=>setQ(e.target.value)} type="search" placeholder="Ej: Vivienda, Vehículo..."/></div>
        <div className="form-row"><label htmlFor="range">Rango de monto</label><select id="range" value={range} onChange={e=>setRange(e.target.value)}><option value="all">Todos</option><option value="low">Hasta $5.000.000</option><option value="medium">$5.000.000 - $50.000.000</option><option value="high">Más de $50.000.000</option></select></div>
        <div className="form-actions"><button className="btn" type="button" onClick={applyFilters}>Buscar</button><button className="btn ghost" type="button" onClick={()=>{setQ('');setRange('all')}}>Limpiar</button></div>
      </form>
      <section id="results" className="cards-grid">
        {filtered.map(p=> (
          <article key={p.id} className="card"><img src={p.img} className="card-img" alt={p.name} /><div className="card-body"><h3>{p.name}</h3></div></article>
        ))}
      </section>
    </section>
  );
}