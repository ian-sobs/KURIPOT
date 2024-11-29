const express = require('express');
const accountsRouter = express.Router();
const {getAccounts} = require('../controllers/accounts/getAccounts')
const {makeAccount} = require('../controllers/accounts/makeAccount')
const {updateAccount} = require('../controllers/accounts/updateAccount')

accountsRouter.get('/getAccounts', getAccounts)
accountsRouter.post('/makeAccount', makeAccount)
accountsRouter.patch('/updateAccount', updateAccount)

module.exports = accountsRouter;
