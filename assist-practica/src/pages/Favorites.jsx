import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBreeds } from '../services/dogApi';

function Favorites({ favorites }) {
  const [allBreeds, setAllBreeds] = useState([]);
  const navigate = useNavigate();

  // Fetch toate rasele la montare (pentru a extrage datele favoritelor)
  useEffect(() => {
    getAllBreeds().then((res) => {
      setAllBreeds(res.data);
    });
  }, []);

  // Filtrăm doar rasele care se află în lista de favorite
  const favoriteBreeds = allBreeds.filter((breed) => favorites.includes(breed.id));

  return (
    <div style={styles.container}>
      <h2>My Favorite Breeds</h2>
      {favoriteBreeds.length === 0 && <p>No favorites yet. Go add some!</p>}
      <div style={styles.grid}>
        {favoriteBreeds.map((breed) => (
          <div
            key={breed.id}
            style={styles.card}
            onClick={() => navigate(`/breed/${breed.id}`)} // Navighează la BreedDetails
          >
            <h3>{breed.name}</h3>
            {breed.image?.url && (
              <img
                src={breed.image.url}
                alt={breed.name}
                style={styles.image}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

// 🖌 Stiluri moderne pentru grid și carduri
const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '15px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px',
  },
};
