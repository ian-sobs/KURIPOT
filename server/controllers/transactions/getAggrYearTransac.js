const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction} = sequelize.models

exports.getAggrYearTransac = async (req, res) => {
    let usrId = parseInt(req.user.usrId, 10)
    const {year, month, day} = req.query
    try {
        const aggregateYearTransac = await sequelize.query(
            `
            SELECT 
                daily_income.user_id AS user_id,
                daily_income.income AS income, 
                daily_expense.expense AS expense,
                (daily_income.income + daily_expense.expense) AS net,
                daily_income.year AS year,
                daily_income.month AS month,
                daily_income.day AS day
            FROM 
                (
                    SELECT  
                        user_id,
                        SUM(amount) AS income, 
                        EXTRACT(YEAR FROM date) AS year, 
                        EXTRACT(MONTH FROM date) AS month,
                        EXTRACT(DAY FROM date) AS day
                    FROM 
                        transactions 
                    WHERE 
                        amount > 0 AND 
                        type = 'income' AND
                        user_id = :usrId
                    GROUP BY 
                        user_id,
                        year, 
                        month, 
                        day
                ) AS daily_income
            INNER JOIN
                (
                    SELECT  
                        user_id,
                        SUM(amount) AS expense, 
                        EXTRACT(YEAR FROM date) AS year, 
                        EXTRACT(MONTH FROM date) AS month,
                        EXTRACT(DAY FROM date) AS day
                    FROM 
                        transactions 
                    WHERE 
                        amount < 0 AND 
                        type = 'expense' AND
                        user_id = :usrId
                    GROUP BY 
                        user_id,
                        year, 
                        month, 
                        day
                ) AS daily_expense
            ON 
                daily_income.user_id = daily_expense.user_id AND
                daily_income.year = daily_expense.year AND
                daily_income.month = daily_expense.month AND
                daily_income.day = daily_expense.day
            ORDER BY
                daily_income.year DESC, daily_income.month DESC, daily_income.day DESC;
            `,
            {
                replacements: { usrId: usrId },
                type: QueryTypes.SELECT,
                model:Transaction,
                plain: false,
            }
        )

        return res.status(200).json(aggregateYearTransac)

        // let retDate = {}

        // if(period == 'week'){
        //     const {year, month, weekNum} = req.query
        //     const {startDate, endDate} = getWeekDateRange(year, month, weekNum)
        //     retDate.startDate = startDate
        //     retDate.endDate = endDate
        // }

        // return res.status(200).json({
        //     ...retDate,
        //     income: (!income) ? 0 : parseFloat(parseFloat(income).toFixed(2)),
        //     expense: (!expense) ? 0 : parseFloat(parseFloat(expense).toFixed(2)),
        //     net: parseFloat(parseFloat(net).toFixed(2))
        // })

    } catch (err) {
        console.error('Error fetching aggregate transaction for the period:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch aggregate transactions' });
    }
};
