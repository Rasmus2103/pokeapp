// App.tsx
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import PokemonList from './components/PokemonList'; 
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </div>
  );
}

export default App;
