const express = require('express');
const accountsRouter = express.Router();
const {getAccounts} = require('../controllers/accounts/getAccounts')
const {makeAccount} = require('../controllers/accounts/makeAccount')

accountsRouter.get('/getAccounts', getAccounts)
accountsRouter.post('/makeAccount', makeAccount)

module.exports = accountsRouter;
