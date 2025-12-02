import React from 'react';

export default function RequestForm() {
  return (
    <section className="form-section">
      <h2>Formulario de Solicitud de Crédito</h2>
      <form className="loan-form" onSubmit={(e)=>{e.preventDefault(); alert('Formulario de diseño')}}>
        <fieldset>
          <legend>Datos personales</legend>
          <label>Nombre completo<input type="text" required/></label>
          <label>Cédula<input type="number" required/></label>
          <label>Email<input type="email" required/></label>
        </fieldset>
        <fieldset>
          <legend>Datos del crédito</legend>
          <label>Tipo<select required><option value="">--Seleccione--</option><option>Libre Inversión</option><option>Vehículo</option><option>Vivienda</option></select></label>
          <label>Monto<input type="number" required/></label>
        </fieldset>
        <div className="form-actions"><button className="btn" type="submit">Enviar</button><button className="btn ghost" type="reset">Limpiar</button></div>
      </form>
    </section>
  );
}