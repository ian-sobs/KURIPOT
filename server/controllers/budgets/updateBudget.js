const db = require('../../db/models/index')
const sequelize = db.sequelize
const {Budget, BudgetCategory} = sequelize.models 
const {Op} = require('sequelize')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.updateBudget = async (req, res)=>{
    const {usrId} = req.user
    const {id, date, budgetLimit} = req.body

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    let updateField = {}

    let parsedDate
    if(date){
        parsedDate = new Date(date)
        if(!isNaN(parsedDate)){
            date = parsedDate.toISOString()
            updateField['date'] = date
        }
    }

    budgetLimit = parseFloat(budgetLimit).toFixed(2)
    if(!isNaN(budgetLimit)){
        updateField['budgetLimit'] = budgetLimit
    }

    try{
        const oldMonthBudgetInfo = await Budget.findOne({
            where: {
                id: id,
                user_id: usrId
            },

            attributes: ['id', 'date', 'budgetLimit', 'type'],

            include: {
                model: Category, // Include the associated B records
                attributes: ['id', 'name', 'isIncome'],
                through: { attributes: ['categoryLimit'] } // Optional: Exclude attributes of the through table C
            }
        })

        if(!oldMonthBudgetInfo){
            return res.status(404).json({message: 'No budget found'})
        }

        const [rowsCount, rows] = await Budget.update(
            updateField,
            {
                where: {
                    id: id,
                    user_id: usrId
                },
                returning: true
            }
        )

        if(rowsCount <= 0){
            return res.status(200).json({message: 'No changes made'})
        }

        let [updatedBudget] = rows

        return res.status(200).json(updatedBudget)
    } catch (err) {
        console.error('Error making a new budget:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to to make a new budget' }); // Respond with an error
    }

}