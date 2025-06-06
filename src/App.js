import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import './App.css';
import MarqueeText from './MarqueeText';
import RecommendationFeature from './components/RecommendationFeature.js';
import ProfileButton from './components/Profile/ProfileButton';
import FavoriteButton from './components/FavoriteButton';
import { AuthProvider, useAuth } from './context/AuthContext';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function AppContent() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterType, setFilterType] = useState('');
  const [categories, setCategories] = useState([]);
  const [types] = useState(['Alcoholic', 'Non_Alcoholic', 'Optional_Alcohol']);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [mode, setMode] = useState('grid');
  const { user, favorites } = useAuth();
  const MAX_COCKTAILS = 636;
  
  // Fetch random cocktails and append to the list
  const fetchRandomCocktails = useCallback(async (count = 12) => {
    // Don't fetch more if we've reached the limit
    if (cocktails.length >= MAX_COCKTAILS) {
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const promises = Array.from({ length: count }, () =>
        axios.get(`${API_URL}/random.php`)
      );
      const results = await Promise.all(promises);
      // Remove duplicates and ensure we don't exceed MAX_COCKTAILS
      const newDrinks = results
        .map(res => res.data.drinks[0])
        .filter(
          (drink, idx, arr) =>
            arr.findIndex(d => d.idDrink === drink.idDrink) === idx &&
            !cocktails.some(c => c.idDrink === drink.idDrink)
        );
      
      // Only add drinks up to MAX_COCKTAILS
      const remainingSlots = MAX_COCKTAILS - cocktails.length;
      const drinksToAdd = newDrinks.slice(0, remainingSlots);
      
      setCocktails(prev => [...prev, ...drinksToAdd]);
      setMode('randomGrid');
      setSelectedCocktail(null);
    } catch (err) {
      setError('Failed to fetch random cocktails');
    } finally {
      setLoading(false);
    }
  }, [cocktails]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/list.php?c=list`);
        setCategories(response.data.drinks.map(drink => drink.strCategory));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Filter cocktails
  const filterCocktails = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let filteredCocktails = [];
      
      // If search term is provided, search by name
      if (searchTerm.trim()) {
        const response = await axios.get(`${API_URL}/search.php?s=${searchTerm}`);
        filteredCocktails = response.data.drinks || [];
      } else {
        // If no search term, get random cocktails
        const promises = Array.from({ length: 12 }, () =>
          axios.get(`${API_URL}/random.php`)
        );
        const results = await Promise.all(promises);
        filteredCocktails = results.map(res => res.data.drinks[0]);
      }

      // Apply category filter
      if (filterCategory) {
        filteredCocktails = filteredCocktails.filter(
          cocktail => cocktail.strCategory === filterCategory
        );
      }

      // Apply type filter
      if (filterType) {
        filteredCocktails = filteredCocktails.filter(
          cocktail => cocktail.strAlcoholic === filterType
        );
      }

      setCocktails(filteredCocktails);
      setMode('searchGrid');
      setSelectedCocktail(null);
    } catch (err) {
      setError('Failed to fetch cocktails');
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  // Pick a random cocktail from current grid and show detail
  const showRandomDetail = () => {
    if (cocktails.length === 0) return;
    const random = cocktails[Math.floor(Math.random() * cocktails.length)];
    setSelectedCocktail(random);
    setMode('singleDetail');
  };

  // Back to grid
  const backToGrid = () => {
    setSelectedCocktail(null);
    setMode(searchTerm ? 'searchGrid' : 'randomGrid');
  };

  // On load, fetch random cocktails
  useEffect(() => {
    fetchRandomCocktails(12);
    // eslint-disable-next-line
  }, []);

  // Infinite scroll for randomGrid mode only
  useEffect(() => {
    if (mode !== 'randomGrid') return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
        !loading
      ) {
        fetchRandomCocktails(10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchRandomCocktails, loading, mode]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  // Add a new function to handle favorites view
  const showFavorites = () => {
    if (!user) {
      // If not logged in, show login modal through ProfileButton
      return;
    }
    setCocktails(favorites);
    setMode('favorites');
  };

  // Function to handle mode changes
  const handleModeChange = (newMode) => {
    if (newMode === 'favorites' && !user) {
      return; // Don't change mode if trying to access favorites while not logged in
    }
    setMode(newMode);
    setSelectedCocktail(null);
    if (newMode === 'randomGrid') {
      fetchRandomCocktails(12);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Cocktail Curator</h1>
        <ProfileButton />
      </header>
      <main>
        <div className="search-container">
          <div className="navigation-buttons">
            <button
              className={`nav-button ${mode === 'randomGrid' ? 'active' : ''}`}
              onClick={() => handleModeChange('randomGrid')}
            >
              All Cocktails
            </button>
            <button
              className={`nav-button ${mode === 'searchGrid' ? 'active' : ''}`}
              onClick={() => handleModeChange('searchGrid')}
            >
              Filter
            </button>
            <button
              className={`nav-button ${mode === 'singleDetail' ? 'active' : ''}`}
              onClick={showRandomDetail}
            >
              Random Cocktail
            </button>
            <button
              className={`nav-button ${mode === 'recommendation' ? 'active' : ''}`}
              onClick={() => handleModeChange('recommendation')}
            >
              Recommendation
            </button>
            <button
              className={`nav-button ${mode === 'favorites' ? 'active' : ''} ${!user ? 'disabled' : ''}`}
              onClick={showFavorites}
              title={!user ? 'Login to access collections' : 'View your collections'}
            >
              Collections
            </button>
          </div>

          {mode === 'searchGrid' && (
            <form onSubmit={filterCocktails} className="filter-form">
              <div className="filter-group">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name..."
                />
              </div>
              <div className="filter-group">
                <select 
                  value={filterCategory} 
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {types.map((type, index) => (
                    <option key={index} value={type}>{type.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
              <button type="submit">Apply Filters</button>
            </form>
          )}
        </div>

        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}

        {mode === 'recommendation' ? (
          <RecommendationFeature />
        ) : mode === 'singleDetail' && selectedCocktail ? (
          <div className="cocktail-details">
            <div className="cocktail-header">
              <h2>{selectedCocktail.strDrink}</h2>
              <div className="cocktail-actions">
                <FavoriteButton cocktail={selectedCocktail} />
              </div>
            </div>
            <img src={selectedCocktail.strDrinkThumb} alt={selectedCocktail.strDrink} />
            <div className="ingredients">
              <h3>Ingredients:</h3>
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
            </div>
            <div className="instructions">
              <h3>Instructions:</h3>
              <p>{selectedCocktail.strInstructions}</p>
            </div>
            <button onClick={backToGrid}>Back to Grid</button>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {cocktails.map((cocktail) => (
              <div 
                key={cocktail.idDrink} 
                className="cocktail-card"
                onClick={() => {
                  setSelectedCocktail(cocktail);
                  setMode('singleDetail');
                }}
              >
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <FavoriteButton cocktail={cocktail} />
                <div className="cocktail-title">
                  <MarqueeText text={cocktail.strDrink} />
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </main>
      
      <button
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑ Top
      </button>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
