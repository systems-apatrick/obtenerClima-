import React, { Fragment, useState, useEffect } from "react";
import "dotenv/config.js";
import Clima from "./components/Clima";
import Error from "./components/Error";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Sppiner from "./components/Spinner";

function App() {
  // state de appjs
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consulta, guardarConsulta] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);
  const [cargando, guardarCargando] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    console.log(process.env.REACT_APP_ID_WEATHER);
    const consultarAPI = async () => {
      if (consulta) {
        console.log("Comienza a hacer la consulta");
        guardarCargando(true);
        const appId = process.env.REACT_APP_ID_WEATHER;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsulta(false);

        // detecta si hubo resultados correcto en la consulta
        if (resultado.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
        console.log("Termina a hacer la consulta");
      }
      setTimeout(() => {
        guardarCargando(false);
      }, 3000);
    };
    consultarAPI();

    // eslint-disable-next-line
  }, [consulta]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }
  return (
    <Fragment>
      <Header titulo="Clima React"></Header>
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m12 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsulta={guardarConsulta}
              />
            </div>
          </div>
          <div className="row">
            <div className="col m12 s12">
              {cargando ? <Sppiner /> : componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
