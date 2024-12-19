const db = require('../../db/models/index')
const sequelize = db.sequelize
const {Budget} = sequelize.models 
const {Op} = require('sequelize')

exports.getBudgets = async (req, res)=>{
    const {usrId, usrname, email} = req.user
    const {type, startDate, endDate} = req.query

    let whereClause = {
        user_id: usrId
    }

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if(type){
        whereClause.type = type
    }

    let parsedStartDate
    let parsedEndDate

    if(startDate && endDate){
        parsedStartDate = new Date(startDate)
        parsedEndDate = new Date(endDate)

        whereClause.date = {
            [Op.between]: [parsedStartDate, parsedEndDate]
        }
    }

    try{
        const budgetsOfUser = await Budget.findAll({
            where: whereClause,
            attributes: ['id', 'date', 'budgetLimit', 'type']
        })
    
        // if(budgetsOfUser.length === 0){
        //     res.status(404).json({message: "Could not find any account"})
        // }
    
        return res.status(200).json({
            message: "Budgets fetched successfully",
            budgets: budgetsOfUser
        })
    } catch (err) {
        //console.error('Error fetching accounts:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch accounts' }); // Respond with an error
    }

}