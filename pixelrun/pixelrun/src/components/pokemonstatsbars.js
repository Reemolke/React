import React from 'react';

const PokemonStatsBars = ({ stats }) => {
  // Función para normalizar el valor de la estadística
  const normalizeStat = (value) => {
    return (value / 255) * 100; // Normalizar entre 0 y 100 (ya que el máximo es 255)
  };

  return (
    <div>
      <h3>Estadísticas del Pokémon</h3>
      <div className="stats-container">
        {stats.map((stat) => (
          <div key={stat.stat.name} className="stat-item">
            <span className="stat-name">{stat.stat.name.toUpperCase()}</span>
            <div className="stat-bar-container">
              <div
                className="stat-bar"
                style={{ width: `${normalizeStat(stat.base_stat)}%` }}
              >
                <span className="stat-value">{stat.base_stat}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStatsBars;
