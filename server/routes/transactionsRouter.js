const express = require('express');
const transactionsRouter = express.Router();

// const {getMonthTransac} = require('../controllers/transactions/getMonthTransac')
// const {getRangeTransac} = require('../controllers/transactions/getRangeTransac')
// const {getDayTransac} = require('../controllers/transactions/getDayTransac')
// const {topMonthSpending} = require('../controllers/transactions/getTopMonthSpending')
const {getTransac} = require('../controllers/transactions/getTransactions')
const {getTotalExpense} = require('../controllers/transactions/getTotalExpense')
const {getTotalIncome} = require('../controllers/transactions/getTotalIncome')
const {getTopSpending} = require('../controllers/transactions/getTopSpending')
const {getTopIncome} = require('../controllers/transactions/getTopIncome')
// const {makeTransac} = require('../controllers/transactions/makeTransac')
const {makeIncome} = require('../controllers/transactions/makeIncome')
const {makeExpense} = require('../controllers/transactions/makeExpense')
const {makeTransfer} = require('../controllers/transactions/makeTransfer')
const {updateTransac} = require('../controllers/transactions/updateTransac')
const {deleteTransac} = require('../controllers/transactions/deleteTransac')
// transactionsRouter.get('/getMonthTransac', getMonthTransac)
// transactionsRouter.get('/getRangeTransac', getRangeTransac)
// transactionsRouter.get('/getDayTransac', getDayTransac)
transactionsRouter.get('/getTransactions', getTransac)
// transactionsRouter.get('/getTopMonthSpending', topMonthSpending)
transactionsRouter.get('/getTotalExpense', getTotalExpense)
transactionsRouter.get('/getTotalIncome', getTotalIncome)
transactionsRouter.get('/getTopSpending', getTopSpending)
transactionsRouter.get('/getTopIncome', getTopIncome)

transactionsRouter.post('/makeIncome', makeIncome)
transactionsRouter.post('/makeExpense', makeExpense)
transactionsRouter.post('/makeTransfer', makeTransfer)

transactionsRouter.patch('/updateTransaction', updateTransac)
transactionsRouter.delete('/deleteTransaction', deleteTransac)

module.exports = transactionsRouter;
