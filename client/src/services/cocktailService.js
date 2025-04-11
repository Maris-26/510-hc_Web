import axios from 'axios';

// Create an axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.message);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to fetch data');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please check if the server is running.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      throw new Error('Failed to make request');
    }
  }
);

const cocktailService = {
  // Get random cocktail
  getRandomCocktail: async () => {
    try {
      const response = await api.get('/cocktails/random');
      return response.data;
    } catch (error) {
      console.error('Error in getRandomCocktail:', error);
      throw error;
    }
  },

  // Search cocktails by name
  searchCocktails: async (query) => {
    try {
      const response = await api.get(`/cocktails/search?q=${query}`);
      return response.data;
    } catch (error) {
      console.error('Error in searchCocktails:', error);
      throw error;
    }
  },

  // Get cocktail by ID
  getCocktailById: async (id) => {
    try {
      const response = await api.get(`/cocktails/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error in getCocktailById:', error);
      throw error;
    }
  },

  // Get cocktails by ingredient
  getCocktailsByIngredient: async (ingredient) => {
    try {
      const response = await api.get(`/cocktails/ingredient/${ingredient}`);
      return response.data;
    } catch (error) {
      console.error('Error in getCocktailsByIngredient:', error);
      throw error;
    }
  },

  // Get cocktails by category
  getCocktailsByCategory: async (category) => {
    try {
      const response = await api.get(`/cocktails/category/${category}`);
      return response.data;
    } catch (error) {
      console.error('Error in getCocktailsByCategory:', error);
      throw error;
    }
  },

  // Get all categories
  getCategories: async () => {
    try {
      const response = await api.get('/cocktails/categories');
      return response.data;
    } catch (error) {
      console.error('Error in getCategories:', error);
      throw error;
    }
  }
};

export default cocktailService; 