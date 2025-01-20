import React, { useState } from 'react';
function Formulario() {
    const [nombre, setNombre] = useState("Riquelmer");
    const [mensaje,setMensaje] = useState("Mensaje");
    const Submit = (e) => {
      e.preventDefault();
        alert("¡Hola "+nombre+"! "+mensaje);
    }
  return (
     <form>
        <label>
          Nombre
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <label>
          Mensaje
          <input 
            type="text" 
            value={mensaje} 
            onChange={(e) => setMensaje(e.target.value)} 
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
        <button onClick={Submit}>Enviar</button>
    </form>
  );
}

export default Formulario;
