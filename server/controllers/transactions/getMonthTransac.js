const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')

exports.getMonthTransac = async (req, res) => {
    const { usrId } = req.user;
    let month = parseInt(req.query.month, 10)
    let year = parseInt(req.query.year, 10)
    let options = {order: [['date', 'DESC']]};
    let limit, page;

    // Validate month and year are provided
    if (!month || !year) {
        return res.status(400).json({ message: 'Month and year are required' });
    }

    if (isNaN(month) || isNaN(year)) {
        return res.status(400).json({ message: 'Invalid month or year format' });
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
            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.col('date'), 'MONTH'), { [Op.eq]: month}),  // Match the month using EXTRACT
            Sequelize.where(Sequelize.fn('EXTRACT', Sequelize.col('date'), 'YEAR'), { [Op.eq]: year })   // Match the year using EXTRACT
        ]
    };

    if(req.query.accountId && !isNaN(parseInt(req.query.accountId, 10))){
        whereClause.account_id = parseInt(req.query.accountId, 10)
    }

    if(req.query.categoryId && !isNaN(parseInt(req.query.categoryId, 10))){
        whereClause.category_id = parseInt(req.query.categoryId, 10)
    }

    if(req.query.type === "income"){
        whereClause.amount = {[Op.gt] : 0}
    }

    if(req.query.type === "expense"){
        whereClause.amount = {[Op.lt] : 0}
    }

    if(req.query.limit && req.query.page){
        limit = parseInt(req.query.limit, 10)
        page = parseInt(req.query.page, 10)

        if(!isNaN(limit) && !isNaN(page) && limit > 0 && page > 0){
            options.limit = limit
            options.offset = (page - 1) * limit
        }
    }

    options.where = whereClause;

    try {
        // return array of records in descending order of date
        const monthTransac = await Transaction.findAll(options);

        // Return the found transactions
        // if (!monthTransac.length) {
        //     return res.status(404).json({ message: 'No transactions found' });
        // }


        return res.status(200).json(monthTransac);
    } catch (err) {
        console.error('Error fetching transactions:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};
