import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Lista({ onClick }) {
  const [pokemones, setPokemones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
      .then((response) => {
        setPokemones(response.data.results);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  useEffect(() => {
    // Buscar si el término ingresado coincide con un Pokémon por nombre o ID
    const foundPokemon = pokemones.find((pokemon) => {
      const pokemonId = pokemon.url.split('/')[6]; // Extraer la ID desde la URL
      return pokemon.name.toLowerCase() === searchTerm.toLowerCase() || pokemonId === searchTerm;
    });

    setSelectedPokemon(foundPokemon ? foundPokemon.url.split('/')[6] : null);
  }, [searchTerm, pokemones]);

  // Filtrar la lista de Pokémon para la visualización
  const filteredPokemons = pokemones.filter((pokemon) => {
    const pokemonId = pokemon.url.split('/')[6];
    return (
      pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase()) || 
      pokemonId.startsWith(searchTerm)
    );
  });

  return (
    <div className="lista">
      {/* Campo de búsqueda */}
      <input
        className="buscador"
        type="text"
        placeholder="Buscar Pokémon por nombre o ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        onClick={() => selectedPokemon && onClick(selectedPokemon)} 
        disabled={!selectedPokemon}
      >
        Buscar
      </button>

      <ul>
        {filteredPokemons.map((pokemon) => {
          const pokemonId = pokemon.url.split('/')[6];
          return (
            <li
              key={pokemonId}
              onClick={() => onClick(pokemonId)}
            >
              {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Lista;
