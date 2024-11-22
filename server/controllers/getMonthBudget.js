const db = require('../models/index')
const sequelize = db.sequelize
const {Budget, Category} = sequelize.models 
const { Op, Sequelize } = require('sequelize');


exports.getMonthBudget = async (req, res)=>{
    const {userId, usrname, email} = req.user
    const {month, year} = req.query

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    let monthBudget

    try{
        monthBudget = await Budget.findOne({
            where: {
                [Op.and]: [
                    { user_id: userId },  // user_id condition
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), { [Op.eq]: month }),  // Match the month
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), { [Op.eq]: year })   // Match the year
                ]
            },

            attributes: ['id', 'date', 'budgetLimit', 'type'],
            
            include: {
                model: Category, // Include the associated B records
                attributes: ['id', 'name', 'isIncome'],
                through: { attributes: ['categoryLimit'] } // Optional: Exclude attributes of the through table C
            }
        })
    } catch (err) {
        console.error('Error fetching budget of a month:', err.message); // Log the error
        res.status(500).json({ message: 'Failed to fetch budget of a month' }); // Respond with an error
    }

    if(!monthBudget){
        res.status(404).json({message: 'No such budget exists'})
    }

    return res.status(200).json({
        message: "Budget and its categories fetched successfully",
        monthBudget: monthBudget
    })

}