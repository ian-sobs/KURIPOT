const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')
const {retTransac} = require('./helper/retTransac')

exports.getMonthTransac = async (req, res) => {
    const { usrId } = req.user;
    let day = parseInt(req.query.day, 10)
    let month = parseInt(req.query.month, 10)
    let year = parseInt(req.query.year, 10)
    let options = {order: [['date', 'DESC']]};
    let limit, page;

    // Validate month and year are provided
    if (!month || !year || !day) {
        return res.status(400).json({ message: 'Month and year are required' });
    }

    if (isNaN(month) || isNaN(year) || isNaN(day)) {
        return res.status(400).json({ message: 'Invalid month or year format' });
    }

    if (month < 1 || month > 12) {
        return res.status(400).json({ message: 'Month must be between 1 and 12' });
    }

    if (year <= 0) {
        return res.status(400).json({ message: 'Year must be a positive number' });
    }

    const date = new Date(year, month - 1, day); // JavaScript months are 0-based
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        return res.status(400).json({ error: "Invalid day for the given month and year." });
    }

    let whereClause = {
        user_id: usrId,
        [Op.and]: [
            Sequelize.where(
                Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM'), Sequelize.col('date')),
                { [Op.eq]: month }
            ),
            Sequelize.where(
                Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM'), Sequelize.col('date')),
                { [Op.eq]: year }
            ),
            Sequelize.where(
                Sequelize.fn('EXTRACT', Sequelize.literal('DAY FROM'), Sequelize.col('date')),
                { [Op.eq]: day }
            )
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
        whereClause.from_account_id = {[Op.eq] : null}
        whereClause.to_account_id = {[Op.eq] : null}
    }

    if(req.query.type === "expense"){
        whereClause.amount = {[Op.lt] : 0}
        whereClause.from_account_id = {[Op.eq] : null}
        whereClause.to_account_id = {[Op.eq] : null}
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
        let dayTransac = await Transaction.findAll(options);
        const retDayTransac = dayTransac.map(retTransac)

        return res.status(200).json(retDayTransac);
    } catch (err) {
        console.error('Error fetching transactions:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};
