import React, { useState, useEffect } from 'react';
import cocktailService from '../services/cocktailService';
import './CocktailSearch.css';

const CocktailSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [featuredCocktails, setFeaturedCocktails] = useState([]);

  // Load featured cocktails on component mount
  useEffect(() => {
    const loadFeaturedCocktails = async () => {
      try {
        const popularCocktails = ['margarita', 'mojito', 'martini'];
        const featured = await Promise.all(
          popularCocktails.map(async (name) => {
            const response = await cocktailService.searchCocktails(name);
            return response.drinks[0];
          })
        );
        setFeaturedCocktails(featured);
      } catch (err) {
        console.error('Error loading featured cocktails:', err);
      }
    };

    loadFeaturedCocktails();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await cocktailService.searchCocktails(searchTerm);
      setCocktails(response.drinks || []);
      setSelectedCocktail(null);
    } catch (err) {
      setError(err.message);
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomCocktail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await cocktailService.getRandomCocktail();
      setSelectedCocktail(response.drinks[0]);
      setCocktails([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCocktailSelect = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cocktailService.getCocktailById(id);
      setSelectedCocktail(response.drinks[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cocktail-search">
      <h2>Cocktail Search</h2>
      
      <div className="search-actions">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a cocktail..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <button onClick={handleRandomCocktail} className="random-button">
          Random Cocktail
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Loading...</div>}

      {selectedCocktail ? (
        <div className="cocktail-details">
          <h3>{selectedCocktail.strDrink}</h3>
          <img 
            src={selectedCocktail.strDrinkThumb} 
            alt={selectedCocktail.strDrink}
            className="cocktail-image"
          />
          <div className="cocktail-info">
            <h4>Ingredients:</h4>
            <ul>
              {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
                const ingredient = selectedCocktail[`strIngredient${i}`];
                const measure = selectedCocktail[`strMeasure${i}`];
                return ingredient ? (
                  <li key={i}>
                    {measure ? `${measure} of ` : ''}{ingredient}
                  </li>
                ) : null;
              })}
            </ul>
            <h4>Instructions:</h4>
            <p>{selectedCocktail.strInstructions}</p>
          </div>
          <button 
            onClick={() => setSelectedCocktail(null)}
            className="back-button"
          >
            Back to Results
          </button>
        </div>
      ) : (
        <>
          {cocktails.length > 0 ? (
            <div className="cocktail-list">
              {cocktails.map((cocktail) => (
                <div 
                  key={cocktail.idDrink} 
                  className="cocktail-card"
                  onClick={() => handleCocktailSelect(cocktail.idDrink)}
                >
                  <img 
                    src={cocktail.strDrinkThumb} 
                    alt={cocktail.strDrink}
                    className="cocktail-thumbnail"
                  />
                  <h3>{cocktail.strDrink}</h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="featured-section">
              <h3>Featured Cocktails</h3>
              <div className="cocktail-list">
                {featuredCocktails.map((cocktail) => (
                  <div 
                    key={cocktail.idDrink} 
                    className="cocktail-card"
                    onClick={() => handleCocktailSelect(cocktail.idDrink)}
                  >
                    <img 
                      src={cocktail.strDrinkThumb} 
                      alt={cocktail.strDrink}
                      className="cocktail-thumbnail"
                    />
                    <h3>{cocktail.strDrink}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CocktailSearch; 