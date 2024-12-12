const express = require('express')
const router = express.Router()

const {finalizeUser} = require('../controllers/user/finalizeUser')


router.patch('/finalizeUser', finalizeUser)

module.exports = router;