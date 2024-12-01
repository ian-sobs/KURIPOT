const express = require('express');
const budgetsRouter = express.Router();
const {getMonthBudgetCategories} = require('../controllers/budgets/getMonthBudgetCategories')
const {getBudgetCategories} = require('../controllers/budgets/getBudgetCategories')
const {getBudgets} = require('../controllers/budgets/getBudgets')
const {makeBudget} = require('../controllers/budgets/makeBudget')
const {addNewBudgetCategories} = require('../controllers/budgets/addNewBudgetCategories')
const {updateBudget} = require('../controllers/budgets/updateBudget')
const {deleteBudget} = require('../controllers/budgets/deleteBudget')
const {deleteBudgetCategory} = require('../controllers/budgets/deleteBudgetCategory')
const {updateBudgetCategory} = require('../controllers/budgets/updateBudgetCategory')

budgetsRouter.get('/getMonthBudgetCategories', getMonthBudgetCategories)
budgetsRouter.get('/getBudgetCategories', getBudgetCategories)
budgetsRouter.get('/getBudgets', getBudgets)

budgetsRouter.post('/makeBudget', makeBudget)
budgetsRouter.post('/addNewBudgetCategories', addNewBudgetCategories)

budgetsRouter.patch('/updateBudget', updateBudget)
budgetsRouter.patch('/updateBudgetCategory', updateBudgetCategory)

budgetsRouter.delete('/deleteBudget', deleteBudget)
budgetsRouter.delete('/deleteBudgetCategory', deleteBudgetCategory)

module.exports = budgetsRouter;
