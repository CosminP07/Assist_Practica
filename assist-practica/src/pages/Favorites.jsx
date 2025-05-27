import React, { useEffect, useState } from 'react'; // Importă React și hook-urile useEffect și useState din React
import { useNavigate } from 'react-router-dom'; // Importă useNavigate pentru navigarea programatică între pagini
import { getAllBreeds } from '../services/dogApi'; // Importă funcția pentru obținerea tuturor raselor de câini
import Lottie from 'lottie-react'; // Importă Lottie pentru afișarea animațiilor
import dogLoading from '../assets/dogLoading.json'; // Importă animația de tip JSON pentru afișarea unui câine

function Favorites({ favorites = [] }) { // Componenta Favorites primește ca prop o listă de ID-uri favorite
  const [allBreeds, setAllBreeds] = useState([]); // Starea care stochează toate rasele de câini
  const [loading, setLoading] = useState(true); // Starea care controlează afișarea stării de încărcare
  const navigate = useNavigate(); // Hook pentru navigare

  useEffect(() => {
    getAllBreeds().then((res) => { // Apelează API-ul pentru a obține toate rasele
      setAllBreeds(res.data); // Stochează rasele în stare
      setLoading(false); // Dezactivează indicatorul de încărcare
    });
  }, []); // Efectul rulează o singură dată la montarea componentei

  const favoriteBreeds = allBreeds.filter(breed => favorites.includes(breed.id)); // Filtrează doar rasele ale căror ID-uri sunt în lista de favorite

  return (
    <div style={styles.container}> {/* Container principal al componentei */}
      <h2 style={styles.title}>❤️ Favorite Breeds</h2> {/* Titlu pagină */}

      {loading ? ( // Dacă datele încă se încarcă
        <div style={styles.loadingWrapper}> {/* Wrapper pentru animația de încărcare */}
          <Lottie animationData={dogLoading} loop autoplay style={{ width: 200, height: 200 }} /> {/* Animație */}
        </div>
      ) : favoriteBreeds.length === 0 ? ( // Dacă nu sunt rase favorite
        <div style={styles.loadingWrapper}> {/* Wrapper pentru mesajul de lipsă a favoritelor */}
          <Lottie animationData={dogLoading} loop autoplay style={{ width: 200, height: 200 }} /> {/* Animație */}
          <p>No favorites yet. Go add some!</p> {/* Mesaj informativ */}
        </div>
      ) : ( // Dacă sunt favorite disponibile
        <div style={styles.grid}> {/* Grid pentru afișarea cardurilor */}
          {favoriteBreeds.map((breed) => ( // Parcurge lista de rase favorite
            <div
              key={breed.id} // Cheie unică pentru fiecare card
              style={styles.card} // Stilul cardului
              onClick={() => navigate(`/breed/${breed.id}`)} // Navighează la pagina cu detalii
            >
              <h3>{breed.name}</h3> {/* Afișează numele rasei */}
              {breed.image?.url && ( // Dacă rasa are imagine
                <img src={breed.image.url} alt={breed.name} style={styles.image} /> // Afișează imaginea cu stilul aferent
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites; // Exportă componenta pentru a fi folosită în aplicație

// Obiect cu stiluri inline pentru componentă
const styles = {
  container: {
    padding: '20px', // Spațiere internă
    textAlign: 'center', // Aliniere centrală a textului
    maxWidth: '1200px', // Lățime maximă
    margin: '0 auto', // Centrare orizontală
  },
  title: {
    fontSize: '2rem', // Dimensiune font titlu
    marginBottom: '20px', // Spațiere sub titlu
  },
  grid: {
    display: 'grid', // Afișare tip grilă
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Coloane responsive
    gap: '20px', // Spațiere între carduri
  },
  card: {
    backgroundColor: '#ffffff', // Fundal alb
    borderRadius: '16px', // Colțuri rotunjite
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Umbră subtilă
    padding: '15px', // Spațiere internă
    cursor: 'pointer', // Cursor pointer la hover
    transition: 'transform 0.3s ease', // Animație ușoară la hover
  },
  image: {
    width: '100%', // Lățime completă
    height: '200px', // Înălțime fixă
    objectFit: 'cover', // Imaginea este decupată fără deformare
    borderRadius: '12px', // Colțuri rotunjite pentru imagine
  },
  loadingWrapper: {
    display: 'flex', // Afișare flex
    flexDirection: 'column', // Elementele una sub alta
    alignItems: 'center', // Aliniere pe axa transversală
    justifyContent: 'center', // Centrare verticală
    padding: '40px', // Spațiere
    fontSize: '1.2rem', // Dimensiune font
  }
};
