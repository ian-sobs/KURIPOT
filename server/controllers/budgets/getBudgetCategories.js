const db = require('../../db/models/index')
const sequelize = db.sequelize
const {Budget, Category} = sequelize.models 
const { Op, Sequelize } = require('sequelize');
const { valQueryParamDate } = require('../utility/valQueryParamDate');


exports.getBudgetCategories = async (req, res)=>{
    const {usrId} = req.user
    const {budgetId, type, month, year} = req.query
    let parsedBudgetId

    let whereClause = {
        user_id: usrId
    }

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if(budgetId){
        parsedBudgetId = parseInt(budgetId, 10)
        whereClause.id = parsedBudgetId
    }
    else if(type && month && year){
        whereClause = {
            ... whereClause,
            ...valQueryParamDate({month, year, period: 'month'}, res, 'date'),
            type: type
        }
    }
    else{
        return res.status(400).json({message: 'lacked query parameters to select a record'})
    }

    try{
        const monthBudget = await Budget.findOne({
            where: whereClause,

            attributes: ['id', 'date', 'budgetLimit', 'type'],

            include: {
                model: Category, // Include the associated B records
                attributes: ['id', 'name', 'isIncome'],
                through: { attributes: ['categoryLimit'] } // Optional: Exclude attributes of the through table C
            }
        })

        return res.status(200).json(monthBudget)

    } catch (err) {
        console.error('Error fetching budget of a month:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch budget of a month' }); // Respond with an error
    }

}