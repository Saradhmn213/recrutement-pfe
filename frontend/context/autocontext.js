import React, { createContext, useContext, useState, useEffect } from 'react';

// Création du contexte
const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocke les infos de l'utilisateur connecté
  const [loading, setLoading] = useState(true); // Pour gérer l'état de chargement

  // Chargement initial : récupérer les infos depuis le localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Fonction de connexion (ex: après formulaire ou via API)
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte facilement
export const useAuth = () => useContext(AuthContext);