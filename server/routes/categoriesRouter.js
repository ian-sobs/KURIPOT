const express = require('express');
const categoriesRouter = express.Router();

const {getCategories} = require('../controllers/categories/getCategories')
const {getCategoryInfo} = require('../controllers/categories/getCategoryInfo')

categoriesRouter.get('/getCategories', getCategories)
categoriesRouter.get('/getCategoryInfo', getCategoryInfo)

module.exports = categoriesRouter;
