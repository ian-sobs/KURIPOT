const db = require('../../models/index')
const sequelize = db.sequelize
const {Account} = sequelize.models 

exports.getAccounts = async (req, res)=>{
    const {usrId, usrname, email} = req.user

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try{
        const totalBalance = await Account.sum('amount')
        const accountsOfUser = await Account.findAll({
            where: {
                user_id: usrId
            },
            attributes: ['id', 'name', 'amount']
        })

        // if(accountsOfUser.length === 0){
        //     res.status(404).json({message: "Could not find any account"})
        // }

        return res.status(200).json({
            totalBalance: totalBalance,
            accounts: accountsOfUser
        })
    } catch (err) {
        console.error('Error fetching accounts:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch accounts' }); // Respond with an error
    }

}