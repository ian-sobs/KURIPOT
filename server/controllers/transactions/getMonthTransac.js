const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')

exports.getMonthTransac = async (req, res) => {
    const { usrId } = req.user;
    let {month, year} = req.query; // Use Object.keys to get the query parameters
    
    // Validate month and year are provided
    if (!month || !year) {
        return res.status(400).json({ message: 'Month and year are required' });
    }

    if (month < 1 || month > 12) {
        return res.status(400).json({ message: 'Month must be between 1 and 12' });
    }

    if (year <= 0) {
        return res.status(400).json({ message: 'Year must be a positive number' });
    }

    let whereClause = {
        user_id: usrId,
        [Op.and]: [
            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.col('date'), 'MONTH'), { [Op.eq]: parseInt(month, 10) }),  // Match the month using EXTRACT
            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.col('date'), 'YEAR'), { [Op.eq]: parseInt(year, 10) })   // Match the year using EXTRACT
        ]
    };

    if(req.query.accountId){
        whereClause.account_id = parseInt(req.query.accountId, 10)
    }

    if(req.query.categoryId){
        whereClause.category_id = parseInt(req.query.categoryId, 10)
    }

    try {
        const monthTransac = await Transaction.findAll({
            where: whereClause
        });

        // Return the found transactions
        if (!monthTransac.length) {
            return res.status(404).json({ message: 'No transactions found' });
        }

        return res.status(200).json(monthTransac);
    } catch (err) {
        console.error('Error fetching transactions:', err.message); // Log the error
        return res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};
