import React, { useState } from "react";

function FormularioTarea({ agregarTarea }) {
  // State to store the input value
  const [tarea, setTarea] = useState("");
  const [completada, setCompletada] = useState(false);

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
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioTarea;
