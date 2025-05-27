import React, { useEffect, useState } from 'react'; // Importă React și hook-urile useEffect și useState
import { useParams } from 'react-router-dom'; // Importă hook-ul useParams pentru a extrage ID-ul din URL
import { getAllBreeds, getImagesByBreed } from '../services/dogApi'; // Importă funcțiile pentru a obține datele despre rase și imaginile lor
import Lottie from 'lottie-react'; // Importă componenta Lottie pentru animații
import dogLoading from '../assets/dogLoading.json'; // Importă fișierul JSON cu animația de încărcare

function BreedDetails({ onFavoriteToggle, favorites }) { // Componenta BreedDetails primește două props: funcția de toggle și lista de favorite
  const { id } = useParams(); // Extrage ID-ul rasei din URL
  const [breed, setBreed] = useState(null); // Inițializează starea pentru rasa curentă
  const [images, setImages] = useState([]); // Inițializează starea pentru imaginile rasei

  useEffect(() => {
    let mounted = true; // Flag pentru a preveni setarea stării după demontare

    async function fetchData() {
      try {
        const breedRes = await getAllBreeds(); // Apelează API-ul pentru a obține toate rasele
        const found = breedRes.data.find((b) => b.id.toString() === id); // Găsește rasa cu ID-ul potrivit
        if (mounted) setBreed(found); // Dacă componenta e montată, setează rasa

        const imagesRes = await getImagesByBreed(id); // Apelează API-ul pentru a obține imaginile acelei rase
        if (mounted) setImages(imagesRes.data); // Setează imaginile în stare
      } catch (err) {
        console.error('Error fetching breed details:', err); // Afișează eroare în consolă dacă apare
      }
    }

    fetchData(); // Apelează funcția imediat după montare

    return () => {
      mounted = false; // La demontare, oprește orice actualizare de stare
    };
  }, [id]); // Efectul se reexecută dacă se schimbă ID-ul

  if (!breed || images.length === 0) {
    return (
      <div style={styles.loadingWrapper}> {/* Afișează animația dacă datele nu sunt încă disponibile */}
        <Lottie animationData={dogLoading} loop autoplay style={{ width: 200, height: 200 }} />
      </div>
    );
  }

  const isFavorite = favorites?.includes(breed.id); // Verifică dacă rasa curentă este în lista de favorite

  return (
    <div style={styles.container}> {/* Wrapper-ul general al paginii de detalii */}
      <h2 style={styles.title}>{breed.name}</h2> {/* Afișează numele rasei */}
      <button style={styles.button} onClick={() => onFavoriteToggle(breed.id)}> {/* Butonul pentru adăugare/eliminare din favorite */}
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} {/* Textul din buton se schimbă în funcție de stare */}
      </button>

      <div style={styles.infoBox}> {/* Afișează informații detaliate despre rasa curentă */}
        <p><strong>Temperament:</strong> {breed.temperament}</p> {/* Temperamentul */}
        <p><strong>Origin:</strong> {breed.origin || 'Unknown'}</p> {/* Originea (sau Unknown dacă nu există) */}
        <p><strong>Life Span:</strong> {breed.life_span}</p> {/* Durata de viață */}
        <p><strong>Height:</strong> {breed.height.metric} cm</p> {/* Înălțimea în cm */}
        <p><strong>Weight:</strong> {breed.weight.metric} kg</p> {/* Greutatea în kg */}
      </div>

      <div style={styles.imageGrid}> {/* Grid-ul pentru imaginile rasei */}
        {images.map((img) => (
          <img
            key={img.id} // Cheia unică pentru fiecare imagine
            src={img.url} // Sursa imaginii
            alt={breed.name} // Text alternativ
            style={styles.image} // Stilul imaginii
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px', // Lățime maximă a containerului
    margin: '40px auto', // Spațiere și centrare
    padding: '20px', // Padding intern
    backgroundColor: 'white', // Fundal alb
    borderRadius: '16px', // Colțuri rotunjite
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Umbră subtilă
    textAlign: 'center' // Aliniere centrală a conținutului
  },
  loadingWrapper: {
    display: 'flex', // Flexbox
    justifyContent: 'center', // Centrare pe orizontală
    alignItems: 'center', // Centrare pe verticală
    height: '60vh' // Înălțime de 60% din viewport
  },
  title: {
    fontSize: '2rem', // Dimensiune mare pentru titlu
    marginBottom: '10px' // Spațiere sub titlu
  },
  button: {
    marginTop: '10px', // Spațiere deasupra
    padding: '10px 20px', // Padding intern
    backgroundColor: '#4CAF50', // Fundal verde
    color: 'white', // Text alb
    border: 'none', // Fără chenar
    borderRadius: '6px', // Colțuri rotunjite
    fontWeight: 'bold', // Text îngroșat
    cursor: 'pointer', // Cursor pointer la hover
    transition: 'background-color 0.3s' // Tranziție smooth
  },
  infoBox: {
    marginTop: '20px', // Spațiere sus
    textAlign: 'left', // Aliniere stânga pentru text
    lineHeight: '1.6', // Spațiere între linii
    color: '#333' // Culoare text gri închis
  },
  imageGrid: {
    display: 'flex', // Afișare în grid folosind flex
    flexWrap: 'wrap', // Elemente pe mai multe linii dacă este nevoie
    justifyContent: 'center', // Centrare orizontală
    marginTop: '20px', // Spațiere deasupra
    gap: '15px' // Distanță între imagini
  },
  image: {
    width: '400px', // Lățime fixă
    height: '300px', // Înălțime fixă
    objectFit: 'cover', // Umple containerul fără a deforma imaginea
    borderRadius: '10px', // Colțuri rotunjite
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)', // Umbră subtilă
    transition: 'transform 0.3s ease' // Tranziție pentru transformări
  }
};

export default BreedDetails; // Exportă componenta pentru a fi folosită în aplicație
