import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Helper function to handle API errors
const handleApiError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    throw new Error(error.response.data.error || 'Server error occurred');
  } else if (error.request) {
    throw new Error('Could not connect to the server. Please check if the server is running.');
  } else {
    throw new Error('An unexpected error occurred');
  }
};

const cocktailService = {
  async getRandomCocktail() {
    try {
      const response = await api.get('/cocktails/random');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async searchCocktails(query) {
    try {
      const response = await api.get(`/cocktails/search?name=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getCocktailById(id) {
    try {
      const response = await api.get(`/cocktails/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getCocktailsByIngredient(ingredient) {
    try {
      const response = await api.get(`/cocktails/ingredient/${encodeURIComponent(ingredient)}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getCocktailsByCategory(category) {
    try {
      const response = await api.get(`/cocktails/category/${encodeURIComponent(category)}`);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  async getCategories() {
    try {
      const response = await api.get('/cocktails/categories/list');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Test connection to the server
  async testConnection() {
    try {
      const response = await api.get('/test');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }
};

export default cocktailService; 