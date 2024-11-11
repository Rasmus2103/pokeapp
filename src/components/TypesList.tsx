import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/TypesList.css';

interface Type {
  name: string;
  url: string;
}

interface TypeResponse {
  results: Type[];
}

const TypesList: React.FC = () => {
  const [types, setTypes] = useState<Type[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await axios.get<TypeResponse>('https://localhost:7180/api/pokemon/types');
        setTypes(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon types:', error);
        setError('Failed to fetch Pokémon types.');
        setLoading(false);
      }
    };

    fetchTypes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Pokémon Types</h1>
      <ul>
        {types.map((type, index) => (
          <li key={index}>
            <Link to={`/type/${type.name}`}>{type.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypesList;
