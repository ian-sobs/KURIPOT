const db = require('../../models/index')
const sequelize = db.sequelize
const {Budget, Category} = sequelize.models 
const { Op, Sequelize } = require('sequelize');


exports.getMonthBudgetCategories = async (req, res)=>{
    const {usrId, usrname, email} = req.user
    const {month, year, type} = req.query

    let whereClause = {
        [Op.and]: [
            { user_id: usrId },  // user_id condition
            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "date"')), { [Op.eq]: month }),  // Match the month using EXTRACT
            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "date"')), { [Op.eq]: year })   // Match the year using EXTRACT
        ]       
    }


    whereClause.type = (type) ? type : 'expense'
    

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try{
        const monthBudget = await Budget.findOne({
            where: whereClause,
            // {
            //     [Op.and]: [
            //         { user_id: usrId },  // user_id condition
            //         Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM "date"')), { [Op.eq]: month }),  // Match the month using EXTRACT
            //         Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM "date"')), { [Op.eq]: year })   // Match the year using EXTRACT
            //     ]
            // },

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