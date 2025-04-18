const express = require('express');
const router = express.Router();
const cocktailApi = require('../services/cocktailApi');

// Get random cocktail
router.get('/random', async (req, res) => {
  try {
    const data = await cocktailApi.getRandom();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search cocktails by name
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: 'Name parameter is required' });
    }
    const data = await cocktailApi.searchByName(name);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cocktail by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cocktailApi.getById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cocktails by ingredient
router.get('/ingredient/:ingredient', async (req, res) => {
  try {
    const { ingredient } = req.params;
    const data = await cocktailApi.filterByIngredient(ingredient);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cocktails by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const data = await cocktailApi.filterByCategory(category);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all categories
router.get('/categories/list', async (req, res) => {
  try {
    const data = await cocktailApi.getCategories();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all glasses
router.get('/glasses/list', async (req, res) => {
  try {
    const data = await cocktailApi.getGlasses();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all ingredients
router.get('/ingredients/list', async (req, res) => {
  try {
    const data = await cocktailApi.getIngredients();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all alcoholic filters
router.get('/alcoholic/list', async (req, res) => {
  try {
    const data = await cocktailApi.getAlcoholicFilters();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 