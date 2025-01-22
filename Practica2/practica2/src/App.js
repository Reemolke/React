
import './App.css';
import ListaTareas from './components/listaTareas';
import { useState } from'react';
import FormularioTarea from './components/FormularioTarea';
function App() {
  const [tareas, setTareas]= useState([1,2,3]);
  const agregarTarea = (tarea, completada) => {
    setTareas((prevTareas) => [
      ...prevTareas,
      { tarea, completada }
    ]);
  };
  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <div class="container">
        <ListaTareas tareas={tareas}/>
        <FormularioTarea agregarTarea={agregarTarea}/>
      </div>
    </div>
  );
}

export default App;
