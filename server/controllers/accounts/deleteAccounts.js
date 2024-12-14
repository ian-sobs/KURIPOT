const db = require('../../db/models/index')
const sequelize = db.sequelize
const {Account} = sequelize.models 

exports.deleteAccounts = async (req, res) => {
    if(!req.body.idArr || req.body.idArr.length === 0){
        return res.status(400).json({ message: 'Account IDs required' });
    }
    const {idArr} = req.body
    const {usrId} = req.user

    try {
        let message = {}
        let numDestroyedRows = await Account.destroy({
            where: {
                id: idArr,
                user_id: usrId
            }
        })

        if(numDestroyedRows > 0){
            return res.status(200).json({message: `Successfully deleted ${numDestroyedRows} account(s).`})
        }

        return res.status(404).json({message: 'No accounts found to delete for the specified user.'})
    } catch (error) {
        console.error('Error deleting the accounts:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Failed to delete account(s), please try again later.' });   
    }
}