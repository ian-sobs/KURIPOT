const db = require('../../db/models/index')
const sequelize = db.sequelize
const {Account, Transaction} = sequelize.models 

exports.makeAccount = async (req, res)=>{
    const {usrId, usrname, email} = req.user
    const {name, amount} = req.body

    if (!name || !usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    try{
        const accountOfUser = await Account.create(
            {
                name: name, 
                user_id: usrId, 
                amount: amount || 0
            });
        console.log('accountOfUser', accountOfUser)
        if (parseFloat(accountOfUser.amount).toFixed(2) != 0){
            const transacAdjust = await Transaction.create(
                {
                    user_id: usrId,
                    amount: accountOfUser.amount,
                    account_id: accountOfUser.id,
                    accountName: accountOfUser.name,
                    date: new Date(),
                    category_id: null,
                    categoryName: null,
                    from_account_id: null,
                    from_accountName: null,
                    to_account_id: null,
                    to_accountName: null,
                    note: `Initial balance in ${accountOfUser.name} account `,
                    recurr_id: null,
                    type: 'income'
                })
        }
        return res.status(201).json({
            message: 'Account made successfully',
            account: accountOfUser
        })
    } catch (err) {
        console.error('Error making the account:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to make account' }); // Respond with an error
    }

}