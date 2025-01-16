import React from 'react';
function Formulario(props) {
    const Submit = (e) => {
      e.preventDefault();
        alert("¡Hola "+props.nombre+"! "+props.mensaje);
    }
  return (
    <form>
        <button onClick={Submit}>Enviar</button>
    </form>
  );
}

export default Formulario;
