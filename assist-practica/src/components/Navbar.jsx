// Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ searchQuery, setSearchQuery }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <button onClick={toggleMenu} style={styles.hamburger}>☰</button>
        <div style={{ ...styles.links, ...(menuOpen ? styles.linksOpen : {}) }}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/breeds" style={styles.link}>Breeds</Link>
          <Link to="/favorites" style={styles.link}>Favorites</Link>
        </div>
      </div>

      <div style={styles.right}>
        <button onClick={toggleDarkMode} style={styles.toggleBtn}>🌓</button>
        {location.pathname.startsWith('/breeds') && (
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Caută o rasă..."
            style={styles.search}
          />
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: { padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4CAF50', flexWrap: 'wrap' },
  left: { display: 'flex', alignItems: 'center', gap: '15px', flexGrow: 1 },
  hamburger: { fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'none' },
  links: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  linksOpen: { display: 'flex', flexDirection: 'column', position: 'absolute', top: '60px', left: '20px', backgroundColor: '#4CAF50', padding: '10px', borderRadius: '8px', zIndex: 999 },
  link: { color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '5px', transition: 'background-color 0.3s ease', fontWeight: 'bold' },
  toggleBtn: { marginRight: '10px', fontSize: '18px', background: 'white', color: '#4CAF50', borderRadius: '50%', border: 'none', cursor: 'pointer', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  right: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' },
  search: { padding: '8px 12px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '14px', width: '200px', maxWidth: '100%' },
};

export default Navbar;

// Media query fix
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @media (max-width: 768px) {
      nav button[style*="☰"] { display: inline-block !important; }
      nav div[style*="display: flex"][style*="gap: 15px"] { display: none; }
    }
  `;
  document.head.appendChild(style);
}
