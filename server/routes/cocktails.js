const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
const API_KEY = '1'; // Test API key

// Get random cocktail
router.get('/random', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/random.php`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching random cocktail' });
  }
});

// Search cocktails by name
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get(`${API_BASE_URL}/search.php?s=${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error searching cocktails' });
  }
});

// Get cocktail by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cocktail details' });
  }
});

// Get cocktails by ingredient
router.get('/ingredient/:ingredient', async (req, res) => {
  try {
    const { ingredient } = req.params;
    const response = await axios.get(`${API_BASE_URL}/filter.php?i=${ingredient}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cocktails by ingredient' });
  }
});

// Get cocktails by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cocktails by category' });
  }
});

// List all categories
router.get('/categories/list', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list.php?c=list`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

module.exports = router; 