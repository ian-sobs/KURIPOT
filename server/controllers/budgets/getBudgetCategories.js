const db = require('../../models/index')
const sequelize = db.sequelize
const {Budget, Category} = sequelize.models 
const { Op, Sequelize } = require('sequelize');


exports.getBudgetCategories = async (req, res)=>{
    const {usrId, usrname, email} = req.user
    const {budgetId, type} = req.query
    const parsedBudgetId = parseInt(budgetId, 10)

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try{
        const monthBudget = await Budget.findOne({
            where: {
                id: parsedBudgetId,
                user_id: usrId  // user_id condition
            },

            attributes: ['id', 'date', 'budgetLimit', 'type'],
            
            include: {
                model: Category, // Include the associated B records
                attributes: ['id', 'name', 'isIncome'],
                through: { attributes: ['categoryLimit'] } // Optional: Exclude attributes of the through table C
            }
        })

        // if(!monthBudget){
        //     res.status(404).json({message: 'No such budget exists'})
        // }
    
        return res.status(200).json(monthBudget)
    
    } catch (err) {
        console.error('Error fetching budget of a month:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch budget of a month' }); // Respond with an error
    }

}