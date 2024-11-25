const db = require('../../models/index')
const sequelize = db.sequelize
const {Category, Transaction} = sequelize.models 
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.getCategoryInfo = async (req, res)=>{
    const {usrId, usrname, email} = req.user
    let {categoryId} = req.query

    if (!usrId || !categoryId) {
        return res.status(400).json({ message: 'User and category ID are required' });
    }

    categoryId = parseInt(categoryId, 10)

    let whereClause = valQueryParamDate(req.query, res, 'date')

    whereClause.user_id = parseInt(usrId, 10)
    whereClause.category_id = categoryId

    try{
        let totalAmount = await Transaction.sum('amount', {
            where: whereClause
        })

        let categoryOfUser = await Category.findByPk(categoryId)

        return res.status(200).json({
            categoryId: categoryOfUser.id,
            categoryName: categoryOfUser.name,
            categoryType: (categoryOfUser.isIncome) ? 'income' : 'expense',
            categoryTotalAmount: totalAmount
        })
    } catch (err) {
        console.error('Error fetching categories:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch categories' }); // Respond with an error
    }


}