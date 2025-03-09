import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Lista({ onClick,combate }) {
  const [pokemones, setPokemones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [seleccionados, setSeleccionados] = useState(new Set());

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
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && seleccionados.size > 1) {
      combate(seleccionados);
    }
  };
  const maxSeleccionados = 2; // Cambia este número si quieres otro límite

  const seleccionarPokemon = (e, pokemonId) => {
    const nuevoSet = new Set(seleccionados);

    if (nuevoSet.has(pokemonId)) {
      // Si ya está seleccionado, lo quitamos
      nuevoSet.delete(pokemonId);

    } else {
      if (nuevoSet.size < maxSeleccionados) {
        // Si hay espacio, lo agregamos
        nuevoSet.add(pokemonId);
        if(nuevoSet.size == 2){
          alert('Presiona Enter para confirmar combate')
        }
      } else {
        // Si ya hay 2 seleccionados, eliminamos el más antiguo
        
        const primerSeleccionado = Array.from(nuevoSet)[0];
        nuevoSet.delete(primerSeleccionado);
        // Agregamos el nuevo seleccionado
        nuevoSet.add(pokemonId);

      }
    }

    setSeleccionados(nuevoSet); // Actualizamos el estado para que React recuerde
  };

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
    <div className="lista" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Campo de búsqueda */}
      <div className='divSearch'>
        <input
          className="buscador"
          type="text"
          placeholder="Buscar Pokémon por nombre o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button 
          className="botonBusqueda"
          onClick={() => selectedPokemon && onClick(selectedPokemon)} 
          disabled={!selectedPokemon}
        >
          {'🔎︎'}
        </button>
      </div>

      <ul>
        {filteredPokemons.map((pokemon) => {
          const pokemonId = pokemon.url.split('/')[6];
          return (
            <li
              key={pokemonId}
              id={pokemonId} // Usamos el ID aquí
              onClick={(e) => {
                onClick(pokemonId);
                seleccionarPokemon(e, pokemonId); // ✅ Pasamos `pokemonId` y el evento `e`
              }}
              style={{
                backgroundColor: seleccionados.has(pokemonId) ? "grey" : "rgb(234, 231, 236)" // Comprobamos si está seleccionado
              }}
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
