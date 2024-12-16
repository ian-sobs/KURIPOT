const db = require('../../db/models/index')
const { QueryTypes } = require('sequelize');
const {sequelize} = db
const {Transaction} = sequelize.models

exports.getAggrMonthTransac = async (req, res) => {
    const usrId = parseInt(req.user.usrId, 10)
    const {year, month, accountId, categoryId } = req.query
    // let date = new Date(new Date(parseInt(year, 10), parseInt(month, 10)-1, 15).toISOString())
    const parsedYear = parseInt(year, 10)
    const parsedMonth = parseInt(month, 10)
    // let otherGroupBy = ''
    // let otherOn = ''
    let otherWhere = ''

    if(!isNaN(parseInt(accountId, 10))){
        // otherGroupBy +=  ', account_id'
        // otherOn += 'AND income.account_id=expense.account_id '
        otherWhere += ` AND account_id=${parseInt(accountId, 10)} `
    }

    if(!isNaN(parseInt(categoryId, 10))){
        // otherGroupBy +=  ', category_id'
        // otherOn += 'AND income.category_id=expense.category_id '
        otherWhere += ` AND category_id=${parseInt(categoryId, 10)} `
    }

    try {
            const aggregateMonthTransac = await sequelize.query(
                `
                SELECT *
                FROM (
                    SELECT  
                        income.user_id,
                        income.year,
                        income.month,
                        COALESCE(income.income, 0) AS income,
                        COALESCE(expense.expense, 0) AS expense
                    FROM (
                        SELECT  
                            user_id,
                            SUM(amount) AS income, 
                            EXTRACT(YEAR FROM date) AS year, 
                            EXTRACT(MONTH FROM date) AS month
                        FROM 
                            transactions 
                        WHERE 
                            amount > 0 AND 
                            type = 'income' AND
                            user_id = :usrId AND
                            EXTRACT(YEAR FROM date) = ${parsedYear} AND
                            EXTRACT(MONTH FROM date) = ${parsedMonth} 
                            ${otherWhere}
                        GROUP BY 
                            user_id, year, month
                    ) AS income
                    LEFT JOIN (
                        SELECT  
                            user_id,
                            SUM(amount) AS expense, 
                            EXTRACT(YEAR FROM date) AS year, 
                            EXTRACT(MONTH FROM date) AS month
                        FROM 
                            transactions 
                        WHERE 
                            amount < 0 AND 
                            type = 'expense' AND
                            user_id = :usrId AND
                            EXTRACT(YEAR FROM date) = ${parsedYear} AND
                            EXTRACT(MONTH FROM date) = ${parsedMonth} 
                            ${otherWhere}
                        GROUP BY 
                            user_id, year, month
                    ) AS expense
                    ON
                        income.year = expense.year AND
                        income.month = expense.month

                    UNION

                    SELECT  
                        expense.user_id,
                        expense.year,
                        expense.month,
                        COALESCE(income.income, 0) AS income,
                        COALESCE(expense.expense, 0) AS expense
                    FROM (
                        SELECT  
                            user_id,
                            SUM(amount) AS income, 
                            EXTRACT(YEAR FROM date) AS year, 
                            EXTRACT(MONTH FROM date) AS month
                        FROM 
                            transactions 
                        WHERE 
                            amount > 0 AND 
                            type = 'income' AND
                            user_id = :usrId AND
                            EXTRACT(YEAR FROM date) = ${parsedYear} AND
                            EXTRACT(MONTH FROM date) = ${parsedMonth} 
                            ${otherWhere}
                        GROUP BY 
                            user_id, year, month
                    ) AS income
                    RIGHT JOIN (
                        SELECT  
                            user_id,
                            SUM(amount) AS expense, 
                            EXTRACT(YEAR FROM date) AS year, 
                            EXTRACT(MONTH FROM date) AS month
                        FROM 
                            transactions 
                        WHERE 
                            amount < 0 AND 
                            type = 'expense' AND
                            user_id = :usrId AND
                            EXTRACT(YEAR FROM date) = ${parsedYear} AND
                            EXTRACT(MONTH FROM date) = ${parsedMonth} 
                            ${otherWhere}
                        GROUP BY 
                            user_id, year, month
                    ) AS expense
                    ON 
                        income.year = expense.year AND
                        income.month = expense.month
                ) AS combined
                ORDER BY year DESC, month DESC;
                `,
                {
                    replacements: { usrId: usrId },
                    type: QueryTypes.SELECT,
                    model:Transaction,
                    plain: false,
                }
            )
            return res.status(200).json(aggregateMonthTransac)
        
    } catch (err) {
        console.error('Error fetching aggregate transactions for the month:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch aggregate month transactions' });
    }
};
