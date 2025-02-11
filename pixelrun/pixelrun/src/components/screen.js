import React, { useState } from 'react';
import Lista from './lista.js'
import axios from 'axios'
import PokemonStatsBars from './pokemonstatsbars.js';

function Screen(pagina){

    const [pokemon,setPokemon] = useState([]);

    const handlePokemon = (id) =>{
            axios
              .get('https://pokeapi.co/api/v2/pokemon/'+id)
              .then((response) => {
                console.log(response.data);
                
                // Assuming the list of pokemons is in the 'results' field
                setPokemon(response.data); // Update state with the Pokémon list
                
              })
              .catch((error) => {
                console.error(error.message);
              });
            

    }
    
    return(
    <div className='pantalla'>
            <div className='visualizacion'>
            <h1>{pokemon?.name ? pokemon.name[0].toUpperCase() + pokemon.name.slice(1) : "Unknown"}</h1>

            <div>
            <img src={pokemon?.sprites?.other.showdown.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png'} alt={pokemon?.name || "Pokemon"} />
            </div>
            <p>Altura: {pokemon?.height/10+'m' || 'Unknown'}  </p>
            <p>Peso: {pokemon?.weight/100+'kg' || 'Unknown'}  </p>
            <p>
            <strong>Tipo:</strong>{" "}
            {pokemon?.types
                ? pokemon.types.map((t) => t.type.name[0].toUpperCase() + t.type.name.slice(1)).join(" / ")
                : "Unknown"}
            </p>




            </div>
            <div className='resumen'>
            <PokemonStatsBars stats={pokemon?.stats || []}/>
            {pokemon?.abilities
                ? pokemon.abilities.map((a, index) => (
                    <a href={a.ability.url}><p>{a.ability.name[0].toUpperCase() + a.ability.name.slice(1)}</p></a>
                ))
                : "Unknown"}

            </div>
            <Lista onClick={handlePokemon}/>
            
    </div>
    );
}

export default Screen;