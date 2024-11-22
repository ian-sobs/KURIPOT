const express = require('express');
const protectedRouter = express.Router();
const getAccounts = require('../controllers/accounts/getAccounts')
const getCategories = require('../controllers/categories/getCategories')
const getMonthBudget = require('../controllers/budgets/getMonthBudget')
const makeAccount = require('../controllers/accounts/makeAccount')
const getMonthTransac = require('../controllers/transactions/getMonthTransac')

// Example of a protected route that only authenticated users can access
protectedRouter.get('/profile', (req, res) => {
  // You can access user data from `req.user` because it's set by the `authenticateToken` middleware
  res.json({ message: 'This is your profile', user: req.user });
});

// Another example of a protected route
protectedRouter.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to your dashboard', user: req.user });
});

protectedRouter.get('/getAccounts', getAccounts)
protectedRouter.post('/makeAccount', makeAccount)

protectedRouter.get('/getCategories', getCategories)
protectedRouter.get('/getMonthBudget', getMonthBudget)

protectedRouter.get('/getMonthTransac', getMonthTransac)

module.exports = protectedRouter;
