import React from 'react';

function ListaTareas(props) {
  return (
    <div>
      <ul>
        {props.tareas.map((tarea, index) => (
          <li key={index}>
            <span>{tarea.tarea}</span> {/* Display task name */}
            {tarea.completada && <span> (Completada)</span>} {/* Show "Completada" if the task is completed */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaTareas;
