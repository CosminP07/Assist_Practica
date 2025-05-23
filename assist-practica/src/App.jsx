// App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllBreeds from './pages/AllBreeds';
import BreedDetails from './pages/BreedDetails';
import Favorites from './pages/Favorites';
import { getAllBreeds } from './services/dogApi';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    getAllBreeds().then((res) => setBreeds(res.data));
  }, []);

  const toggleFavorite = (breedId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(breedId)
        ? prevFavorites.filter((id) => id !== breedId)
        : [...prevFavorites, breedId]
    );
  };

  return (
    <Router>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/breeds"
          element={
            <AllBreeds
              searchQuery={searchQuery}
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
              breeds={breeds}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              onFavoriteToggle={toggleFavorite}
            />
          }
        />
        <Route path="/breed/:id" element={<BreedDetails onFavoriteToggle={toggleFavorite} favorites={favorites} />} />
      </Routes>
    </Router>
  );
}

export default App;