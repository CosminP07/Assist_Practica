import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import dogLoading from '../assets/dogLoading.json';

function AllBreeds({ searchQuery, favorites, onFavoriteToggle, breeds }) {
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupFilter, setGroupFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [originFilter, setOriginFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (breeds.length > 0) {
      setLoading(false);
    }
  }, [breeds]);

  useEffect(() => {
    let filtered = breeds;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((b) => b.name.toLowerCase().startsWith(query));
    }

    if (groupFilter) filtered = filtered.filter((b) => b.breed_group === groupFilter);
    if (originFilter) filtered = filtered.filter((b) => b.origin === originFilter);

    if (sizeFilter) {
      filtered = filtered.filter((b) => {
        if (!b.weight?.metric) return false;
        const weight = parseInt(b.weight.metric.split(' - ')[0]);
        if (sizeFilter === 'small') return weight < 10;
        if (sizeFilter === 'medium') return weight >= 10 && weight <= 25;
        if (sizeFilter === 'large') return weight > 25;
        return true;
      });
    }

    if (favoritesOnly) {
      filtered = filtered.filter((b) => favorites.includes(b.id));
    }

    switch (sortOption) {
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'weight-asc':
        filtered.sort((a, b) =>
          parseInt(a.weight?.metric?.split(' - ')[0] || 0) -
          parseInt(b.weight?.metric?.split(' - ')[0] || 0)
        );
        break;
      case 'weight-desc':
        filtered.sort((a, b) =>
          parseInt(b.weight?.metric?.split(' - ')[0] || 0) -
          parseInt(a.weight?.metric?.split(' - ')[0] || 0)
        );
        break;
      case 'lifespan-asc':
        filtered.sort((a, b) =>
          parseInt(a.life_span?.split(' ')[0] || 0) -
          parseInt(b.life_span?.split(' ')[0] || 0)
        );
        break;
      case 'lifespan-desc':
        filtered.sort((a, b) =>
          parseInt(b.life_span?.split(' ')[0] || 0) -
          parseInt(a.life_span?.split(' ')[0] || 0)
        );
        break;
    }

    setFilteredBreeds(filtered);
  }, [searchQuery, breeds, groupFilter, sizeFilter, originFilter, sortOption, favoritesOnly, favorites]);

  const resetFilters = () => {
    setGroupFilter('');
    setSizeFilter('');
    setOriginFilter('');
    setSortOption('');
    setFavoritesOnly(false);
  };

  const uniqueGroups = [...new Set(breeds.map((b) => b.breed_group).filter(Boolean))];
  const uniqueOrigins = [...new Set(breeds.map((b) => b.origin).filter(Boolean))];

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.filtersWrapper}>
        <select style={styles.select} value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)}>
          <option value="">Filter by Group</option>
          {uniqueGroups.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <select style={styles.select} value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
          <option value="">Filter by Size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>

        <select style={styles.select} value={originFilter} onChange={(e) => setOriginFilter(e.target.value)}>
          <option value="">Filter by Origin</option>
          {uniqueOrigins.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>

        <select style={styles.select} value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="weight-asc">Weight (Low to High)</option>
          <option value="weight-desc">Weight (High to Low)</option>
          <option value="lifespan-asc">Lifespan (Short → Long)</option>
          <option value="lifespan-desc">Lifespan (Long → Short)</option>
        </select>

        <label style={styles.checkboxLabel}>
          <input type="checkbox" checked={favoritesOnly} onChange={() => setFavoritesOnly(!favoritesOnly)} />
          Favorites only
        </label>

        <button style={styles.resetBtn} onClick={resetFilters}>Reset Filters</button>
      </div>

      {searchQuery && filteredBreeds.length > 0 && (
        <div style={styles.nameSuggestions}>
          <h4>Rase potrivite:</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredBreeds.map((b) => (
              <li
                key={b.id}
                style={styles.suggestionItem}
                onClick={() => navigate(`/breed/${b.id}`)}
              >
                {b.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading ? (
        <div style={styles.loadingWrapper}>
          <Lottie animationData={dogLoading} loop autoplay style={{ width: 200, height: 200 }} />
        </div>
      ) : (
        <div style={styles.container}>
          {filteredBreeds.map((breed) => (
            <div
              key={breed.id}
              style={styles.card}
              onClick={() => navigate(`/breed/${breed.id}`)}
            >
              <h3>{breed.name}</h3>
              {breed.image && (
                <img
                  src={breed.image.url}
                  alt={breed.name}
                  style={styles.image}
                />
              )}
              <button
                style={styles.button}
                onClick={(e) => {
                  e.stopPropagation();
                  onFavoriteToggle?.(breed.id);
                }}
              >
                {favorites.includes(breed.id) ? '★ Remove from Favorites' : '☆ Add to Favorites'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBreeds;

const styles = {
  pageWrapper: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  filtersWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    justifyItems: 'start',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    padding: '15px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    maxWidth: '300px',
    width: '100%',
    boxSizing: 'border-box',
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
    width: '100%',
  },
  select: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    backgroundColor: '#f9f9f9',
    flex: '1 1 150px',
  },
  resetBtn: {
    padding: '8px 14px',
    borderRadius: '8px',
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    flex: '1 1 150px',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flex: '1 1 150px',
  },
  loadingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  nameSuggestions: {
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    padding: '10px 15px',
    marginBottom: '20px',
    maxHeight: '200px',
    overflowY: 'auto',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  suggestionItem: {
    padding: '6px 10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
    transition: 'background-color 0.2s ease',
  }
};
