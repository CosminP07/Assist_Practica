import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBreeds } from '../services/dogApi';
import Lottie from 'lottie-react';
import dogLoading from '../assets/dogLoading.json';

function Favorites({ favorites = [] }) {
  const [allBreeds, setAllBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBreeds().then((res) => {
      setAllBreeds(res.data);
      setLoading(false);
    });
  }, []);

  const favoriteBreeds = allBreeds.filter(breed => favorites.includes(breed.id));

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>❤️ Favorite Breeds</h2>

      {loading ? (
        <div style={styles.loadingWrapper}>
          <Lottie animationData={dogLoading} loop autoplay style={{ width: 200, height: 200 }} />
        </div>
      ) : favoriteBreeds.length === 0 ? (
        <div style={styles.loadingWrapper}>
          <Lottie animationData={dogLoading} loop autoplay style={{ width: 200, height: 200 }} />
          <p>No favorites yet. Go add some!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {favoriteBreeds.map((breed) => (
            <div
              key={breed.id}
              style={styles.card}
              onClick={() => navigate(`/breed/${breed.id}`)}
            >
              <h3>{breed.name}</h3>
              {breed.image?.url && (
                <img src={breed.image.url} alt={breed.name} style={styles.image} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
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
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    fontSize: '1.2rem',
  }
};
