import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBriefcase, FaUserTie, FaMoon, FaSun } from "react-icons/fa";
import Connexion from '../CompoAuthentif/Connexion/connexion';
import "./navbar.css";

const NavBar = ({ user }) => {
  const [activeNav, setActiveNav] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  const handleNav = () => {
    setActiveNav(!activeNav);
    setToggle(!toggle);
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleMouseMove = () => {
    setVisible(true);
    clearTimeout(window.navbarTimer);
    window.navbarTimer = setTimeout(() => {
      if (window.scrollY > 100) {
        setVisible(false);
      }
    }, 2000);
  };

  const LoginDropdown = () => {
    const toggleLoginModal = () => {
      setShowLoginModal(true);
    };

    return (
      <div className="login-dropdown">
        <button onClick={toggleLoginModal} className="login-btn">
          Connexion
        </button>
      </div>
    );
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const isLinkActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);
    window.addEventListener('scroll', handleMouseMove);
    window.addEventListener('touchstart', () => setVisible(true));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('scroll', handleMouseMove);
      window.removeEventListener('touchstart', () => setVisible(true));
      clearTimeout(window.navbarTimer);
    };
  }, []);

  return (
    <>
      <nav className={`${darkMode ? "dark" : "light"} ${visible ? "visible" : "hidden"} fixed-nav`}>
        <h2>
          <Link to="/">
            <img src="/img/logo.png" alt="Logo" style={{ height: '200px' }} />
          </Link>
        </h2>

        <ul className={`links ${activeNav ? "nav-active" : ""}`}>
          <li>
            <Link to="/" onClick={handleNav} className={isLinkActive('/') ? 'active-link' : ''}>
              <FaHome /> Accueil
            </Link>
          </li>
          <li>
            <Link to="/Offres" onClick={handleNav} className={isLinkActive('/Offres') ? 'active-link' : ''}>
              <FaBriefcase /> Offres d'emploi
            </Link>
          </li>
          <li>
            <Link to="/recruteur" onClick={handleNav} className={isLinkActive('/recruteur') ? 'active-link' : ''}>
              <FaUserTie /> Espace Recruteurs
            </Link>
          </li>

          {user?.role === 'recruteur' && (
            <li>
              <Link to="/dashboard" onClick={handleNav} className={isLinkActive('/dashboard') ? 'active-link' : ''}>
                🛠️ Dashboard Recruteur
              </Link>
            </li>
          )}

          {user?.role === 'employe' && (
            <li>
              <Link to="/applications" onClick={handleNav} className={isLinkActive('/applications') ? 'active-link' : ''}>
                📁 Mes Candidatures
              </Link>
            </li>
          )}
        </ul>

        <div className="nav-right">
          <LoginDropdown />
          <button onClick={toggleTheme} className="theme-toggle">
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <div className={`btnBurger ${toggle ? "toggle" : ""}`} onClick={handleNav}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav>

      <Connexion isOpen={showLoginModal} onClose={handleCloseLoginModal} />
    </>
  );
};

export default NavBar;
