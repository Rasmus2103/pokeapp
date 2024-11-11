import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/TypePokemons.css'; 

interface Pokemon {
  pokemon:  {
    name: string;
    url: string;
  };
}

interface TypeDetailResponse {
  pokemon: Pokemon[];
}

const TypePokemons: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonsByType = async () => {
      try {
        const response = await axios.get<TypeDetailResponse>(`https://localhost:7180/api/pokemon/type/${type}`);
        setPokemons(response.data.pokemon);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon by type:', error);
        setError('Failed to fetch Pokémon by type.');
        setLoading(false);
      }
    };

    fetchPokemonsByType();
  }, [type]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Pokémon of Type: {type}</h1>
      <ul>
        {pokemons.map((p, index) => (
          <li key={index}>{p.pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TypePokemons;
