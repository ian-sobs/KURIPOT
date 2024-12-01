const db = require('../../models/index')
const sequelize = db.sequelize
const {Budget, BudgetCategory} = sequelize.models 
const {Op} = require('sequelize')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.deleteBudgetCategory = async (req, res)=>{
    const {usrId} = req.user
    let {id} = req.body

    id = parseInt(id, 10)

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if(isNaN(id)){
        return res.status(400).json({message: 'ID of budget category to delete is required'})
    }

    try{
        const numRowsAffected = await BudgetCategory.destroy({
            where: {
                id: id,
                user_id: usrId
            }
        })

        if(numRowsAffected <= 0){
            return res.status(404).json({message: 'The budget\'s category to delete does not exist'})
        }

        return res.status(200).json({numRowsAffected: numRowsAffected})
    } catch (err) {
        console.error('Error deleting the budget\'s category:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to delete the budget\'s category' }); // Respond with an error
    }

}