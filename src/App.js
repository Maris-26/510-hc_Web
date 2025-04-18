import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState([]);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchCocktails = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/search.php?s=${searchTerm}`);
      setCocktails(response.data.drinks || []);
      setSelectedCocktail(null);
    } catch (err) {
      setError('Failed to fetch cocktails');
      setCocktails([]);
    } finally {
      setLoading(false);
    }
  };

  const getRandomCocktail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/random.php`);
      setSelectedCocktail(response.data.drinks[0]);
      setCocktails([]);
    } catch (err) {
      setError('Failed to fetch random cocktail');
    } finally {
      setLoading(false);
    }
  };

  const selectCocktail = (cocktail) => {
    setSelectedCocktail(cocktail);
  };

  return (
    <div className="App">
      <header>
        <h1>Cocktail Curator</h1>
      </header>
      <main>
        <div className="search-container">
          <form onSubmit={searchCocktails}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a cocktail..."
            />
            <button type="submit">Search</button>
          </form>
          <button onClick={getRandomCocktail}>Random Cocktail</button>
        </div>

        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}

        {selectedCocktail ? (
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
            <button onClick={() => setSelectedCocktail(null)}>Back to Results</button>
          </div>
        ) : (
          <div className="cocktail-grid">
            {cocktails.map((cocktail) => (
              <div
                key={cocktail.idDrink}
                className="cocktail-card"
                onClick={() => selectCocktail(cocktail)}
              >
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <h3>{cocktail.strDrink}</h3>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App; 