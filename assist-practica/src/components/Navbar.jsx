// Navbar.jsx

import React, { useState } from 'react'; // Importă React și hook-ul useState pentru a gestiona starea locală
import { Link, useLocation } from 'react-router-dom'; // Importă Link (pentru navigare) și useLocation (pentru a detecta ruta curentă)

function Navbar({ searchQuery, setSearchQuery }) { // Componenta Navbar primește două props: căutarea actuală și funcția de setare a acesteia
  const [menuOpen, setMenuOpen] = useState(false); // Stare locală pentru meniu mobil (deschis/închis)
  const location = useLocation(); // Hook care returnează obiectul cu detalii despre ruta curentă

  const toggleDarkMode = () => { // Funcție care activează sau dezactivează tema dark-mode
    document.body.classList.toggle('dark-mode'); // Adaugă/scoate clasa dark-mode pe body (folosită în CSS)
  };

  const toggleMenu = () => { // Funcție care inversează starea meniului mobil
    setMenuOpen(!menuOpen); // Toggle pentru meniu (true/false)
  };

  return (
    <nav style={styles.nav}> {/* Bara de navigație cu stil aplicat */}
      <div style={styles.left}> {/* Partea stângă a meniului */}
        <button onClick={toggleMenu} style={styles.hamburger}>☰</button> {/* Buton hamburger pentru mobil */}
        <div style={{ ...styles.links, ...(menuOpen ? styles.linksOpen : {}) }}> {/* Linkuri, afișate vertical dacă meniul e deschis */}
          <Link to="/" style={styles.link}>Home</Link> {/* Link către pagina Home */}
          <Link to="/breeds" style={styles.link}>Breeds</Link> {/* Link către pagina cu rase */}
          <Link to="/favorites" style={styles.link}>Favorites</Link> {/* Link către pagina de favorite */}
        </div>
      </div>

      <div style={styles.right}> {/* Partea dreaptă a navbar-ului */}
        <button onClick={toggleDarkMode} style={styles.toggleBtn}>🌓</button> {/* Buton pentru schimbarea temei */}
        {location.pathname.startsWith('/breeds') && ( // Dacă suntem pe pagina /breeds, afișăm bara de căutare
          <input
            type="text" // Tip input text
            value={searchQuery} // Valoarea curentă din câmpul de căutare
            onChange={(e) => setSearchQuery(e.target.value)} // La modificare, actualizăm valoarea cu ce scrie utilizatorul
            placeholder="Caută o rasă..." // Text sugestiv în câmp
            style={styles.search} // Stil aplicat inputului
          />
        )}
      </div>
    </nav>
  );
}

// Obiect care definește stilurile inline pentru componentă
const styles = {
  nav: { padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#4CAF50', flexWrap: 'wrap' }, // Stil pentru nav
  left: { display: 'flex', alignItems: 'center', gap: '15px', flexGrow: 1 }, // Partea stângă cu hamburger + linkuri
  hamburger: { fontSize: '24px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', display: 'none' }, // Buton hamburger (ascuns implicit)
  links: { display: 'flex', gap: '15px', flexWrap: 'wrap' }, // Linkuri de navigație (stil implicit)
  linksOpen: { display: 'flex', flexDirection: 'column', position: 'absolute', top: '60px', left: '20px', backgroundColor: '#4CAF50', padding: '10px', borderRadius: '8px', zIndex: 999 }, // Linkuri stilizate vertical pentru mobil
  link: { color: 'white', textDecoration: 'none', padding: '8px 12px', borderRadius: '5px', transition: 'background-color 0.3s ease', fontWeight: 'bold' }, // Stil pentru fiecare link
  toggleBtn: { marginRight: '10px', fontSize: '18px', background: 'white', color: '#4CAF50', borderRadius: '50%', border: 'none', cursor: 'pointer', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }, // Stil pentru butonul de dark mode
  right: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }, // Partea dreaptă cu buton dark și search
  search: { padding: '8px 12px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '14px', width: '200px', maxWidth: '100%' }, // Stil pentru input de căutare
};

export default Navbar; // Exportă componenta Navbar pentru a fi folosită în App.jsx

// Adăugare stiluri media query direct în JS
if (typeof window !== 'undefined') { // Verificăm dacă ne aflăm în mediu browser
  const style = document.createElement('style'); // Creăm un element <style>
  style.innerHTML = ` // Definim un media query în JS
    @media (max-width: 768px) {
      nav button[style*="☰"] { display: inline-block !important; } // Afișează butonul hamburger pe ecrane mici
      nav div[style*="display: flex"][style*="gap: 15px"] { display: none; } // Ascunde linkurile implicite (afișează linksOpen dacă e deschis)
    }
  `;
  document.head.appendChild(style); // Adaugă stilurile în <head>
}
