const db = require('../../models/index')
const sequelize = db.sequelize
const {Category} = sequelize.models 

exports.getCategories = async (req, res)=>{
    const {usrId} = req.user
    let {isIncome, sortIn} = req.query
    let whereClause = {
        user_id: usrId
    }

    if (!usrId) {
        return res.status(400).json({ message: 'User ID is required' });
    }

    if(isIncome === 'true'){
        whereClause.isIncome = true
    }
    else if(isIncome === 'false'){
        whereClause.isIncome = false
    }

    let categoriesOfUser

    try{
        categoriesOfUser = await Category.findAll({
            where: whereClause,
            attributes: ['id', 'name', 'isIncome']
        })

        // if(!categoriesOfUser){
        //     res.status(404).json({message: "Could not find any account"})
        // }
    
        return res.status(200).json(categoriesOfUser)
    } catch (err) {
        console.error('Error fetching categories:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch categories' }); // Respond with an error
    }


}