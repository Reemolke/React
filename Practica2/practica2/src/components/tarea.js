import React from "react";
function Tarea({tarea,completada,index,eliminarTarea,completarTarea}){
    return (
        <div class="listaTexto">
            <div class="texto"><span>{completada && <em style={{textDecoration : 'line-through'}}>{tarea}</em>}{!completada && tarea}</span><span>{completada && (<img class="checked" src="https://static.vecteezy.com/system/resources/previews/010/152/436/original/tick-check-mark-icon-sign-symbol-design-free-png.png" alt="check"></img>)}
            {!completada && (<img class="checked" src="https://pngimg.com/d/hourglass_PNG21.png" alt="check"></img>)}</span></div>
            
            <div class="botones">
                <button onClick={()=>eliminarTarea(index)}>Eliminar</button>
                <button onClick={()=>completarTarea(index,completada)}>{completada && ("Reabrir")}{!completada && "Completar" }</button>
            </div>
            
        </div>
    );
}
export default Tarea;