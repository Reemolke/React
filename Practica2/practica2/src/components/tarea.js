import React from "react";
function Tarea({tarea,completada,index,eliminarTarea,completarTarea}){
    return (
        <div class="listaTexto">
            <div><span>{tarea}{completada && (<img class="checked" src="https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/32x32/shadow/check.png" alt="check"></img>)}
            {!completada && (<img class="checked" src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/16x16/plain/hourglass.png" alt="check"></img>)}</span></div>
            
            <div class="botones">
                <button onClick={()=>eliminarTarea(index)}>Eliminar</button>
                <button onClick={()=>completarTarea(index,completada)}>{completada && ("Reabrir")}{!completada && "Completar" }</button>
            </div>
            
        </div>
    );
}
export default Tarea;