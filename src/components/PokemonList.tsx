import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PokemonList.css';


interface Pokemon {
  name: string;
  url: string;
}

interface PokemonResponse {
  results: Pokemon[];
}

const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [limit, setLimit] = useState<number>(20); // Set default limit to 20
    const [offset, setOffset] = useState<number>(0); // Set default offset to 0
    const [totalCount, setTotalCount] = useState<number>(0); // Total number of Pokémon
  
    // Fetch paginated data from the API
    useEffect(() => {
      const fetchPokemonList = async () => {
          setLoading(true);
          try {
            const response = await axios.get(`https://localhost:7180/api/pokemon?limit=${limit}&offset=${offset}`);
            setPokemonList(response.data.results);
            setTotalCount(response.data.count); // Assuming your API returns 'count' for the total Pokémon available
            setLoading(false);
          } catch (error) {
            console.error('Error fetching Pokémon list:', error);
            setError('Failed to fetch Pokémon list.');
            setLoading(false);
          }
        };
  
      fetchPokemonList();
    }, [limit, offset]); // Re-fetch data when limit or offset changes
  
    // Function to handle page change
    const handleNextPage = () => {
      setOffset((prevOffset) => prevOffset + limit);
    };
  
    const handlePreviousPage = () => {
      if (offset > 0) {
        setOffset((prevOffset) => prevOffset - limit);
      }
    };
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLimit(Number(e.target.value));
      setOffset(0); // Reset offset when changing the limit
    };
    
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = Math.floor(offset / limit) + 1;
  
    return (
      <div className="pokemon-list-container">
        <h1>Pokémon List</h1>
  
        {/* Dropdown for changing limit */}
        <div className="limit-dropdown">
          <label>Pokémon per page:</label>
          <select value={limit} onChange={handleLimitChange}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
  
        <ul>
          {pokemonList.map((pokemon, index) => (
            <li key={index}>
              <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
            </li>
          ))}
        </ul>
  
        {/* Pagination Info */}
        <div className="pagination-info">
          Page {currentPage} of {totalPages} (Total Pokémon: {totalCount})
        </div>
  
        {/* Pagination Controls */}
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={offset === 0}>
            Previous
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    );
  };
  
  export default PokemonList;
  