import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import cocktailService from '../services/cocktailService';
import './CocktailFrame.css';

const CocktailFrame = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await cocktailService.getCocktailById(id);
          setCocktails([response.drinks[0]]);
        } else {
          const response = await cocktailService.getRandomCocktail();
          setCocktails(response.drinks);
        }
        const categoriesResponse = await cocktailService.getCategories();
        setCategories(categoriesResponse.drinks);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await cocktailService.searchCocktails(searchQuery);
      setCocktails(response.drinks || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to search cocktails');
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category);
    try {
      setLoading(true);
      const response = await cocktailService.getCocktailsByCategory(category);
      setCocktails(response.drinks || []);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cocktails by category');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="cocktail-frame">
      <div className="controls">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cocktails..."
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
        
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="cocktail-grid">
        {cocktails.map((cocktail) => (
          <div
            key={cocktail.idDrink}
            className="cocktail-card"
            onClick={() => navigate(`/cocktails/${cocktail.idDrink}`)}
          >
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className="cocktail-image"
            />
            <div className="cocktail-info">
              <h3 className="cocktail-name">{cocktail.strDrink}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CocktailFrame; 