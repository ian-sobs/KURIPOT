const db = require('../../models/index')
const sequelize = db.sequelize
const {Budget, BudgetCategory} = sequelize.models
const {Op} = require('sequelize')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.addNewBudgetCategories = async (req, res) => {
    const {usrId} = req.user
    let {budgetId, categories} = req.body
    const cateogryArr = categories

    budgetId = parseInt(budgetId, 10)
    if(isNaN(budgetId)){
        return res.status(400).json({message: 'Invalid budget ID was provided'})
    }

    let arrToInsert = cateogryArr.map((category) => {
        category.id = parseInt(category.id, 10)
        if(isNaN(category.id)){
            return res.status(400).json({message: 'Invalid category ID was provided'})
        }

        category.limit = parseFloat(category.limit).toFixed(2)
        if(isNaN(category.limit)){
            return res.status(400).json({message: 'Invalid value was provided for category limit'})
        }
        
        return {
            user_id: usrId,
            budget_id: budgetId,
            category_id: category.id,
            categoryLimit: category.limit
        }
    })

    try {
        const newBudgetCategories = await BudgetCategory.bulkCreate(arrToInsert)

        return res.status(201).json(newBudgetCategories)

    } catch (error) {
        console.error('Error making a new budget category:', error.message); // Log the error
        return res.status(500).json({ message: 'Failed to to make a new budget category' }); // Respond with an error
    }
}