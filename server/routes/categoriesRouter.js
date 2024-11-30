const express = require('express');
const categoriesRouter = express.Router();

const {getCategories} = require('../controllers/categories/getCategories')
const {getCategoryInfo} = require('../controllers/categories/getCategoryInfo')
const {makeCategory} = require('../controllers/categories/makeCategory')

categoriesRouter.get('/getCategories', getCategories)
categoriesRouter.get('/getCategoryInfo', getCategoryInfo)

categoriesRouter.post('/makeCategory', makeCategory)

module.exports = categoriesRouter;
