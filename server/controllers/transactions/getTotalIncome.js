
const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.getTotalIncome = async (req, res) => {
    const {usrId} = req.user

    let whereClause = valQueryParamDate(req.query, res, 'date')

    whereClause.user_id = usrId
    whereClause.amount = {
        [Op.gt]: 0
    }
    whereClause.type = 'income'
    whereClause.from_account_id = null
    whereClause.to_account_id = null

    try{
        const totalEarned = await Transaction.sum('amount', {
            where: whereClause
        })

        return res.status(200).json({
            totalIncome: totalEarned
        })
    } catch(err){
        console.error('Error fetching transactions:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch total income' });
    }

}