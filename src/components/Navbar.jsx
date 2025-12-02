import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/simulador">Simulador</Link></li>
        <li><Link to="/solicitar">Solicitar</Link></li>
      </ul>
    </nav>
  );
}
