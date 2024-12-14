const db = require('../../db/models/index')
const sequelize = db.sequelize
const {Category, Transaction} = sequelize.models
const {unspendUnearn} = require('../transactions/helper/unspendUnearn')

exports.deleteCategory = async (req, res) => {
    if(!req.body.id){
        return res.status(400).json({ message: 'Category ID is required' });
    }

    const {usrId} = req.user
    let id = parseInt(req.body.id, 10)

    if(isNaN(id)){
        return res.status(400).json({message: 'Invalid category ID provided'})
    }


    try {
        const results = await Transaction.findAll({
            attributes: [
              'account_id',
              'type',
              [sequelize.fn('SUM', sequelize.col('amount')), 'amount']
            ],
            where: { category_id: id },
            group: ['account_id', 'type'],
            order: [['account_id', 'ASC'], ['type', 'ASC']],
        });

        let deletedRowsNum = await Category.destroy({
            where: {
                id: id
            }
        })

        if(deletedRowsNum <= 0){
            return res.status(404).json({ message: 'No matching category to delete' });
        }


        let affected = results.map((result)=>unspendUnearn(result.get({ plain: true }), usrId))
        res.status(200).json({
            message: "Deleted the category and associated transactions. Accounts' balance change",
            affectedAccounts: affected
        })
    } catch (error) {
        console.error('Error updating the category:', error); // Log the error
        return res.status(500).json({ message: 'Failed to update category' }); // Respond with an error        
    }
}