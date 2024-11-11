// App.tsx
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import PokemonList from './components/PokemonList'; 
import PokemonDetails from './components/PokemonDetails';
import TypePokemons from './components/TypePokemons';
import TypesList from './components/TypesList';
import HomePage from './components/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/types" element={<TypesList/>}/>
        <Route path="/type/:type" element={<TypePokemons/>}/>
      </Routes>
    </div>
  );
}

export default App;
