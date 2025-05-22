import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomImage } from '../services/dogApi';

function Home() {
  const [dog, setDog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getRandomImage().then(res => {
      if (res.data && res.data.length > 0) {
        const imageData = res.data[0];
        setDog({
          url: imageData.url,
          breed: imageData.breeds[0], // include date despre rasa
          id: imageData.id
        });
      }
    });
  }, []);

  const handleClick = () => {
    if (dog?.breed?.id) {
      navigate(`/breed/${dog.breed.id}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>🐾 Dog of the Moment 🐾</h2>

      {dog && (
        <div
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            display: 'inline-block',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <img
            src={dog.url}
            alt="Random Dog"
            style={{
              width: '350px',
              height: '350px',
              objectFit: 'cover',
              borderRadius: 'inherit'
            }}
          />
          <p style={{ fontWeight: 'bold', backgroundColor: '#4CAF50', color: 'white', margin: 0, padding: '10px' }}>
            {dog.breed?.name}
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
