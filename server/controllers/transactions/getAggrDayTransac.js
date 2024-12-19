const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction} = sequelize.models
const {QueryTypes} = require('sequelize')

exports.getAggrDayTransac = async (req, res) => {
    let usrId = parseInt(req.user.usrId, 10)
    const {year, month, accountId, categoryId} = req.query

    const parsedYear = parseInt(year, 10)
    const parsedMonth = parseInt(month, 10)

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
            const aggregateDayTransac = await sequelize.query(
                `
                SELECT *
                FROM (
                    SELECT  
                        income.user_id,
                        income.year,
                        income.month,
                        income.day,
                        COALESCE(income.income, 0) AS income,
                        COALESCE(expense.expense, 0) AS expense,
                        COALESCE(income.income, 0) + COALESCE(expense.expense, 0) AS net
                    FROM (
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
                            user_id = :usrId AND
                            EXTRACT(YEAR FROM date) = :parsedYear AND
                            EXTRACT(MONTH FROM date) = :parsedMonth
                            ${otherWhere}
                        GROUP BY 
                            user_id, year, month, day
                    ) AS income
                    LEFT JOIN (
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
                            user_id = :usrId AND
                            EXTRACT(YEAR FROM date) = :parsedYear AND
                            EXTRACT(MONTH FROM date) = :parsedMonth
                            ${otherWhere}
                        GROUP BY 
                            user_id, year, month, day
                    ) AS expense
                    ON
                        income.year = expense.year AND
                        income.month = expense.month AND
                        income.day = expense.day

                    UNION

                    SELECT  
                        expense.user_id,
                        expense.year,
                        expense.month,
                        expense.day,
                        COALESCE(income.income, 0) AS income,
                        COALESCE(expense.expense, 0) AS expense,
                        COALESCE(income.income, 0) + COALESCE(expense.expense, 0) AS net
                    FROM (
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
                            user_id = :usrId AND
                            EXTRACT(YEAR FROM date) = :parsedYear AND
                            EXTRACT(MONTH FROM date) = :parsedMonth
                            ${otherWhere}
                        GROUP BY 
                            user_id, year, month, day
                    ) AS income
                    RIGHT JOIN (
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
                            user_id = :usrId AND
                            EXTRACT(YEAR FROM date) = :parsedYear AND
                            EXTRACT(MONTH FROM date) = :parsedMonth
                            ${otherWhere}
                        GROUP BY 
                            user_id, year, month, day
                    ) AS expense
                    ON 
                        income.year = expense.year AND
                        income.month = expense.month AND
                        income.day = expense.day
                ) AS combined
                ORDER BY year DESC, month DESC, day DESC;
                `,
                {
                    replacements: { 
                        usrId: usrId, 
                        parsedYear: parsedYear, 
                        parsedMonth: parsedMonth 
                    },
                    type: QueryTypes.SELECT,
                    model:Transaction,
                    plain: false,
                    raw: true
                }
            )

        const daysToIgnoreArr = aggregateDayTransac.map((daySummary) => {
            return daySummary.day
        })

        console.log("aggregateDayTransac", aggregateDayTransac)
        console.log("daysToIgnoreArr", daysToIgnoreArr)

        const additionalTransfersQuery = await sequelize.query(
            `
            SELECT 
                t.user_id,
                EXTRACT(YEAR FROM t.date) AS year,
                EXTRACT(MONTH FROM t.date) AS month,
                EXTRACT(DAY FROM t.date) AS day,
                0 AS income,
                0 AS expense,
                0 AS net
            FROM 
                transactions t
            WHERE 
                t.type = 'transfer' AND 
                t.user_id = :usrId AND
                EXTRACT(YEAR FROM t.date) = :parsedYear AND
                EXTRACT(MONTH FROM t.date) = :parsedMonth 
                ${daysToIgnoreArr.length !== 0 ? ' AND EXTRACT(DAY FROM t.date) NOT IN (:daysToIgnoreArr)' : ''}
            GROUP BY 
                t.user_id, year, month, day
            ORDER BY 
                year DESC, month DESC, day DESC;
            `,
            {
                replacements: {
                    usrId: usrId,
                    parsedYear: parsedYear,
                    parsedMonth: parsedMonth,
                    daysToIgnoreArr: daysToIgnoreArr
                },
                type: QueryTypes.SELECT,
                raw: true
            }
        );
        
        console.log("additionalTransfersQuery", additionalTransfersQuery);

        const combinedResults = [...aggregateDayTransac, ...additionalTransfersQuery];

        // Sort the combined array by year, month, and day in descending order
        combinedResults.sort((a, b) => {
            if (b.year !== a.year) {
                return b.year - a.year; // Compare by year
            } else if (b.month !== a.month) {
                return b.month - a.month; // Compare by month
            } else {
                return b.day - a.day; // Compare by day
            }
        });

        console.log("combinedResults", combinedResults);
        

        return res.status(200).json(combinedResults)

    } catch (err) {
        console.error('Error fetching aggregate transaction for the period:', err); // Log the error
        return res.status(500).json({ message: 'Failed to fetch aggregate transactions' });
    }
};
