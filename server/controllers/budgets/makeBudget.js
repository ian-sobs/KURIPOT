const db = require('../../models/index')
const sequelize = db.sequelize
const {Budget, BudgetCategory} = sequelize.models 
const {Op} = require('sequelize')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.makeBudget = async (req, res)=>{
    const {usrId} = req.user
    const {date, budgetLimit, type, categories} = req.body

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    let parsedDate = new Date(date)
    const month = parsedDate.getUTCMonth() + 1
    const year = parsedDate.getUTCFullYear()

    let whereClause = valQueryParamDate({month, year, period: 'month'}, res, 'date')
    whereClause.type = type
    whereClause.user_id = usrId



    try{
        const existingBudget = await Budget.findOne({
            where: whereClause
        })

        if(existingBudget){
            return res.status(400).json({message: 'Budget already exists'})
        }

        const newBudget = await Budget.create({
            user_id: usrId,
            date: parsedDate,
            budgetLimit: budgetLimit,
            type: type
        })

        let budgetCategories = []
        let newBudgetCategories = []
        if(categories){
            budgetCategories = categories.map((catDetail) => {
                return {
                    user_id: parseInt(usrId, 10),
                    budget_id: newBudget.id,
                    category_id: catDetail.categoryId,
                    categoryLimit: catDetail.categoryLimit
                }
            });
        }

        newBudgetCategories = await BudgetCategory.bulkCreate(budgetCategories)

        return res.status(200).json({
            budget: newBudget,
            budgetCategories: newBudgetCategories
        })
    } catch (err) {
        console.error('Error fetching accounts:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch accounts' }); // Respond with an error
    }

}