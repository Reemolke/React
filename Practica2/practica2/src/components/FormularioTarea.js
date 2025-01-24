import React, { useState, useRef, useEffect } from "react";

function FormularioTarea({ agregarTarea }) {
  // State to store the input value
  const [tarea, setTarea] = useState("");
  const [completada, setCompletada] = useState(false);
  const audioRef = useRef(null);

  // State to control whether the audio should be played
  const [audioPlayed, setAudioPlayed] = useState(false);

  // Handler for the input change
  const handleInputChange = (e) => {
    setTarea(e.target.value);
  };


  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim()) {
      agregarTarea(tarea, completada);
      setTarea(""); // Reset input field after submit
      setAudioPlayed(true); // Set state to play audio after submitting the form
    }
  };

  // Play audio when the form is submitted
  useEffect(() => {
    if (audioPlayed && audioRef.current) {
      audioRef.current.volume = 0.10;
      audioRef.current.play(); // Play audio after user interaction
    }
  }, [audioPlayed]); // Only run the effect when audioPlayed changes

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
