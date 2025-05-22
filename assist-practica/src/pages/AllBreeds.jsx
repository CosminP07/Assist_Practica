import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBreeds } from '../services/dogApi';

function AllBreeds({ searchQuery, favorites, onFavoriteToggle }) {
  const [breeds, setBreeds] = useState([]);
  const navigate = useNavigate();

  // Fetch rase la montarea componentei
  useEffect(() => {
    getAllBreeds().then((res) => {
      setBreeds(res.data);
    });
  }, []);

  const filteredBreeds = breeds.filter((breed) =>
    breed.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {filteredBreeds.map((breed) => (
        <div
          key={breed.id}
          style={styles.card}
          onClick={() => navigate(`/breed/${breed.id}`)} // Navighează la pagina rasei
        >
          <h3>{breed.name}</h3>
          {breed.image && (
            <img
              src={breed.image.url}
              alt={breed.name}
              style={styles.image}
            />
          )}
          {/* Prevenim propagarea clickului de pe buton către card */}
          <button
            style={styles.button}
            onClick={(e) => {
              e.stopPropagation(); // Previne navigarea
              onFavoriteToggle?.(breed.id); // Adaugă/șterge din favorite
            }}
          >
            {favorites.includes(breed.id) ? '★ Remove from Favorites' : '☆ Add to Favorites'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default AllBreeds;

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '15px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer', // Indică că este clickabil
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};
