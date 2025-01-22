
import './App.css';
import ListaTareas from './components/listaTareas';
import { useState } from'react';
import FormularioTarea from './components/FormularioTarea';


function App() {
  const [tareas, setTareas]= useState([]);
  const agregarTarea = (tarea, completada) => {
    setTareas([...tareas,{tarea,completada}]);
  };
  const eliminarTarea = (index) =>{
    setTareas(tareas.filter((tarea,i) =>{
      return i !== index;
    }));
  };
  const completarTarea = (index,completada)=>{
    const nuevasTareas = [...tareas];   
    nuevasTareas[index] = {...nuevasTareas[index],completada: !completada}
    setTareas(nuevasTareas);
  };
  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <div class="container">
        <ListaTareas tareas={tareas} eliminarTarea={eliminarTarea} completarTarea={completarTarea}/>
        <FormularioTarea agregarTarea={agregarTarea}/>
      </div>
    </div>
  );
}

export default App;
