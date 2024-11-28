const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.getTopIncome = async (req, res) => {
    const {usrId} = req.user
    let sortIn = req.query.sortIn

    let whereClause = valQueryParamDate(req.query, res, 'date')
    whereClause.user_id = usrId

    whereClause.amount = {
        [Op.gt]: 0
    }

    whereClause.from_account_id = null
    whereClause.to_account_id = null

    try{
        const totalEarned = await Transaction.sum('amount', {
            where: whereClause
            // {
            //     user_id: usrId,
            //     amount: {
            //         [Op.lt]: 0
            //     },
            //     from_account_id: null, // from_account_id is null
            //     to_account_id: null, // to_account_id is null
            //     [Op.and]: [
            //         Sequelize.where(
            //             Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM'), Sequelize.col('date')),
            //             { [Op.eq]: parsedMonth }
            //         ),
            //         Sequelize.where(
            //             Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM'), Sequelize.col('date')),
            //             { [Op.eq]: parsedYear }
            //         ),
            //     ]

            // }
        })

        const categoryEarnings = await Transaction.findAll({
            attributes: [
                'category_id',
                'categoryName', // Group by 'category'
                [sequelize.fn('sum', sequelize.col('amount')), 'earned'], // Sum of 'amount' for each category
            ],
            where: whereClause,
            group: ['category_id'], // Group by 'category'
            order: [sequelize.literal('earned '+ sortIn)], // Use a literal for ordering by the alias
        })

        let catEarned = categoryEarnings.map((catDetails) => {
            return {
                categoryId: catDetails.category_id,
                categoryName: catDetails.categoryName,
                earned: catDetails.earned,
                earnedPercentage: ((catDetails.earned / totalEarned) * 100).toFixed(2)
            }
        })

        return res.status(200).json({
            totalEarned: totalEarned,
            categories: catEarned
        })
    } catch(err){
        console.error('Error fetching categories:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch top spending categories in the given date or date range' });
    }

}