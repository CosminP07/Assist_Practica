import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; //pentru navigarea intre pagini

//Importarea paginilor
import Home from './pages/Home';
import AllBreeds from './pages/AllBreeds';
import BreedDetails from './pages/BreedDetails';
import Favorites from './pages/Favorites';

import Navbar from './components/Navbar';

function App() {
  return (
      <Router>
          {/* Navbar component is used for navigation between pages */}
          <Navbar />
          {/* Routes component is used to define the different routes in the application */}
          <Routes>
                {/* Route for the home page */}
                <Route path="/" element={<Home />} />
                {/* Route for the all breeds page */}
                <Route path="/breeds" element={<AllBreeds />} />
                {/* Route for the breed details page */}
                <Route path="/breed/:id" element={<BreedDetails />} />
                {/* Route for the favorites page */}
                <Route path="/favorites" element={<Favorites />} />
          </Routes>
      </Router>
  );
}

export default App;
