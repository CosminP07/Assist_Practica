// App.jsx

import React, { useEffect, useState } from 'react'; // Importă React și hooks-urile useEffect și useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importă componentele necesare pentru routing
import Navbar from './components/Navbar'; // Importă componenta Navbar
import Home from './pages/Home'; // Importă pagina Home
import AllBreeds from './pages/AllBreeds'; // Importă pagina AllBreeds
import BreedDetails from './pages/BreedDetails'; // Importă pagina BreedDetails
import Favorites from './pages/Favorites'; // Importă pagina Favorites
import { getAllBreeds } from './services/dogApi'; // Importă funcția de obținere a raselor de câini de la API

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // Stare pentru textul introdus în căutare
  const [favorites, setFavorites] = useState([]); // Stare pentru ID-urile raselor favorite
  const [breeds, setBreeds] = useState([]); // Stare pentru toate rasele obținute din API

  useEffect(() => {
    // useEffect se execută o singură dată la montarea componentei
    getAllBreeds().then((res) => setBreeds(res.data)); // Apelează API-ul și setează rezultatele în starea breeds
  }, []);

  const toggleFavorite = (breedId) => {
    // Funcție care adaugă sau elimină o rasă din favorite
    setFavorites((prevFavorites) =>
      prevFavorites.includes(breedId) // Verifică dacă rasa e deja în listă
        ? prevFavorites.filter((id) => id !== breedId) // Dacă da, o elimină
        : [...prevFavorites, breedId] // Dacă nu, o adaugă
    );
  };

  return (
    <Router> {/* Componentele sunt incluse într-un Router pentru a permite navigarea */}
      <Navbar
        searchQuery={searchQuery} // Trimite starea curentă de căutare către Navbar
        setSearchQuery={setSearchQuery} // Trimite funcția care actualizează căutarea
      />
      <Routes> {/* Definește rutele aplicației */}
        <Route path="/" element={<Home />} /> {/* Ruta principală – afișează componenta Home */}
        <Route
          path="/breeds"
          element={
            <AllBreeds
              searchQuery={searchQuery} // Trimite căutarea către AllBreeds
              favorites={favorites} // Trimite lista de favorite
              onFavoriteToggle={toggleFavorite} // Trimite funcția de toggle
              breeds={breeds} // Trimite lista de rase
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites} // Trimite lista de favorite către pagina Favorites
              onFavoriteToggle={toggleFavorite} // Permite toggling din Favorites
            />
          }
        />
        <Route
          path="/breed/:id"
          element={
            <BreedDetails
              onFavoriteToggle={toggleFavorite} // Trimite funcția pentru a adăuga/elimina din favorite
              favorites={favorites} // Trimite lista de favorite
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App; // Exportă componenta App pentru a putea fi folosită în altă parte
