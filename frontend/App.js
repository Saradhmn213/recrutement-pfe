import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './composants/NavBar/navbar';
import Recrut from './Pages/Recruteur/Recrut';
import Home from './Pages/Accueil/Accueil';
import Offres from './Pages/Offres/Offres';
import OffreDetails from './composants/CompoOffres/OffresDetails';
import { AuthProvider } from './context/autocontext'; // ✅ Ajouté, c'était absent dans ta version
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offres" element={<Offres />} />
            <Route path="/offres/:id" element={<OffreDetails />} />
            <Route path="/recruteur" element={<Recrut />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
