const db = require('../../models/index')
const sequelize = db.sequelize
const {Account} = sequelize.models 

exports.updateAccount = async (req, res) => {
    if(!req.body.id){
        return res.status(400).json({ message: 'Account ID is required' });
    }

    const {usrId} = req.user
    let updateObj = {}
    let updatedFields = Object.keys(req.body).filter(
        (field) => field !== 'id' && field !== 'user_id'
    );
    updatedFields.forEach(fieldUpdate => {
        updateObj[fieldUpdate] = req.body[fieldUpdate]
    });

    try {
        // Change everyone without a last name to "Doe"
        let [affectedRowsNum, affectedRows] = await Account.update(
            updateObj,
            {
                where: {
                    id: req.body.id,
                    user_id: usrId
                },
                returning: true
            },
        );

        if (affectedRowsNum === 0) {
            return res.status(404).json({ message: 'Account not found or no changes made' });
        }

        let [updatedAccount] = affectedRows

        res.status(200).json(updatedAccount)
    } catch (error) {
        console.error('Error updating the account:', error); // Log the error
        return res.status(500).json({ message: 'Failed to update account' }); // Respond with an error        
    }
}