import React, { useState, useEffect } from "react";

function Cronometro() {
    const [tiempo, setTiempo] = useState({ minutos: 0, contador: 0 });  // Un solo estado para minutos y contador
    const [corriendo, setCorriendo] = useState(true); // Estado para saber si el cronómetro está en marcha

    useEffect(() => {
        // Si el cronómetro está corriendo, actualizamos el contador cada segundo
        let intervalo;
        if (corriendo) {
            intervalo = setInterval(() => {
                setTiempo((prevTiempo) => {
                    if (prevTiempo.contador === 59) {
                        return {
                            minutos: prevTiempo.minutos + 1,  // Aumentar minutos
                            contador: 0,  // Reiniciar el contador a 0
                        };
                    }
                    return {
                        ...prevTiempo,  // Mantener los valores previos
                        contador: prevTiempo.contador + 1,  // Incrementar el contador
                    };
                });
            }, 1000);  // Ejecutar cada segundo (1000ms)
        } else {
            clearInterval(intervalo);  // Si no está corriendo, limpiamos el intervalo
        }

        // Limpiar el intervalo cuando el componente se desmonte o cuando el estado cambie
        return () => clearInterval(intervalo);
    }, [corriendo]);  // El efecto se ejecutará solo cuando el estado `corriendo` cambie

    const manejarClick = () => {
        setCorriendo(!corriendo);  // Cambiar el estado de "corriendo"
    };

    return (
        <div>
            <div className="botonAlarma" onClick={manejarClick}>
            </div>
            <p className="cronometro">
                {tiempo.minutos < 10 ? "0" + tiempo.minutos : tiempo.minutos} : {tiempo.contador < 10 ? "0" + tiempo.contador : tiempo.contador}
            </p>
        </div>
    );
}

export default Cronometro;
