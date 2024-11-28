const express = require('express');
const budgetsRouter = express.Router();
const {getMonthBudgetCategories} = require('../controllers/budgets/getMonthBudgetCategories')
const {getBudgetCategories} = require('../controllers/budgets/getBudgetCategories')
const {getBudgets} = require('../controllers/budgets/getBudgets')

budgetsRouter.get('/getMonthBudgetCategories', getMonthBudgetCategories)
budgetsRouter.get('/getBudgetCategories', getBudgetCategories)
budgetsRouter.get('/getBudgets', getBudgets)

module.exports = budgetsRouter;
