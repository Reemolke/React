import React from 'react';
import Tarea from './tarea';
function ListaTareas({tareas,eliminarTarea,completarTarea}) {
  return (
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
