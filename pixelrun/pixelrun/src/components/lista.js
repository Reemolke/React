import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';

function Lista(){
    const [pokemones,setPokemones] = useState([]);
    useEffect(() => {
      axios
        .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then((response) => {
          console.log(response.data);
          
          // Assuming the list of pokemons is in the 'results' field
          setPokemones(response.data.results); // Update state with the Pokémon list
        })
        .catch((error) => {
          console.error(error.message);
        });
    }, []);
    
    

    
    return (
      <div className="lista">
        <ul>

          {pokemones.map((pokemon, index) => (

            <li><p>{pokemon.name}</p><p>{pokemon.index}</p></li>


          ))}

        </ul>
      </div>
    );
}
export default Lista;