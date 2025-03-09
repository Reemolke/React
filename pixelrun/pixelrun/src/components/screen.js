import React, { use, useState } from 'react';
import Lista from './lista.js'
import axios from 'axios'
import PokemonStatsBars from './pokemonstatsbars.js';

function Screen() {
  const [pokemon, setPokemon] = useState([]);
  const [combate, setCombate] = useState('pokedex');
  const [pokemonesCombate, setPokemonesCombate] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [hps,setHps] = useState([]);
  const [potencias,setPotencias] = useState([]);
  
  // Función para elegir un movimiento aleatorio
  const elegirMovimientoAleatorio = (movimientos) => {
    return Math.floor(Math.random() * movimientos); // Índice aleatorio
  }

  const handlePokemon = (id) => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/' + id)
      .then((response) => {
        console.log(response.data);
        setPokemon(response.data); 
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
  

  const obtenerMovimiento = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data; // Devuelve el objeto completo del movimiento
    } catch (error) {
      console.error("Error al obtener los datos del movimiento:", error);
      return null; // Retorna null en caso de error
    }
  };
  

  const handleCombat = async (pokemonIds) => {
    try {
      // Crear un array de promesas para obtener los datos de cada Pokémon
      const pokemonPromises = Array.from(pokemonIds).map((id) => 
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      );

      // Esperar todas las promesas
      const responses = await Promise.all(pokemonPromises);
      console.log(responses)
      // Dividir las respuestas en dos arrays
      const pokemonArray1 = [responses[0].data];
      const pokemonArray2 = [responses[1].data];

      setPokemonesCombate([pokemonArray1, pokemonArray2]);
      
      // Elegir movimiento aleatorio para ambos Pokémon
      let x = elegirMovimientoAleatorio(pokemonArray1[0]?.moves.length);
      let y = elegirMovimientoAleatorio(pokemonArray2[0]?.moves.length);
      console.log(pokemonArray1)
      setHps([[pokemonArray1[0].stats[0].base_stat],[pokemonArray2[0].stats[0].base_stat]]);
      let mov1 = [pokemonArray1[0]?.moves[x]?.move.name, await obtenerMovimiento(pokemonArray1[0]?.moves[x]?.move.url)]
      let mov2= [pokemonArray2[0]?.moves[y]?.move.name, await obtenerMovimiento(pokemonArray2[0]?.moves[y]?.move.url)]
      do {
        if (mov1[1].damage_class.name !== 'physical' && mov1[1].damage_class.name !== 'special') {
          x = elegirMovimientoAleatorio(pokemonArray1[0]?.moves.length);
          mov1 = [
            pokemonArray1[0]?.moves[x]?.move.name,
            await obtenerMovimiento(pokemonArray1[0]?.moves[x]?.move.url),
          ];
        }
      
        if (mov2[1].damage_class.name !== 'physical' && mov2[1].damage_class.name !== 'special') {
          y = elegirMovimientoAleatorio(pokemonArray2[0]?.moves.length);
          mov2 = [
            pokemonArray2[0]?.moves[y]?.move.name,
            await obtenerMovimiento(pokemonArray2[0]?.moves[y]?.move.url),
          ];
        }
      
        console.log(`Intentando: ${mov1[0]} (${mov1[1].damage_class.name}) vs ${mov2[0]} (${mov2[1].damage_class.name})`);
      
      } while (
        mov1[1].damage_class.name !== 'physical' && mov1[1].damage_class.name !== 'special' ||
        mov2[1].damage_class.name !== 'physical' && mov2[1].damage_class.name !== 'special'
      );
      
      
      
      // Actualizar los movimientos
      setMovimientos([
        mov1,
        mov2
      ]);
      
      
      setCombate('combate');
    } catch (error) {
      console.error("Error al obtener los datos de los Pokémon:", error);
      return [[], []]; // Devuelve arrays vacíos en caso de error
    }
  };
  const obtenerMultiplicadorTipo = async (tipoAtaque, tiposDefensor) => {
    try {
      // Obtener datos del tipo de ataque desde la API
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${tipoAtaque}`);
      const data = response.data;
  
      let multiplicador = 1;
  
      // Revisar las debilidades, resistencias e inmunidades del defensor
      tiposDefensor.forEach(tipoDef => {
        if (data.damage_relations.double_damage_to.some(t => t.name === tipoDef)) {
          multiplicador *= 2; // Doble daño
        }
        if (data.damage_relations.half_damage_to.some(t => t.name === tipoDef)) {
          multiplicador *= 0.5; // Mitad de daño
        }
        if (data.damage_relations.no_damage_to.some(t => t.name === tipoDef)) {
          multiplicador *= 0; // No hace daño
        }
      });
  
      return multiplicador;
    } catch (error) {
      console.error("Error obteniendo el tipo:", error);
      return 1; // Si falla, asumimos sin cambios
    }
  };
  
  const atacar = async (atacante) => {
      
      const defensor = atacante === 0 ? 1 : 0;
      
      const nivel = 50; // Suponemos que los Pokémon están en nivel 50
      const movimiento = movimientos[atacante];
      const poder = movimiento[1]?.power || 0;
      const tipoAtaque = movimiento[1]?.type.name; 

      const ataqueStat = pokemonesCombate[atacante][0]?.stats[1].base_stat || 1;
      const defensaStat = pokemonesCombate[defensor][0]?.stats[2].base_stat || 1;

      // Obtener los tipos del defensor
      const tiposDefensor = pokemonesCombate[defensor][0]?.types.map(t => t.type.name) || [];

      // Obtener el multiplicador de tipo (eficacia)
      const efectividad = await obtenerMultiplicadorTipo(tipoAtaque, tiposDefensor);

      // STAB: Si el Pokémon atacante tiene el mismo tipo que el ataque, el daño se multiplica por 1.5
      const tiposAtacante = pokemonesCombate[atacante][0]?.types.map(t => t.type.name) || [];
      const STAB = tiposAtacante.includes(tipoAtaque) ? 1.5 : 1;

      // Variación de daño entre 0.85 y 1.00
      const variacion = Math.random() * (1.00 - 0.85) + 0.85;
      
      // Cálculo del daño final
      const dañoFinal = Math.max(1, Math.floor(
          (((((2 * nivel) / 5) + 2) * poder * (ataqueStat / defensaStat)) / 50 + 2) * STAB * efectividad * variacion
      ));
      if(pokemonesCombate[atacante][0]?.stats[5].base_stat > pokemonesCombate[defensor][0]?.stats[5].base_stat){
        const newPokemones = [...pokemonesCombate];
  
        // Modificar la estadística de velocidad del defensor
        newPokemones[defensor][0].stats[5].base_stat += 200;

        // Actualizar el estado con el nuevo valor
        setPokemonesCombate(newPokemones);
        setHps((prevHps) => {
          const newHps = [...prevHps];
          newHps[defensor] = Math.max(0, prevHps[defensor] - dañoFinal);
          if (newHps[defensor] === 0) {
              alert(`${pokemonesCombate[defensor][0]?.name} ha sido derrotado!`);
              setCombate('ganador')


          }
          return newHps;
        });
      }else{
        alert(`${pokemonesCombate[atacante][0]?.name} es demasiado lento!`);
      }
      // Aplicar daño al defensor
      

      console.log(
          `${pokemonesCombate[atacante][0]?.name} usó ${movimiento[0]} contra ${pokemonesCombate[defensor][0]?.name}. 
          STAB: ${STAB}, Efectividad: ${efectividad}, Variación: ${variacion.toFixed(2)}, Daño causado: ${dañoFinal}`
      );
  };

  const reiniciarCombate = () => {
    // Restablecer los HP
    setHps([pokemonesCombate[0][0]?.stats[0].base_stat, pokemonesCombate[1][0]?.stats[0].base_stat]);
  
    // Restablecer cualquier otra variable si es necesario, por ejemplo:
    // setMovimientos([...]); si deseas restablecer los movimientos o cualquier estado que cambie durante el combate
  
    // Cambiar el estado de la vista para volver al combate
    setCombate('combate');
  };
  
  
    return (
  <div className='contenedorCombate'>
    {combate === 'pokedex' ? (
      // Vista de la Pokedex
      <div className='pantalla'>
        <div className='visualizacion'>
          <h1>{pokemon?.name ? pokemon.name[0].toUpperCase() + pokemon.name.slice(1) : "Unknown"}</h1>
          <div>
            <img
              src={pokemon?.sprites?.other.showdown.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png'}
              alt={pokemon?.name || "Pokemon"}
            />
          </div>
          <p>Altura: {pokemon?.height / 10 + 'm' || 'Unknown'}</p>
          <p>Peso: {pokemon?.weight / 100 + 'kg' || 'Unknown'}</p>
          <p>
            <strong>Tipo:</strong>{" "}
            {pokemon?.types
              ? pokemon.types.map((t) => t.type.name[0].toUpperCase() + t.type.name.slice(1)).join(" / ")
              : "Unknown"}
          </p>
        </div>
        <div className='resumen'>
          <PokemonStatsBars stats={pokemon?.stats || []} />
          {pokemon?.abilities && pokemon.abilities.length > 0
            ? pokemon.abilities.map((a, index) => (
                <a key={index} href={a.ability.url}>
                  <p>{a.ability.name[0].toUpperCase() + a.ability.name.slice(1)}</p>
                </a>
              ))
            : <p>Unknown</p>}
        </div>
        <Lista onClick={handlePokemon} combate={handleCombat} />
      </div>
    ) : combate === 'combate' ? (
      // Vista de Combate
      <div className='pantalla'>
        <div className='combatePokemon' id="pokemon1">
          <h1>{pokemonesCombate[0][0]?.name ? pokemonesCombate[0][0].name[0].toUpperCase() + pokemonesCombate[0][0].name.slice(1) : "Unknown"}</h1>
          <div>
            <img
              src={pokemonesCombate[0][0]?.sprites?.other.showdown.back_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png'}
              alt={pokemonesCombate[0][0]?.name || "Pokemon"}
            />
          </div>
          <div>
            <button onClick={() => atacar(0)}>{movimientos[0][0]}</button>
            <p>Move type: {movimientos[0][1].type.name}</p>
            <p>HP:{hps[0]}</p>
            <p>Potencia: {movimientos[0][1].power}</p>
          </div>
        </div>
        <h1 id="versus">VS</h1>
        <div className='combatePokemon' id="pokemon2">
          <h1>{pokemonesCombate[1][0]?.name ? pokemonesCombate[1][0].name[0].toUpperCase() + pokemonesCombate[1][0].name.slice(1) : "Unknown"}</h1>
          <div>
            <img
              src={pokemonesCombate[1][0]?.sprites?.other.showdown.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png'}
              alt={pokemonesCombate[1][0]?.name || "Pokemon"}
            />
          </div>
          <div>
            <button onClick={() => atacar(1)}>{movimientos[1][0]}</button>
            <p>Move type: {movimientos[1][1].type.name}</p>
            <p>HP:{hps[1]}</p>
            <p>Potencia: {movimientos[1][1].power}</p>
          </div>
        </div>
      </div>
    ) : combate === 'ganador' ? (
      // Vista de Ganador
      <div className="pantalla">
        <div className='combatePokemon' id="pokemon1">
          <h1>{pokemonesCombate[0][0]?.name ? pokemonesCombate[0][0].name[0].toUpperCase() + pokemonesCombate[0][0].name.slice(1)+ " ha ganado!" : "Unknown"}</h1>
          <div>
            <img
              src={pokemonesCombate[0][0]?.sprites?.other.showdown.back_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/201-question.png'}
              alt={pokemonesCombate[0][0]?.name || "Pokemon"}
            />
          </div>
          <div>
          <button onClick={() => setCombate('pokedex')}>Volver a la Pokedex</button>
          <button onClick={reiniciarCombate}>Reiniciar Combate</button>
          </div>
        </div>
        
      </div>
    ) : null}
  </div>
);

    
}

export default Screen;