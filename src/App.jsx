import React, { useState } from 'react';
import CreditList from './components/CreditList';
import Simulator from './components/Simulator';
import RequestForm from './components/RequestForm';
import './styles.css';

export default function App(){
  const [route, setRoute] = useState('home');
  return (
    <div>
      <header className="site-header">
        <div className="container header-inner">
          <h1 className="brand">CreditSmart</h1>
          <nav className="main-nav" aria-label="Navegación principal">
            <ul>
              <li><a href="#" onClick={()=>setRoute('home')} className={route==='home'? 'active': ''}>Inicio</a></li>
              <li><a href="#" onClick={()=>setRoute('simulator')} className={route==='simulator'? 'active': ''}>Simulador</a></li>
              <li><a href="#" onClick={()=>setRoute('request')} className={route==='request'? 'active': ''}>Solicitar Crédito</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container main-content">
        {route==='home' && (
          <>
            <section className="hero"><h2>Encuentra el crédito que mejor se adapte a ti</h2><p>Compara tasas, montos y plazos. Solicita online en pocos pasos.</p></section>
            <section aria-labelledby="catalogo-title" className="catalog"><h2 id="catalogo-title">Catálogo de Productos</h2><div className="cards-grid"><CreditList /></div></section>
          </>
        )}
        {route==='simulator' && <Simulator />}
        {route==='request' && <RequestForm />}
      </main>

      <footer className="site-footer"><div className="container"><p>&copy; {new Date().getFullYear()} CreditSmart</p></div></footer>
    </div>
  );
}