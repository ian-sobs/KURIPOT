const express = require('express')
const router = express.Router()
const {registerUser} = require('../controllers/entry/registerController')
const {signInUser} = require('../controllers/entry/signInController')
const {logoutUser} = require('../controllers/entry/logoutController')

router.post('/signUp', registerUser)
router.post('/signIn', signInUser)
router.post('/logout', logoutUser)

module.exports = router;