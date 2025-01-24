import React from 'react';
import Tarea from './tarea';
function ListaTareas({tareas,eliminarTarea,completarTarea}) {
  return (
    //utilizo el array tareas.map para recorrer el array de manera asociativa, incrusto index y en <Tarea> como prop para poder
    //utilizar las variables en los botones de eliminar y completar
    <div class="lista">
      <ul>
        {tareas.map((tarea, index) => (
          <li>
            <Tarea tarea={tarea.tarea} completada={tarea.completada} index={index} eliminarTarea={eliminarTarea} completarTarea={completarTarea}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;
