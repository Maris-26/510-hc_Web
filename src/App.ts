import React, { useState, useEffect, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import './App.css';
import MarqueeText from './MarqueeText';

interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | null;
}

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [selectedCocktail, setSelectedCocktail] = useState<Cocktail | null>(null);
  const [mode, setMode] = useState('randomGrid');
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const MAX_COCKTAILS = 636;
  const [error, setError] = useState<string | null>(null);

  const fetchRandomCocktails = useCallback(async (count = 12) => {
    if (loading || endReached) return;
    
    setLoading(true);
    setError(null);
    try {
      const promises = Array.from({ length: count }, () =>
        axios.get(`${API_URL}/random.php`)
      );
      const results = await Promise.all(promises);
      const newDrinks = results
        .map(res => res.data.drinks[0])
        .filter(
          (drink, idx, arr) =>
            arr.findIndex(d => d.idDrink === drink.idDrink) === idx &&
            !cocktails.some(c => c.idDrink === drink.idDrink)
        );
      
      if (newDrinks.length === 0 || cocktails.length + newDrinks.length >= MAX_COCKTAILS) {
        setEndReached(true);
      }
      
      setCocktails(prev => [...prev, ...newDrinks]);
      setMode('randomGrid');
      setSelectedCocktail(null);
    } catch (err) {
      setError('Failed to fetch random cocktails');
    } finally {
      setLoading(false);
    }
  }, [cocktails, loading, endReached]);

  const searchCocktails = async (e: React.FormEvent) => {
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

  const showRandomDetail = () => {
    if (cocktails.length === 0) return;
    const random = cocktails[Math.floor(Math.random() * cocktails.length)];
    setSelectedCocktail(random);
    setMode('singleDetail');
  };

  const backToGrid = () => {
    setSelectedCocktail(null);
    setMode(searchTerm ? 'searchGrid' : 'randomGrid');
  };

  // Initial load
  useEffect(() => {
    fetchRandomCocktails(12);
  }, [fetchRandomCocktails]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  return React.createElement('div', { className: 'App' },
    React.createElement('header', null,
      React.createElement('h1', null, 'Cocktail Curator')
    ),
    React.createElement('main', null,
      React.createElement('div', { className: 'search-container' },
        React.createElement('form', {
          onSubmit: searchCocktails,
          className: 'flex flex-1'
        },
          React.createElement('input', {
            type: 'text',
            value: searchTerm,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
            placeholder: 'Search for a cocktail...'
          }),
          React.createElement('button', { type: 'submit' }, 'Search')
        ),
        React.createElement('button', { onClick: showRandomDetail }, 'Random Cocktail')
      ),
      error && React.createElement('div', { className: 'error' }, error),
      loading && React.createElement('div', { className: 'loading' }, 'Loading...'),
      mode === 'singleDetail' && selectedCocktail
        ? React.createElement('div', { className: 'cocktail-details' },
            React.createElement('h2', null, selectedCocktail.strDrink),
            React.createElement('img', {
              src: selectedCocktail.strDrinkThumb,
              alt: selectedCocktail.strDrink
            }),
            React.createElement('div', { className: 'ingredients' },
              React.createElement('h3', null, 'Ingredients:'),
              React.createElement('ul', null,
                Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
                  const ingredient = selectedCocktail[`strIngredient${i}`];
                  const measure = selectedCocktail[`strMeasure${i}`];
                  return ingredient
                    ? React.createElement('li', { key: i },
                        measure ? `${measure} of ` : '',
                        ingredient
                      )
                    : null;
                })
              )
            ),
            React.createElement('div', { className: 'instructions' },
              React.createElement('h3', null, 'Instructions:'),
              React.createElement('p', null, selectedCocktail.strInstructions)
            ),
            React.createElement('button', { onClick: backToGrid }, 'Back to Grid')
          )
        : React.createElement('div', null,
            React.createElement(Masonry, {
              breakpointCols: breakpointColumnsObj,
              className: 'my-masonry-grid',
              columnClassName: 'my-masonry-grid_column'
            },
              cocktails.map((cocktail) =>
                React.createElement('div', {
                  key: cocktail.idDrink,
                  className: 'cocktail-card'
                },
                  React.createElement('img', {
                    src: cocktail.strDrinkThumb,
                    alt: cocktail.strDrink
                  }),
                  React.createElement('h3', { className: 'cocktail-title' },
                    React.createElement(MarqueeText, null, cocktail.strDrink)
                  )
                )
              )
            ),
            mode === 'randomGrid' && !endReached && React.createElement('div', { 
              className: 'load-more-container',
              style: { textAlign: 'center', margin: '20px 0' }
            },
              React.createElement('button', {
                onClick: () => fetchRandomCocktails(10),
                disabled: loading,
                style: {
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: loading ? '#ccc' : '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }
              }, loading ? 'Loading...' : 'Load More')
            )
          )
    ),
    React.createElement('button', {
      className: 'back-to-top',
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' })
    }, '↑ Top')
  );
}

export default App; 