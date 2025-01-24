import React, { useState, useRef, useEffect } from "react";

function FormularioTarea({ agregarTarea }) {
  //Utilizar useState para establecer variables
  const [tarea, setTarea] = useState("");
  const [completada, setCompletada] = useState(false);
  //useRef para guardar espacio para una referencia a un <audio>
  const audioRef = useRef(null);

  
  const [audioPlayed, setAudioPlayed] = useState(false);

  //Si <input> cambia, uso setTarea() con el valor del input
  const handleInputChange = (e) => {
    setTarea(e.target.value);
  };


  //Si se hace submit, compruebo que la variable tarea no este vacia, si no lo esta, llamo a agregarTarea()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim()) {
      agregarTarea(tarea, completada);
      setTarea(""); //Limpio la tarea
      setAudioPlayed(true); //Al interactuar con el form establezco audioPlayed a true
    }
  };

 
  useEffect(() => { //Al cambiar el estado de audioPlayed, se efectua esto
    if (audioPlayed && audioRef.current) {
      audioRef.current.volume = 0.10;//Utilizo la referencia al audio para cambiar el volumen y reproducirlo
      audioRef.current.play(); 
    }
  }, [audioPlayed]); 
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tarea}
        onChange={handleInputChange}
        placeholder="Tarea"
      />
      <button type="submit">Agregar</button>

      <audio ref={audioRef} src="./bossanova.mp3" loop controls> 
      </audio>
    </form>
  );
}

export default FormularioTarea;
