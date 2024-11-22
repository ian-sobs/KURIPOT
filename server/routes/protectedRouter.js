const express = require('express');
const protectedRouter = express.Router();
const getAccounts = require('../controllers/getAccounts')

// Example of a protected route that only authenticated users can access
protectedRouter.get('/profile', (req, res) => {
  // You can access user data from `req.user` because it's set by the `authenticateToken` middleware
  res.json({ message: 'This is your profile', user: req.user });
});

// Another example of a protected route
protectedRouter.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to your dashboard', user: req.user });
});

protectedRouter.get('/accounts', )

module.exports = protectedRouter;
