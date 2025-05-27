import React, { useEffect, useState } from 'react'; // Importă React și hook-urile pentru efecte secundare și stare
import { useNavigate } from 'react-router-dom'; // Hook pentru navigare programatică între rute
import Lottie from 'lottie-react'; // Lottie pentru animații JSON
import dogLoading from '../assets/dogLoading.json'; // Importă animația de încărcare

// Componenta AllBreeds primește props de la App: query-ul de căutare, favoritele, funcția de toggle și lista de rase
function AllBreeds({ searchQuery, favorites, onFavoriteToggle, breeds }) {
  const [filteredBreeds, setFilteredBreeds] = useState([]); // Rasele filtrate după căutare și filtre
  const [loading, setLoading] = useState(true); // Starea de încărcare inițială
  const [groupFilter, setGroupFilter] = useState(''); // Filtru pentru grup
  const [sizeFilter, setSizeFilter] = useState(''); // Filtru pentru dimensiune
  const [originFilter, setOriginFilter] = useState(''); // Filtru pentru origine
  const [sortOption, setSortOption] = useState(''); // Opțiune de sortare
  const [favoritesOnly, setFavoritesOnly] = useState(false); // Afișează doar favoritele dacă e activat

  const navigate = useNavigate(); // Hook pentru navigare către pagina de detalii

  useEffect(() => {
    if (breeds.length > 0) {
      setLoading(false); // Oprește încărcarea când s-au primit rasele
    }
  }, [breeds]); // Rulează când se schimbă lista de rase

  useEffect(() => {
    let filtered = breeds; // Începem cu toate rasele

    if (searchQuery) {
      const query = searchQuery.toLowerCase(); // Transformă în litere mici
      filtered = filtered.filter((b) => b.name.toLowerCase().startsWith(query)); // Filtrează după începutul numelui
    }

    if (groupFilter) filtered = filtered.filter((b) => b.breed_group === groupFilter); // Filtru după grup
    if (originFilter) filtered = filtered.filter((b) => b.origin === originFilter); // Filtru după origine

    if (sizeFilter) {
      filtered = filtered.filter((b) => {
        if (!b.weight?.metric) return false; // Ignoră dacă nu are greutate
        const weight = parseInt(b.weight.metric.split(' - ')[0]); // Ia greutatea minimă
        if (sizeFilter === 'small') return weight < 10; // Sub 10 kg
        if (sizeFilter === 'medium') return weight >= 10 && weight <= 25; // Între 10-25 kg
        if (sizeFilter === 'large') return weight > 25; // Peste 25 kg
        return true;
      });
    }

    if (favoritesOnly) {
      filtered = filtered.filter((b) => favorites.includes(b.id)); // Doar cele din favorite
    }

    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name)); // Sortare A-Z
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name)); // Sortare Z-A
        break;
      case 'weight-asc':
        filtered.sort((a, b) =>
          parseInt(a.weight?.metric?.split(' - ')[0] || 0) -
          parseInt(b.weight?.metric?.split(' - ')[0] || 0)
        ); // Greutate crescătoare
        break;
      case 'weight-desc':
        filtered.sort((a, b) =>
          parseInt(b.weight?.metric?.split(' - ')[0] || 0) -
          parseInt(a.weight?.metric?.split(' - ')[0] || 0)
        ); // Greutate descrescătoare
        break;
      case 'lifespan-asc':
        filtered.sort((a, b) =>
          parseInt(a.life_span?.split(' ')[0] || 0) -
          parseInt(b.life_span?.split(' ')[0] || 0)
        ); // Durata de viață crescătoare
        break;
      case 'lifespan-desc':
        filtered.sort((a, b) =>
          parseInt(b.life_span?.split(' ')[0] || 0) -
          parseInt(a.life_span?.split(' ')[0] || 0)
        ); // Durata de viață descrescătoare
        break;
    }

    setFilteredBreeds(filtered); // Setează rasele filtrate
  }, [searchQuery, breeds, groupFilter, sizeFilter, originFilter, sortOption, favoritesOnly, favorites]); // Recalculează când se modifică oricare dintre dependențe

  const resetFilters = () => {
    setGroupFilter('');
    setSizeFilter('');
    setOriginFilter('');
    setSortOption('');
    setFavoritesOnly(false); // Resetează toate filtrele
  };

  const uniqueGroups = [...new Set(breeds.map((b) => b.breed_group).filter(Boolean))]; // Extrage grupurile unice
  const uniqueOrigins = [...new Set(breeds.map((b) => b.origin).filter(Boolean))]; // Extrage originile unice

  return (
  <div style={styles.pageWrapper}> {/* Containerul general care înfășoară întreaga pagină */}

    <div style={styles.filtersWrapper}> {/* Bara superioară cu filtrele de căutare */}

      <select style={styles.select} value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}> {/* Selector pentru filtrarea după grup */}
        <option value="">Filter by Group</option> {/* Opțiunea implicită fără filtru */}
        {uniqueGroups.map((g) => ( // Iterează prin toate grupurile unice
          <option key={g} value={g}>{g}</option> // Creează o opțiune în select pentru fiecare grup
        ))}
      </select>

      <select style={styles.select} value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}> {/* Selector pentru filtrare după mărime */}
        <option value="">Filter by Size</option> {/* Opțiune implicită */}
        <option value="small">Small</option> {/* Filtru pentru rase mici */}
        <option value="medium">Medium</option> {/* Filtru pentru rase medii */}
        <option value="large">Large</option> {/* Filtru pentru rase mari */}
      </select>

      <select style={styles.select} value={originFilter} onChange={(e) => setOriginFilter(e.target.value)}> {/* Selector pentru filtrare după origine */}
        <option value="">Filter by Origin</option> {/* Opțiune implicită */}
        {uniqueOrigins.map((o) => ( // Iterează prin originile unice
          <option key={o} value={o}>{o}</option> // Creează o opțiune pentru fiecare origine
        ))}
      </select>

      <select style={styles.select} value={sortOption} onChange={(e) => setSortOption(e.target.value)}> {/* Selector pentru sortarea listei */}
        <option value="">Sort By</option> {/* Opțiune implicită */}
        <option value="name-asc">Name (Z-A)</option> {/* Sortare alfabetică descrescătoare */}
        <option value="name-desc">Name (A-Z)</option> {/* Sortare alfabetică crescătoare */}
        <option value="weight-asc">Weight (High to Low)</option> {/* Sortare după greutate descrescătoare */}
        <option value="weight-desc">Weight (Low to High)</option> {/* Sortare după greutate crescătoare */}
        <option value="lifespan-asc">Lifespan (Long → Short)</option> {/* Sortare după durată de viață descrescătoare */}
        <option value="lifespan-desc">Lifespan (Short → Long)</option> {/* Sortare după durată de viață crescătoare */}
      </select>

      <label style={styles.checkboxLabel}> {/* Etichetă pentru checkbox-ul de filtrare favorite */}
        <input type="checkbox" checked={favoritesOnly} onChange={() => setFavoritesOnly(!favoritesOnly)} /> {/* Bifă pentru a afișa doar favoritele */}
        Favorites only {/* Textul etichetei */}
      </label>

      <button style={styles.resetBtn} onClick={resetFilters}>Reset Filters</button> {/* Buton care resetează toate filtrele */}
    </div>

    {searchQuery && filteredBreeds.length > 0 && ( // Dacă există un termen de căutare și rase filtrate
      <div style={styles.nameSuggestions}> {/* Afișează sugestiile autocomplete */}
        <h4>Rase potrivite:</h4> {/* Titlul sugestiilor */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}> {/* Elimină stilurile implicite ale listei */}
          {filteredBreeds.map((b) => ( // Iterează prin rasele filtrate
            <li
              key={b.id}
              style={styles.suggestionItem}
              onClick={() => navigate(`/breed/${b.id}`)} // Navighează către detaliile rasei la click
            >
              {b.name} {/* Numele rasei afișat */}
            </li>
          ))}
        </ul>
      </div>
    )}

    {loading ? ( // Dacă aplicația este în stare de încărcare
      <div style={styles.loadingWrapper}> {/* Container pentru animația de încărcare */}
        <Lottie animationData={dogLoading} loop autoplay style={{ width: 200, height: 200 }} /> {/* Animația de tip Lottie */}
      </div>
    ) : ( // Dacă nu se mai încarcă
      <div style={styles.container}> {/* Container pentru cardurile cu rase */}
        {filteredBreeds.map((breed) => ( // Iterează prin fiecare rasă filtrată
          <div
            key={breed.id}
            style={styles.card}
            onClick={() => navigate(`/breed/${breed.id}`)} // Navighează la pagina detaliată când se apasă pe card
          >
            <h3>{breed.name}</h3> {/* Numele rasei */}
            {breed.image && ( // Dacă are imagine
              <img
                src={breed.image.url} // Afișează imaginea
                alt={breed.name} // Text alternativ
                style={styles.image} // Stiluri imagine
              />
            )}
            <button
              style={styles.button}
              onClick={(e) => {
                e.stopPropagation(); // Previne propagarea evenimentului de click la div
                onFavoriteToggle?.(breed.id); // Apelează funcția pentru a adăuga/șterge din favorite
              }}
            >
              {favorites.includes(breed.id) ? '★ Remove from Favorites' : '☆ Add to Favorites'} {/* Afișează stea plină/deschisă */}
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default AllBreeds; // Exportă componenta

// Obiect cu stiluri inline
const styles = {
  pageWrapper: { // Stil pentru containerul general al paginii
    padding: '20px', // Spațiere interioară de 20px
    maxWidth: '1200px', // Lățime maximă a containerului
    margin: '0 auto' // Centrare pe orizontală
  },
  filtersWrapper: { // Stil pentru containerul cu filtre
    display: 'flex', // Afișează elementele în linie
    flexWrap: 'wrap', // Permite elementelor să treacă pe linia următoare
    gap: '15px', // Spațiu între elementele din interior
    marginBottom: '20px', // Spațiu de 20px sub acest container
    justifyContent: 'center' // Centrează filtrele pe orizontală
  },
  container: { // Stil pentru containerul cu carduri
    display: 'grid', // Folosește layout de tip grid
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Coloană flexibilă minim 250px, maxim 1fr
    gap: '20px', // Spațiu între elementele din grid
    justifyItems: 'start', // Aliniază itemii la începutul fiecărei celule
  },
  card: { // Stil pentru fiecare card de rasă
    backgroundColor: '#ffffff', // Fundal alb
    borderRadius: '16px', // Colțuri rotunjite
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)', // Umbră subtilă
    padding: '15px', // Spațiere interioară
    textAlign: 'center', // Aliniere centrală a textului
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Animație smooth la hover
    cursor: 'pointer', // Cursor de tip pointer la hover
    maxWidth: '300px', // Lățime maximă 300px
    width: '100%', // Ocupă toată lățimea permisă
    boxSizing: 'border-box', // Include padding-ul în calculul dimensiunii
  },
  image: { // Stil pentru imaginea din card
    width: '100%', // Imaginea ocupă toată lățimea containerului
    height: '200px', // Înălțime fixă de 200px
    objectFit: 'cover', // Taie imaginea pentru a se încadra
    borderRadius: '12px', // Colțuri rotunjite
    marginBottom: '10px', // Spațiu sub imagine
  },
  button: { // Stil pentru butonul de adăugat/șters favorite
    backgroundColor: '#4CAF50', // Verde
    color: 'white', // Text alb
    border: 'none', // Fără contur
    padding: '10px 15px', // Spațiere interioară
    borderRadius: '8px', // Colțuri rotunjite
    cursor: 'pointer', // Cursor pointer
    fontWeight: 'bold', // Text îngroșat
    transition: 'background-color 0.3s ease', // Tranziție la hover
    width: '100%', // Ocupă toată lățimea
  },
  select: { // Stil pentru selectoarele de filtrare
    padding: '8px 12px', // Spațiere interioară
    borderRadius: '8px', // Colțuri rotunjite
    border: '1px solid #ccc', // Contur gri
    fontSize: '14px', // Dimensiune text
    backgroundColor: '#f9f9f9', // Fundal deschis
    flex: '1 1 150px', // Flex item: crește/scade, dimensiune de bază 150px
  },
  resetBtn: { // Stil pentru butonul de resetare
    padding: '8px 14px', // Spațiere interioară
    borderRadius: '8px', // Colțuri rotunjite
    backgroundColor: '#e53935', // Roșu intens
    color: 'white', // Text alb
    border: 'none', // Fără contur
    cursor: 'pointer', // Cursor pointer
    fontWeight: 'bold', // Text îngroșat
    flex: '1 1 150px', // Se comportă la fel ca restul filtrelor
  },
  checkboxLabel: { // Stil pentru eticheta checkbox-ului
    display: 'flex', // Afișare în linie
    alignItems: 'center', // Aliniere verticală
    gap: '6px', // Spațiu între checkbox și text
    flex: '1 1 150px', // Flex pentru a se integra cu restul filtrelor
  },
  loadingWrapper: { // Stil pentru containerul cu animația de încărcare
    display: 'flex', // Afișare tip flexbox
    flexDirection: 'column', // Elemente afișate vertical
    alignItems: 'center', // Aliniere orizontală la centru
    justifyContent: 'center', // Aliniere verticală la centru
    padding: '40px', // Spațiere interioară
  },
  nameSuggestions: { // Stil pentru containerul cu sugestii autocomplete
    backgroundColor: '#f5f5f5', // Fundal gri deschis
    borderRadius: '12px', // Colțuri rotunjite
    padding: '10px 15px', // Spațiere interioară
    marginBottom: '20px', // Spațiu sub container
    maxHeight: '200px', // Înălțime maximă
    overflowY: 'auto', // Scroll vertical dacă depășește înălțimea
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)', // Umbră subtilă
  },
  suggestionItem: { // Stil pentru fiecare element de sugestie
    padding: '6px 10px', // Spațiere interioară
    cursor: 'pointer', // Cursor pointer
    borderBottom: '1px solid #ddd', // Linie de separare
    transition: 'background-color 0.2s ease', // Tranziție pentru hover
  }
};

