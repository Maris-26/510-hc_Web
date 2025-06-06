import React from 'react';
import { useAuth } from '../context/AuthContext';
import './FavoriteButton.css';

const FavoriteButton = ({ cocktail }) => {
  const { user, favorites, toggleFavorite, showLoginModal } = useAuth();
  const isFavorite = favorites.some(fav => fav.idDrink === cocktail.idDrink);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent card click event
    if (!user) {
      if (window.confirm('Please login to add cocktails to your favorites.')) {
        showLoginModal();
      }
      return;
    }
    toggleFavorite(cocktail);
  };

  return (
    <button 
      className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
      onClick={handleClick}
      title={user ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Login to add to favorites'}
    >
      <span className="heart-icon">♥</span>
    </button>
  );
};

export default FavoriteButton; 