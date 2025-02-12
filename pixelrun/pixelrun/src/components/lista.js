import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Lista({ onClick }) {
  const [pokemones, setPokemones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((response) => {
        setPokemones(response.data.results); // Actualizar el estado con la lista de Pokémon
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  // Filtra los pokemones según el término de búsqueda
  const filteredPokemons = pokemones.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="lista">
      {/* Campo de búsqueda */}
      <input
        className='buscador'
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
      />

      <ul>
        {/* Muestra los Pokémon filtrados */}
        {filteredPokemons.map((pokemon, index) => (
          <li
            key={index}
            onClick={() => onClick(pokemon.url.substring(34, pokemon.url.length - 1))}
          >
            {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Lista;
