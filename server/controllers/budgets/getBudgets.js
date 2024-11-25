const db = require('../../models/index')
const sequelize = db.sequelize
const {Budget} = sequelize.models 

exports.getBudgets = async (req, res)=>{
    const {userId, usrname, email} = req.user

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try{
        const budgetsOfUser = await Budget.findAll({
            where: {
                user_id: userId
            },
            attributes: ['id', 'date', 'budgetLimit', 'type']
        })
    
        // if(budgetsOfUser.length === 0){
        //     res.status(404).json({message: "Could not find any account"})
        // }
    
        return res.status(200).json(budgetsOfUser)
    } catch (err) {
        console.error('Error fetching accounts:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch accounts' }); // Respond with an error
    }

}