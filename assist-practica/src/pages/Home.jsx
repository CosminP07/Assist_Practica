import React, { useEffect, useState } from 'react'; // Importă React și hook-urile useEffect și useState
import { useNavigate } from 'react-router-dom'; // Importă hook-ul useNavigate pentru navigare între rute
import { getRandomImage } from '../services/dogApi'; // Importă funcția care aduce o imagine aleatoare cu un câine din API

function Home() { // Definirea componentei Home
  const [dog, setDog] = useState(null); // Stare pentru a reține câinele obținut
  const [loading, setLoading] = useState(true); // Stare pentru afișarea încărcării
  const navigate = useNavigate(); // Inițializează hook-ul pentru navigare

  useEffect(() => {
    let mounted = true; // Flag pentru a evita setarea stării după demontarea componentei

    async function fetchValidDogImage() {
      try {
        let imageData = null; // Inițializează variabila pentru datele imaginii

        while (mounted && (!imageData || !imageData.breeds || imageData.breeds.length === 0)) {
          const res = await getRandomImage(); // Apelează API-ul pentru o imagine aleatoare
          if (res.data && res.data.length > 0) {
            imageData = res.data[0]; // Extrage prima imagine
          }
        }

        if (mounted && imageData && imageData.breeds.length > 0) {
          setDog({
            url: imageData.url, // Setează URL-ul imaginii
            breed: imageData.breeds[0], // Setează obiectul cu rasa
            id: imageData.id // Setează ID-ul imaginii
          });
          setLoading(false); // Dezactivează încărcarea
        }
      } catch (err) {
        console.error("Error fetching dog image:", err); // Afișează erori în consolă dacă apar
      }
    }

    fetchValidDogImage(); // Apelează funcția pentru a obține un câine valid

    return () => {
      mounted = false; // Setează flag-ul ca false la demontare
    };
  }, []); // Efectul rulează o singură dată la montare

  const handleClick = () => {
    if (dog?.breed?.id) {
      navigate(`/breed/${dog.breed.id}`); // Navighează către pagina cu detalii pentru rasa respectivă
    }
  };

  return (
    <div style={styles.container}> {/* Containerul principal */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style> {/* Definește o animație CSS pentru efect de "pulse" la skeleton */}

      <h2 style={styles.title}>🐾 Dog of the Moment 🐾</h2> {/* Titlul paginii */}

      {loading ? ( // Dacă e în modul de încărcare
        <div style={{ ...styles.card, ...styles.skeletonCard }}> {/* Afișează skeleton UI */}
          <div style={styles.skeletonImage}></div> {/* Placeholder pentru imagine */}
          <div style={styles.skeletonText}></div> {/* Placeholder pentru text */}
        </div>
      ) : (
        <div
          onClick={handleClick} // Navighează către pagina rasei când se dă click
          style={styles.card} // Stilul cardului
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')} // Mărește cardul la hover
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Revine la dimensiunea normală la ieșirea mouse-ului
        >
          <img
            src={dog.url} // Sursa imaginii
            alt="Random Dog" // Text alternativ
            style={styles.image} // Stilul imaginii
          />
          <p style={styles.breedName}>{dog.breed?.name}</p> {/* Afișează numele rasei */}
        </div>
      )}
    </div>
  );
}

// Obiect cu stiluri inline pentru componenta Home
const styles = {
  container: {
    textAlign: 'center', // Centrare text
    padding: '40px 20px', // Spațiere internă
    maxWidth: '800px', // Lățime maximă a containerului
    margin: '0 auto', // Centrare pe orizontală
  },
  title: {
    fontSize: '2rem', // Dimensiune font mare pentru titlu
    marginBottom: '20px', // Spațiere sub titlu
  },
  card: {
    cursor: 'pointer', // Cursor pointer la hover
    display: 'inline-block', // Afișare pe linie
    borderRadius: '20px', // Colțuri rotunjite
    overflow: 'hidden', // Ascunde conținutul ce depășește marginile
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)', // Umbră
    transition: 'transform 0.3s', // Tranziție smooth pentru transform
    width: '100%', // Lățime completă
    maxWidth: '350px', // Lățime maximă
  },
  image: {
    width: '100%', // Lățime completă a imaginii
    height: 'auto', // Înălțime automată
    aspectRatio: '1 / 1', // Păstrează aspectul pătrat
    objectFit: 'cover', // Decupează imaginea astfel încât să acopere containerul
    borderRadius: 'inherit' // Păstrează colțurile rotunjite
  },
  breedName: {
    fontWeight: 'bold', // Text îngroșat
    backgroundColor: '#4CAF50', // Fundal verde
    color: 'white', // Text alb
    margin: 0, // Fără margine
    padding: '10px', // Spațiere internă
    fontSize: '1rem', // Dimensiune text
  },
  skeletonCard: {
    backgroundColor: '#f0f0f0', // Fundal gri deschis pentru skeleton
  },
  skeletonImage: {
    width: '100%', // Lățime completă
    height: '350px', // Înălțime fixă
    backgroundColor: '#ddd', // Fundal gri
    animation: 'pulse 1.5s ease-in-out infinite', // Aplica animația pulse
  },
  skeletonText: {
    height: '40px', // Înălțime text
    backgroundColor: '#ccc', // Fundal gri
    marginTop: '0', // Fără margine sus
    animation: 'pulse 1.5s ease-in-out infinite', // Animație
  },
};

export default Home; // Exportă componenta Home pentru a fi folosită în aplicație
