const db = require('../../models/index')
const sequelize = db.sequelize
const {Account} = sequelize.models 

exports.makeAccount = async (req, res)=>{
    const {userId, usrname, email} = req.user
    const {name, amount} = req.body

    if (!name || !userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try{
        const accountOfUser = await Account.create(
            {
                name: name, 
                user_id: userId, 
                amount: amount || 0
            }); 

        return res.status(201).json({
            message: 'Account made successfully',
            account: accountOfUser
        })
    } catch (err) {
        console.error('Error making the account:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to make account' }); // Respond with an error
    }

}