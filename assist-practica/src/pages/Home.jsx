import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomImage } from '../services/dogApi';

function Home() {
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function fetchValidDogImage() {
      try {
        let imageData = null;

        while (mounted && (!imageData || !imageData.breeds || imageData.breeds.length === 0)) {
          const res = await getRandomImage();
          if (res.data && res.data.length > 0) {
            imageData = res.data[0];
          }
        }

        if (mounted && imageData && imageData.breeds.length > 0) {
          setDog({
            url: imageData.url,
            breed: imageData.breeds[0],
            id: imageData.id
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching dog image:", err);
      }
    }

    fetchValidDogImage();

    return () => {
      mounted = false;
    };
  }, []);

  const handleClick = () => {
    if (dog?.breed?.id) {
      navigate(`/breed/${dog.breed.id}`);
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>

      <h2 style={styles.title}>🐾 Dog of the Moment 🐾</h2>

      {loading ? (
        <div style={{ ...styles.card, ...styles.skeletonCard }}>
          <div style={styles.skeletonImage}></div>
          <div style={styles.skeletonText}></div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          style={styles.card}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img
            src={dog.url}
            alt="Random Dog"
            style={styles.image}
          />
          <p style={styles.breedName}>{dog.breed?.name}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  card: {
    cursor: 'pointer',
    display: 'inline-block',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    transition: 'transform 0.3s',
    width: '100%',
    maxWidth: '350px',
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: '1 / 1',
    objectFit: 'cover',
    borderRadius: 'inherit'
  },
  breedName: {
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: 'white',
    margin: 0,
    padding: '10px',
    fontSize: '1rem',
  },
  skeletonCard: {
    backgroundColor: '#f0f0f0',
  },
  skeletonImage: {
    width: '100%',
    height: '350px',
    backgroundColor: '#ddd',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
  skeletonText: {
    height: '40px',
    backgroundColor: '#ccc',
    marginTop: '0',
    animation: 'pulse 1.5s ease-in-out infinite',
  },
};

export default Home;
