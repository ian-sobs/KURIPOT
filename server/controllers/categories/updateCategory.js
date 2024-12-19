const db = require('../../db/models/index')
const sequelize = db.sequelize
const {Category} = sequelize.models

exports.updateCategory = async (req, res) => {
    if(!req.body.id){
        return res.status(400).json({ message: 'Category ID is required' });
    }

    const {usrId} = req.user
    let updateObj = {}
    let updatedFields = Object.keys(req.body).filter(
        (field) => field !== 'id' && field !== 'user_id' && field !== 'isIncome'
    );
    updatedFields.forEach(fieldUpdate => {
        updateObj[fieldUpdate] = req.body[fieldUpdate]
    });

    try {
        // Change everyone without a last name to "Doe"
        let [affectedRowsNum, affectedRows] = await Category.update(
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
            return res.status(404).json({ message: 'Category not found or no changes made' });
        }

        let [updatedCategory] = affectedRows

        res.status(200).json(updatedCategory)
    } catch (error) {
       // console.error('Error updating the category:', error); // Log the error
        return res.status(500).json({ message: 'Failed to update category' }); // Respond with an error        
    }
}