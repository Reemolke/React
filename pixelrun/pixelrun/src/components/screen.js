import React from 'react';

function Screen(pagina){
    return(
    <div className='pantalla'>
        
            <div className='visualizacion'>
            <h1>Pokemon</h1>
            <div>
            <img src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/132.gif' alt='Pokemon'></img>
            </div>
            <p>Habilidad: </p>
            <p>Descripción:</p>
            </div>
            <div className='resumen'>
            <ul>Estadísticas
                <li>ATQ</li>
                <li>DEF</li>
                <li>HP</li>
                <li>ATQ E</li>
                <li>DEF E</li>
                <li>SPD</li>
            </ul>
            </div>
            <div className='lista'>

            </div>
        
    </div>
    );
}

export default Screen;