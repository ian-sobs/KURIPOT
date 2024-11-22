const express = require('express')
const router = express.Router()
const {registerUser} = require('../controllers/entry/registerController')
const {signInUser} = require('../controllers/entry/signInController')

router.post('/signUp', registerUser)
router.post('/signIn', signInUser)

module.exports = router;