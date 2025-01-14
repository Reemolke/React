import React from 'react';
function BotonSaludo(props) {
  return (
    <div>
        <button class="botonSaludo" style={{color: props.color}} onClick={props.onClick}>{props.texto}</button>
    </div>
  );
}

export default BotonSaludo;
