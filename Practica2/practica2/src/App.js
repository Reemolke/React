
import './App.css';
import ListaTareas from './components/listaTareas';
import { useState} from'react';
import FormularioTarea from './components/FormularioTarea';
import React from 'react';

function App() {
  const [tareas, setTareas]= useState([]);
  const agregarTarea = (tarea, completada) => {
    setTareas([...tareas,{tarea,completada}]);
  }; //...tareas coge el valor actual de tareas, y con {tarea,completada} añado un registro más al array
  const eliminarTarea = (index) =>{
    setTareas(tareas.filter((tarea,i) =>{//filter recorriendo el array para coger solo los que no sean iguales a index y asignarle el valor nuevo a tareas
      return i !== index;
    }));
  };
  const completarTarea = (index,completada)=>{//hago una copia del array, cojo el valor del array por index y cambio completada a su contraria
    const nuevasTareas = [...tareas];   
    nuevasTareas[index] = {...nuevasTareas[index],completada: !completada}//de esta manera le puedo dar varias veces a completar/reabrir
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
