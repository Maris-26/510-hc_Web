import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import './App.css';
import MarqueeText from './MarqueeText';
import RecommendationFeature from './components/RecommendationFeature.js';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [mode, setMode] = useState('grid');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const MAX_COCKTAILS = 636;

  // Fetch random cocktails and append to the list
  const fetchRandomCocktails = useCallback(async (count = 12) => {
    setLoading(true);
    setError(null);
    try {
      const promises = Array.from({ length: count }, () =>
        axios.get(`${API_URL}/random.php`)
      );
      const results = await Promise.all(promises);
      // Remove duplicates
      const newDrinks = results
        .map(res => res.data.drinks[0])
        .filter(
          (drink, idx, arr) =>
            arr.findIndex(d => d.idDrink === drink.idDrink) === idx &&
            !cocktails.some(c => c.idDrink === drink.idDrink)
        );
      setCocktails(prev => [...prev, ...newDrinks]);
      setMode('randomGrid');
      setSelectedCocktail(null);
    } catch (err) {
      setError('Failed to fetch random cocktails');
    } finally {
      setLoading(false);
    }
  }, [cocktails]);

  // Fetch cocktails by search
  const searchCocktails = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/search.php?s=${searchTerm}`);
      setCocktails(response.data.drinks || []);
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

  return (
    <div className="App">
      <header>
        <h1>Cocktail Curator</h1>
      </header>
      <main>
        <div className="search-container">
          <form onSubmit={searchCocktails} className="flex flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a cocktail..."
            />
            <button type="submit">Search</button>
          </form>
          <button onClick={showRandomDetail}>Random Cocktail</button>
          <button onClick={() => setMode('recommendation')}>Get Personalized Recommendation</button>
        </div>

        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}

        {mode === 'recommendation' ? (
          <RecommendationFeature />
        ) : mode === 'singleDetail' && selectedCocktail ? (
          <div className="cocktail-details">
            <h2>{selectedCocktail.strDrink}</h2>
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
                <h3 className="cocktail-title">
                  <MarqueeText>{cocktail.strDrink}</MarqueeText>
                </h3>
              </div>
            ))}
          </Masonry>
        )}
      </main>
      <button 
        className="back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >  ↑ Top
      </button>
    </div>
  );
}

export default App;