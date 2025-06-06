import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    // Load user and favorites from localStorage on mount
    const savedUser = localStorage.getItem('user');
    const savedFavorites = localStorage.getItem('favorites');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const showLoginModal = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const showRegisterModal = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    closeAuthModal();
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    closeAuthModal();
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
  };

  const toggleFavorite = (cocktail) => {
    if (!user) return;

    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.idDrink === cocktail.idDrink);
      let newFavorites;
      
      if (isFavorite) {
        newFavorites = prevFavorites.filter(fav => fav.idDrink !== cocktail.idDrink);
      } else {
        newFavorites = [...prevFavorites, cocktail];
      }
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (cocktailId) => {
    return favorites.some(fav => fav.idDrink === cocktailId);
  };

  return (
    <AuthContext.Provider value={{
      user,
      favorites,
      showAuthModal,
      authMode,
      showLoginModal,
      showRegisterModal,
      closeAuthModal,
      login,
      register,
      logout,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 