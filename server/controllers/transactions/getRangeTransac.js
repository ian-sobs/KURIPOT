const db = require('../../models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')

exports.getrangeTransac = async (req, res) => {
    const { usrId } = req.user;
    let {startDate, endDate} = req.query
    let options = {order: [['date', 'DESC']]};
    let limit, page;

    // Validate month and year are provided
    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'start and end dates are required' });
    }

    // Parse the dates to ensure they are in the correct format
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        return res.status(400).json({ message: 'Invalid date format' });
    }

    if (parsedStartDate > parsedEndDate) {
        return res.status(400).json({ message: 'Start date cannot be later than end date' });
    }

    // Build where clause to filter by the date range
    let whereClause = {
        user_id: usrId,
        date: {
            [Op.between]: [parsedStartDate.toISOString(), parsedEndDate.toISOString()] // Use ISO format, ensuring correct time zone handling
        }
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
        const rangeTransac = await Transaction.findAll(options);

        return res.status(200).json(rangeTransac);
    } catch (err) {
        console.error('Error fetching transactions:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};
