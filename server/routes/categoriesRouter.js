const express = require('express');
const categoriesRouter = express.Router();

const {getCategories} = require('../controllers/categories/getCategories')
const {getCategoryInfo} = require('../controllers/categories/getCategoryInfo')
const {makeCategory} = require('../controllers/categories/makeCategory')
const {deleteCategory} = require('../controllers/categories/deleteCategory')
const {updateCategory} = require('../controllers/categories/updateCategory')

categoriesRouter.get('/getCategories', getCategories)
categoriesRouter.get('/getCategoryInfo', getCategoryInfo)

categoriesRouter.post('/makeCategory', makeCategory)

categoriesRouter.patch('/updateCategory', updateCategory)

categoriesRouter.delete('/deleteCategory', deleteCategory)

module.exports = categoriesRouter;
