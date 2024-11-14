const express = require('express')
const router = express.Router()
const {refAccessToken} = require('../controllers/authentication/refAccessToken')

router.post('/refresh', refAccessToken)

module.exports = router;