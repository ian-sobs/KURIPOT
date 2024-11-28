const express = require('express');
const protectedRouter = express.Router();
const {getAccounts} = require('../controllers/accounts/getAccounts')
const {getCategories} = require('../controllers/categories/getCategories')
const {getMonthBudgetCategories} = require('../controllers/budgets/getMonthBudgetCategories')
const {makeAccount} = require('../controllers/accounts/makeAccount')
const {getMonthTransac} = require('../controllers/transactions/getMonthTransac')
const {getRangeTransac} = require('../controllers/transactions/getRangeTransac')
const {getDayTransac} = require('../controllers/transactions/getDayTransac')
const {topMonthSpending} = require('../controllers/transactions/topMonthSpending')
const {getTransac} = require('../controllers/transactions/getTransactions')
const {getTotalExpense} = require('../controllers/transactions/getTotalExpense')
const {getTotalIncome} = require('../controllers/transactions/getTotalIncome')
const {getTopSpending} = require('../controllers/transactions/topSpending')
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
protectedRouter.get('/getMonthBudgetCategories', getMonthBudgetCategories)

protectedRouter.get('/getMonthTransac', getMonthTransac)
protectedRouter.get('/getRangeTransac', getRangeTransac)
protectedRouter.get('/getDayTransac', getDayTransac)
protectedRouter.get('/getTransactions', getTransac)
protectedRouter.get('/getTopMonthSpending', topMonthSpending)
protectedRouter.get('/getTotalExpense', getTotalExpense)
protectedRouter.get('/getTotalIncome', getTotalIncome)
protectedRouter.get('/getTopSpending', getTopSpending)

module.exports = protectedRouter;
