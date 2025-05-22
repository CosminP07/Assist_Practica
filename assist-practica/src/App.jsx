import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importarea paginilor
import Home from './pages/Home';
import AllBreeds from './pages/AllBreeds';
import BreedDetails from './pages/BreedDetails';
import Favorites from './pages/Favorites';

// Importarea componentei Navbar
import Navbar from './components/Navbar';

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // Stare pentru căutarea rasei de câini
  const [favorites, setFavorites] = useState([]); // Stare pentru lista de favorite

  // Funcție pentru a adăuga sau elimina o rasă din favorite
  const toggleFavorite = (breedId) => {
    setFavorites((prev) =>
      prev.includes(breedId)
        ? prev.filter((id) => id !== breedId)
        : [...prev, breedId]
    );
  };

  return (
    <Router>
      {/* Bara de navigație cu bara de căutare */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Definirea rutelor principale */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Trecem funcția și lista de favorite în AllBreeds */}
        <Route
          path="/breeds"
          element={
            <AllBreeds
              searchQuery={searchQuery}
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
            />
          }
        />
        <Route
  path="/breed/:id"
  element={
    <BreedDetails
      favorites={favorites}
      onFavoriteToggle={toggleFavorite}
    />
  }
/>

        <Route path="/breed/:id" element={<BreedDetails />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} />} />
      </Routes>
    </Router>
  );
}

export default App;
