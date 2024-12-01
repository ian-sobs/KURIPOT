const db = require('../../models/index')
const sequelize = db.sequelize
const {Budget, BudgetCategory} = sequelize.models
const {Op} = require('sequelize')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.updateBudgetCategory = async (req, res) => {
    const {usrId} = req.user
    let {id, categoryId, categoryLimit} = req.body
    let updateField = {}

    id = parseInt(id, 10)
    if(isNaN(id)){
        return res.status(400).json({message: 'Invalid BudgetCategory ID was provided'})
    }

    categoryId = parseInt(categoryId, 10)
    if(!isNaN(categoryId)){
        updateField['category_id'] = categoryId
    }

    categoryLimit = parseFloat(categoryLimit).toFixed(2)
    if(!isNaN(categoryLimit)){
        updateField['categoryLimit'] = categoryLimit
    }


    try {
        const [affectedRowsNum, affectedRows] = await BudgetCategory.update(
            updateField,
            {
                where: {
                    id: id,
                    user_id: usrId
                },
                returning: true
            }
        )

        if(affectedRowsNum <= 0){
            return res.status(200).json({message: 'No changes made'})
        }
        const [updatedBudgetCategory] = affectedRows

        return res.status(200).json(updatedBudgetCategory)

    } catch (error) {
        console.error('Error updating a budget category:', error.message); // Log the error
        return res.status(500).json({ message: 'Failed to to update a budget category' }); // Respond with an error
    }
}