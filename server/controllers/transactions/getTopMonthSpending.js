const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')

exports.getTopMonthSpending = async (req, res) => {
    const {usrId} = req.user
    const {month, year} = req.query

    if(!month || !year){
        return res.status(400).json({ message: 'Month and year required' }); 
    }

    const parsedMonth = parseInt(month, 10)
    const parsedYear = parseInt(year, 10)

    if(isNaN(parsedMonth) || isNaN(parsedYear)){
        return res.status(400).json({message: 'month and year are not numbers'})
    }

    if(parsedMonth < 1 || parsedMonth > 12){
        return res.status(400).json({message: 'invalid month'})
    }

    if(parsedYear < 0){
        return res.status(400).json({message: 'invalid year'})
    }

    try{
        const totalSpent = await Transaction.sum('amount', {
            where: {
                user_id: usrId,
                amount: {
                    [Op.lt]: 0
                },
                from_account_id: null, // from_account_id is null
                to_account_id: null, // to_account_id is null
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM'), Sequelize.col('date')),
                        { [Op.eq]: parsedMonth }
                    ),
                    Sequelize.where(
                        Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM'), Sequelize.col('date')),
                        { [Op.eq]: parsedYear }
                    ),
                ]

            }
        })

        const categorySpending = await Transaction.findAll({
            attributes: [
                'category_id',
                'categoryName', // Group by 'category'
                [sequelize.fn('sum', sequelize.col('amount')), 'spent'], // Sum of 'amount' for each category
            ],
            where: {
                user_id: usrId, // Filter by userId
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM'), Sequelize.col('date')),
                        { [Op.eq]: parsedMonth }
                    ),
                    Sequelize.where(
                        Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM'), Sequelize.col('date')),
                        { [Op.eq]: parsedYear }
                    ),
                ],
                amount: {
                    [Op.lt]: 0
                },
                from_account_id: null, // from_account_id is null
                to_account_id: null, // to_account_id is null
            },
            group: ['category_id'], // Group by 'category'
            order: [sequelize.literal('spent DESC')], // Use a literal for ordering by the alias
        })

        let catMonthSpend = categorySpending.map((catDetails) => {
            return {
                categoryId: catDetails.category_id,
                categoryName: catDetails.categoryName,
                spent: catDetails.spent,
                spentPercentage: ((catDetails.spent / totalSpent) * 100).toFixed(2)
            }
        })

        return res.status(200).json({
            totalSpent: totalSpent,
            categories: catMonthSpend
        })
    } catch(err){
        console.error('Error fetching transactions:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch top spending categories in a given month of a year' });
    }

}