const db = require('../../db/models/index')
const sequelize = db.sequelize
const {Category} = sequelize.models

exports.makeCategory = async (req, res) => {
    const {usrId} = req.user
    const {name, isIncome} = req.body

    try{
        const newCategory = await Category.create({name: name, user_id: usrId, isIncome: isIncome})

        return res.status(201).json(newCategory)
    } catch(err){
        console.error('Error making the new category:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to make category' }); 
    }

}
