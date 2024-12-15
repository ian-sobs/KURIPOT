const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {Op, Sequelize, where} = require('sequelize')
const {retTransac} = require('./helper/retTransac')
const {valQueryParamDate} = require('../utility/valQueryParamDate')
const {getWeekDateRange} = require('../utility/getWeekDateRange')
const { raw } = require('express')

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
        const income = await Transaction.sum('amount', {
            where: {
                ...whereClause,
                amount: {
                    [Op.gt]: 0
                },
                type: {
                    [Op.eq]: 'income'
                }
            }
        })

        const expense = await Transaction.sum('amount', {
            where: {
                ...whereClause,
                amount: {
                    [Op.lt]: 0
                },
                type: {
                    [Op.eq]: 'expense'
                }
            }
        })

        const net = income + expense

        let retDate = {}

        if(period == 'week'){
            const {year, month, weekNum} = req.query
            const {startDate, endDate} = getWeekDateRange(year, month, weekNum)
            retDate.startDate = startDate
            retDate.endDate = endDate
        }

        return res.status(200).json({
            ...retDate,
            income: (!income) ? 0 : parseFloat(parseFloat(income).toFixed(2)),
            expense: (!expense) ? 0 : parseFloat(parseFloat(expense).toFixed(2)),
            net: parseFloat(parseFloat(net).toFixed(2))
        })

    } catch (err) {
        console.error('Error fetching aggregate transaction for the period:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch aggregate transactions' });
    }
};
