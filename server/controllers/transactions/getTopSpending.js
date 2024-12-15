const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.getTopSpending = async (req, res) => {
    const {usrId} = req.user;
    let sortIn = req.query.sortIn;

    if (!sortIn) {
        sortIn = "DESC";
    }

    let whereClause = {};

    // Handle date filtering
    if (req.query.startDate && req.query.endDate) {
        whereClause.date = {
            [Op.between]: [
                new Date(req.query.startDate), // Start date
                new Date(req.query.endDate), // End date
            ],
        };
    }

    whereClause.user_id = usrId;
    whereClause.amount = {
        [Op.lt]: 0, // Expenses (negative amounts)
    };
    whereClause.type = 'expense'; // Assuming expenses are the focus

    try {
        const totalSpent = await Transaction.sum('amount', {
            where: whereClause,
        });

        const categorySpending = await Transaction.findAll({
            attributes: [
                'category_id',
                'categoryName', 
                [sequelize.fn('sum', sequelize.col('amount')), 'spent'], 
            ],
            where: whereClause,
            group: ['category_id', 'categoryName'],
            order: [sequelize.literal('spent ' + sortIn)],
            raw: true,
        });

        let catSpent = categorySpending.map((catDetails) => {
            return {
                categoryId: catDetails.category_id,
                categoryName: catDetails.categoryName,
                spent: parseFloat(catDetails.spent).toFixed(2),
                spentPercentage: ((parseFloat(catDetails.spent).toFixed(2) / totalSpent) * 100).toFixed(2),
            };
        });

        return res.status(200).json({
            totalSpent: totalSpent,
            categories: catSpent,
        });
    } catch (err) {
        console.error('Error fetching categories:', err);
        return res.status(500).json({ message: 'Failed to fetch top spending categories' });
    }
};