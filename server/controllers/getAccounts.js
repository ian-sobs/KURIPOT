const db = require('../models/index')
const sequelize = db.sequelize
const {Account} = sequelize.models 

exports.getAccounts = async (req, res)=>{
    const {userId, usrname, email} = req.user

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    let accountsOfUser

    try{
        accountsOfUser = await Account.findAll({
            where: {
                user_id: userId
            },
            attributes: ['id', 'name', 'amount']
        })
        res.status(200).json(accountsOfUser); // Send accounts as a response (if in a route handler)
    } catch (err) {
        console.error('Error fetching accounts:', err.message); // Log the error
        res.status(500).json({ message: 'Failed to fetch accounts' }); // Respond with an error
    }

}