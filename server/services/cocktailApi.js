const axios = require('axios');

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const cocktailApi = {
  // Search by name
  async searchByName(name) {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to search cocktails by name');
    }
  },

  // Search by first letter
  async searchByLetter(letter) {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?f=${letter}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to search cocktails by letter');
    }
  },

  // Search ingredient by name
  async searchIngredient(name) {
    try {
      const response = await axios.get(`${BASE_URL}/search.php?i=${name}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to search ingredient');
    }
  },

  // Lookup cocktail by ID
  async getById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get cocktail by ID');
    }
  },

  // Lookup ingredient by ID
  async getIngredientById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/lookup.php?iid=${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get ingredient details');
    }
  },

  // Get random cocktail
  async getRandom() {
    try {
      const response = await axios.get(`${BASE_URL}/random.php`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get random cocktail');
    }
  },

  // Filter by ingredient
  async filterByIngredient(ingredient) {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to filter cocktails by ingredient');
    }
  },

  // Filter by alcoholic
  async filterByAlcoholic(alcoholic) {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?a=${alcoholic}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to filter cocktails by alcoholic content');
    }
  },

  // Filter by category
  async filterByCategory(category) {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to filter cocktails by category');
    }
  },

  // Filter by glass
  async filterByGlass(glass) {
    try {
      const response = await axios.get(`${BASE_URL}/filter.php?g=${glass}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to filter cocktails by glass type');
    }
  },

  // Get lists
  async getCategories() {
    try {
      const response = await axios.get(`${BASE_URL}/list.php?c=list`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get categories');
    }
  },

  async getGlasses() {
    try {
      const response = await axios.get(`${BASE_URL}/list.php?g=list`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get glasses');
    }
  },

  async getIngredients() {
    try {
      const response = await axios.get(`${BASE_URL}/list.php?i=list`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get ingredients');
    }
  },

  async getAlcoholicFilters() {
    try {
      const response = await axios.get(`${BASE_URL}/list.php?a=list`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to get alcoholic filters');
    }
  }
};

module.exports = cocktailApi; 