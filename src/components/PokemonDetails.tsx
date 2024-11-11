import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/PokemonDetails.css'; // Assuming your styles are in this file

interface Sprites {
  front_default: string;
}

interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Pokemon {
  name: string;
  sprites: Sprites;
  types: Types[];
  abilities: Ability[];
  stats: Stats[];
}

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Pokémon details by name
  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get<Pokemon>(`https://localhost:7180/api/pokemon/name/${name}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        setError('Failed to fetch Pokémon details.');
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);


  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!pokemon) return <div className="no-data-message">No data available.</div>;

  const baseStatsTotal = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);

  return (
    <div className="pokemon-details-container">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <div className="details">
        {/* Display Pokémon Types */}
        <h2>Types</h2>
        <ul>
          {pokemon.types.map((type, index) => (
            <li key={index}>{type.type.name}</li>
          ))}
        </ul>

        {/* Display Abilities */}
        <h2>Abilities</h2>
        <ul>
          {pokemon.abilities.map((ability, index) => (
            <li key={index}>
              {ability.ability.name} {ability.is_hidden ? '(Hidden Ability)' : ''}
            </li>
          ))}
        </ul>

        {/* Display Stats */}
        <h2>Stats</h2>
        <ul>
          <h3>Total Base Stats: {baseStatsTotal}</h3>
          {pokemon.stats.map((stat, index) => (
            <li key={index}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;
