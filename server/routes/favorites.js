const express = require('express');
const router = express.Router();

// Temporary in-memory storage for favorites (replace with MongoDB later)
let favorites = [];

// Get all favorites
router.get('/', (req, res) => {
  res.json(favorites);
});

// Add a favorite
router.post('/', (req, res) => {
  const { userId, cocktailId } = req.body;
  const newFavorite = {
    id: Date.now().toString(),
    userId,
    cocktailId,
    createdAt: new Date()
  };
  favorites.push(newFavorite);
  res.status(201).json(newFavorite);
});

// Get favorites by user ID
router.get('/user/:userId', (req, res) => {
  const userFavorites = favorites.filter(f => f.userId === req.params.userId);
  res.json(userFavorites);
});

// Remove a favorite
router.delete('/:id', (req, res) => {
  const favoriteIndex = favorites.findIndex(f => f.id === req.params.id);
  if (favoriteIndex === -1) {
    return res.status(404).json({ message: 'Favorite not found' });
  }
  favorites.splice(favoriteIndex, 1);
  res.status(204).send();
});

module.exports = router; 