import React, { useState } from "react";

function FormularioTarea({ agregarTarea }) {
  // State to store the input value
  const [tarea, setTarea] = useState("");
  const [completada, setCompletada] = useState(false);

  // Handler for the input change
  const handleInputChange = (e) => {
    setTarea(e.target.value);
  };

  // Handler for radio button change (if you want to track completion)
  const handleRadioChange = (e) => {
    setCompletada(e.target.checked);
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim()) {
      agregarTarea(tarea, completada);
      setTarea(""); // Reset input field after submit
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tarea}
        onChange={handleInputChange}
        placeholder="Tarea"
      />
      <label>
        <input
          type="checkbox"
          checked={completada}
          onChange={handleRadioChange}
        />
        Completada
      </label>
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioTarea;
