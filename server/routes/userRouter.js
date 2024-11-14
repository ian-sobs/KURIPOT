const express = require('express')
const router = express.Router()
const {registerUser} = require('../controllers/user/registerController')
const {signInUser} = require('../controllers/user/signInController')

router.post('/signUp', registerUser)
router.post('/signIn', signInUser)

module.exports = router;