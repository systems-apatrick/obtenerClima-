import React, { useState } from "react";
import Error from "./Error";
import PropTypes from "prop-types";

const Formulario = ({ busqueda, guardarBusqueda, guardarConsulta }) => {
  const [error, guardaError] = useState(false);

  // extraer la ciuda y pais
  const { ciudad, pais } = busqueda;

  // funcion que coloca los elementos en el state
  const handleChange = (e) => {
    // actualizar el state
    guardarBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //   validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      guardaError(true);
      return;
    }
    guardaError(false);

    //   pasar al componente principal
    guardarConsulta(true);
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad"> Ciudad:</label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">-- Seleccione un Pais --</option>
          <option value="US"> Estados Unidos</option>
          <option value="MX"> Mexico</option>
          <option value="AR"> Argentina</option>
          <option value="CO"> Colombia</option>
          <option value="CR"> Costa Rica</option>
          <option value="ES"> España</option>
          <option value="PE"> Perú</option>
          <option value="EC"> Ecuador</option>
        </select>
        <label htmlFor="pais"> Pais:</label>
      </div>

      <div className="input-field col s12">
        <button
          className="btn waves-effect waves-light green"
          type="submit"
          name="consultar"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  guardarBusqueda: PropTypes.func.isRequired,
  guardarConsulta: PropTypes.func.isRequired,
};

export default Formulario;
