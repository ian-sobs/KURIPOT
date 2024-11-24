const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')

exports.topMonthSpending = async (req, res) => {
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
                from_account_id: {
                    [Op.eq]: null // from_account_id is null
                },
                to_account_id: {
                    [Op.eq]: null // to_account_id is null
                },
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
                ]
              },
              group: ['category_id'], // Group by 'category'
        })
    } catch(err){

    }

}