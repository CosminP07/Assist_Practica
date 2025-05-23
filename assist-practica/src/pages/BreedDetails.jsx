import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllBreeds, getImagesByBreed } from '../services/dogApi';
import Lottie from 'lottie-react';
import dogLoading from '../assets/dogLoading.json';

function BreedDetails({ onFavoriteToggle, favorites }) {
  const { id } = useParams();
  const [breed, setBreed] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const breedRes = await getAllBreeds();
        const found = breedRes.data.find((b) => b.id.toString() === id);
        if (mounted) setBreed(found);

        const imagesRes = await getImagesByBreed(id);
        if (mounted) setImages(imagesRes.data);
      } catch (err) {
        console.error('Error fetching breed details:', err);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (!breed || images.length === 0) {
    return (
      <div style={styles.loadingWrapper}>
        <Lottie animationData={dogLoading} loop autoplay style={{ width: 200, height: 200 }} />
      </div>
    );
  }

  const isFavorite = favorites?.includes(breed.id);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{breed.name}</h2>
      <button style={styles.button} onClick={() => onFavoriteToggle(breed.id)}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <div style={styles.infoBox}>
        <p><strong>Temperament:</strong> {breed.temperament}</p>
        <p><strong>Origin:</strong> {breed.origin || 'Unknown'}</p>
        <p><strong>Life Span:</strong> {breed.life_span}</p>
        <p><strong>Height:</strong> {breed.height.metric} cm</p>
        <p><strong>Weight:</strong> {breed.weight.metric} kg</p>
      </div>

      <div style={styles.imageGrid}>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={breed.name}
            style={styles.image}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  loadingWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '60vh'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px'
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  infoBox: {
    marginTop: '20px',
    textAlign: 'left',
    lineHeight: '1.6',
    color: '#333'
  },
  imageGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '20px',
    gap: '15px'
  },
  image: {
    width: '400px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease'
  }
};

export default BreedDetails;
