const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')
const {retTransac} = require('./helper/retTransac')
const {valQueryParamDate} = require('../utility/valQueryParamDate')

exports.getAggrTransac = async (req, res) => {
    const {sortIn, sortBy, period } = req.query;
    let usrId = parseInt(req.user.usrId, 10)

    let options = {};

    if(sortIn && sortBy){
        options.order = [[sortBy, sortIn]]
    }
    else{
        options.order = [['date', 'ASC']]
    }

    // let limit, page;

    let whereClause = valQueryParamDate(req.query, res, 'date')
    whereClause.user_id = usrId

    if(req.query.accountId && !isNaN(parseInt(req.query.accountId, 10))){
        whereClause.account_id = parseInt(req.query.accountId, 10)
    }

    if(req.query.categoryId && !isNaN(parseInt(req.query.categoryId, 10))){
        whereClause.category_id = parseInt(req.query.categoryId, 10)
    }

    // if(['income', 'expense', 'transfer'].includes(req.query.type)){
    //     whereClause.type = req.query.type
    //     if(req.query.type === 'income'){
    //         whereClause.amount = {[Op.gt] : 0}
    //         // whereClause.from_account_id = {[Op.eq] : null}
    //         // whereClause.to_account_id = {[Op.eq] : null}
            
    //     }
    //     else if(req.query.type === 'expense'){
    //         whereClause.amount = {[Op.lt] : 0}
    //         // whereClause.from_account_id = {[Op.eq] : null}
    //         // whereClause.to_account_id = {[Op.eq] : null}
    //     }
    // }


    // if(req.query.limit && req.query.page){
    //     limit = parseInt(req.query.limit, 10)
    //     page = parseInt(req.query.page, 10)

    //     if(!isNaN(limit) && !isNaN(page) && limit > 0 && page > 0){
    //         options.limit = limit
    //         options.offset = (page - 1) * limit
    //     }
    // }

    options.where = whereClause;

    try {
        // return array of records in descending order of date
        // let transac = await Transaction.findAll(options);
        // const retTransacArr = transac.map(retTransac)
        const aggrTransac = await Transaction.findAll({
            attributes: [
                // Income sum
                [
                    sequelize.literal(`
                        SUM(CASE 
                            WHEN type = 'income' THEN amount 
                            ELSE 0 
                        END)
                    `),
                    'income',
                ],
                // Expense sum
                [
                    sequelize.literal(`
                        SUM(CASE 
                            WHEN type = 'expense' THEN amount 
                            ELSE 0 
                        END)
                    `),
                    'expense',
                ],
            ],
            ...options,
            raw: true, // Return raw JSON data
        });
        
        const {income, expense} = aggrTransac
        let startDate, endDate
        let {date} = options.where

        if(period == 'range'){
            startDate = date[Op.between][0]
            endDate = date[Op.between][1]
        }
        else if(['year', 'month', 'day', 'week'].includes(period)){
            startDate = date.gte
            endDate = date.lt
        }

        return res.status(200).json({
            income: parseFloat(income).toFixed(2),
            expense: parseFloat(expense).toFixed(2),
            startDate: startDate,
            endDate: endDate,
            period: period
        });
    } catch (err) {
        console.error('Error fetching transactions:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch transactions' });
    }
};
