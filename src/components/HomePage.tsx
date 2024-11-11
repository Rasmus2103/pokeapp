import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css'; 

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Pokémon App</h1>
      <div className="navigation-links">
        <Link to="/pokemon">View Pokémon List</Link>
        <Link to="/types">View Pokémon Types</Link>
      </div>
    </div>
  );
};

export default HomePage;
