import React from 'react';
import { credits } from '../data/credits';
import CreditCard from './CreditCard';
import creditoLibreImg from '../assets/credito-libre.svg';
import creditoVehiculoImg from '../assets/credito-vehiculo.svg';
import creditoViviendaImg from '../assets/credito-vivienda.svg';

export default function CreditList() {
  return (
    <div>
      {credits.map(c => {
        let img = creditoViviendaImg;
        if (c.id === 1) img = creditoLibreImg;
        if (c.id === 2) img = creditoVehiculoImg;
        return <CreditCard key={c.id} {...c} img={img} />;
      })}
    </div>
  );
}