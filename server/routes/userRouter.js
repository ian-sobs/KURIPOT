const express = require('express')
const router = express.Router()
const registerController = require('../controllers/user/registerController')
const signInController = require('../controllers/user/signInController')

router.post('/signUp', registerController)
router.post('/signIn', signInController)

module.exports = router;