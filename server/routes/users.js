const express = require('express');
const router = express.Router();

// Temporary in-memory storage for users (replace with MongoDB later)
let users = [];

// Get all users
router.get('/', (req, res) => {
  res.json(users);
});

// Create a new user
router.post('/', (req, res) => {
  const { username, email } = req.body;
  const newUser = {
    id: Date.now().toString(),
    username,
    email,
    favorites: []
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get user by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// Update user
router.put('/:id', (req, res) => {
  const { username, email } = req.body;
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex] = { ...users[userIndex], username, email };
  res.json(users[userIndex]);
});

// Delete user
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router; 