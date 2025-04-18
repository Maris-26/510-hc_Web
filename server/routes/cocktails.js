const express = require('express');
const router = express.Router();
const cocktailApi = require('../services/cocktailApi');

// Search by name
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const data = await cocktailApi.searchByName(name);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search by first letter
router.get('/search/letter', async (req, res) => {
  try {
    const { letter } = req.query;
    const data = await cocktailApi.searchByFirstLetter(letter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get cocktail by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await cocktailApi.getCocktailById(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get random cocktail
router.get('/random', async (req, res) => {
  try {
    const data = await cocktailApi.getRandomCocktail();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter by ingredient
router.get('/filter/ingredient', async (req, res) => {
  try {
    const { ingredient } = req.query;
    const data = await cocktailApi.filterByIngredient(ingredient);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter by alcoholic
router.get('/filter/alcoholic', async (req, res) => {
  try {
    const { alcoholic } = req.query;
    const data = await cocktailApi.filterByAlcoholic(alcoholic);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter by category
router.get('/filter/category', async (req, res) => {
  try {
    const { category } = req.query;
    const data = await cocktailApi.filterByCategory(category);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filter by glass
router.get('/filter/glass', async (req, res) => {
  try {
    const { glass } = req.query;
    const data = await cocktailApi.filterByGlass(glass);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const data = await cocktailApi.getCategories();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get glasses
router.get('/glasses', async (req, res) => {
  try {
    const data = await cocktailApi.getGlasses();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get ingredients
router.get('/ingredients', async (req, res) => {
  try {
    const data = await cocktailApi.getIngredients();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get alcoholic filters
router.get('/alcoholic-filters', async (req, res) => {
  try {
    const data = await cocktailApi.getAlcoholicFilters();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 