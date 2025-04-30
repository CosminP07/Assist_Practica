import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom for navigation

function Navbar() {
    return (
        <nav style={{ padding: '10px', borderBottom: '1px solid lightgray' }} >
            <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
            <Link to="/breeds">Breeds</Link>
        </nav>
    )
}

export default Navbar;