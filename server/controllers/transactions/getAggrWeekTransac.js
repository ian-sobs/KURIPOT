const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {getNumWeeksInMonth} = require('../utility/getNumWeeksInMonth')
const {getWeekDateRange} = require('../utility/getWeekDateRange')
const {Op} = require('sequelize')

exports.getAggrWeekTransac = async (req, res) => {
    let usrId = parseInt(req.user.usrId, 10)
    const {year, month, day} = req.query
    const numWeeks = getNumWeeksInMonth(year, month)
    let weekAggrRecs = []
    let startDate, endDate, dateRange
    let income, expense, net
    try {

        for(let x = numWeeks; x >= 1; --x){
         //   console.log('x', x)
            dateRange = getWeekDateRange(parseInt(year,10), parseInt(month, 10), x)
            startDate = dateRange.startDate
            endDate = dateRange.endDate

            income = await Transaction.sum('amount', {
                where: {
                    date: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    },
                    amount: {
                        [Op.gt]: 0
                    },
                    type: {
                        [Op.eq]: 'income'
                    }
                },
                logging: false
            })

            income = (!income) ? 0 : income

            expense = await Transaction.sum('amount', {
                where: {
                    date: {
                        [Op.gte]: startDate,
                        [Op.lt]: endDate
                    },
                    amount: {
                        [Op.lt]: 0
                    },
                    type: {
                        [Op.eq]: 'expense'
                    }
                },
                logging: false
            })
            expense = (!expense) ? 0 : expense

            net = parseFloat((parseFloat(income) + parseFloat(expense)).toFixed(2))
            weekAggrRecs.push({
                date:{
                    start: startDate,
                    end: endDate.setDate(endDate.getDate() - 1)
                },
                income: income,
                expense: expense,
                net: net
            })
        }

        return res.status(200).json(weekAggrRecs)
    } catch (err) {
       // console.error('Error fetching aggregate transaction for the period:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch aggregate transactions' });
    }
};
