import React from 'react';
import { Link } from 'react-router-dom';

// Componenta Navbar primește starea și funcția pentru actualizarea căutării
function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <nav
      style={{
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      {/* Legături către rute */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/breeds" style={linkStyle}>Breeds</Link>
        <Link to="/favorites" style={linkStyle}>Favorites</Link>
      </div>

      {/* Bara de căutare */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Caută o rasă..."
        style={{
          padding: '8px 12px',
          borderRadius: '20px',
          border: '1px solid #ccc',
          fontSize: '14px',
          width: '200px',
        }}
      />
    </nav>
  );
}

// Stil comun pentru linkuri
const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  padding: '8px 15px',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

export default Navbar;
