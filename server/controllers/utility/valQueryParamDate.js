const {Op, Sequelize, where} = require('sequelize')

// Function to get the number of days in a month
function getDaysInMonth(year, month) {
    // Month is 0-indexed in JavaScript (0 = January, 1 = February, ...)
    const date = new Date(year, month + 1, 0);
    return date.getDate();
}


// this function returns an object for the where property of the options object of the 
// Models.method(options)

// use this function when to select records from a table whose date matches the given date in the query parameters

exports.valQueryParamDate = function valQueryParamDate(reqQuery, res, dateCol){
    //dateCol is a string of the name of the date column in a table
    let {period, day, month, year, weekNum, startDate, endDate} = reqQuery
    let whereClause = {}

    if(period === 'range'){
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

        whereClause[dateCol] = {};
        whereClause[dateCol][Op.between] = [parsedStartDate.toISOString(), parsedEndDate.toISOString()]
    }
    else{
        year = parseInt(year, 10)

        if(year < 0){
            return res.status(400).json({message: 'year > 0 is required'})
        }

        whereClause[Op.and] = [
            Sequelize.where(
                Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM'), Sequelize.col(dateCol)),
                { [Op.eq]: year }
            ),
        ]

        if(period === 'month' || period === 'week' || period === 'day'){
            month = parseInt(month, 10);

            if(month < 1 && month > 12){
                return res.status(400).json({message: 'month must be a number from 1 to 12'})
            }

            whereClause[Op.and].push(
                Sequelize.where(
                    Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM'), Sequelize.col(dateCol)),
                    { [Op.eq]: month }
                )
            );

            if(period === 'day'){
                day = parseInt(day, 10)
                let checkDate = new Date(year, month - 1, day)

                if (
                    checkDate.getFullYear() !== year ||
                    checkDate.getMonth() !== month - 1 ||
                    checkDate.getDate() !== day
                ) {
                    return res.status(400).json({ error: "Invalid day for the given month and year." });
                }

                whereClause[Op.and].push(
                    Sequelize.where(
                        Sequelize.fn('EXTRACT', Sequelize.literal('DAY FROM'), Sequelize.col(dateCol)),
                        { [Op.eq]: day }
                    )
                );
            }
            else{
                // if period is set to 'week', date handling logic for week goes here
                weekNum = parsedInt(weekNum, 10)

                // Get the number of days in the given month
                const daysInMonth = getDaysInMonth(year, month);

                // Calculate the maximum number of weeks (taking into account the number of days)
                const maxWeeks = Math.ceil(daysInMonth / 7);

                // Validate if the weekNum is valid for the given month
                if (isNaN(weekNum) || weekNum < 1 || weekNum > maxWeeks) {
                    return res.status(400).json({message: 'invalid week number provided'})
                }

                whereClause[Op.and].push(
                    Sequelize.where(
                        Sequelize.fn('EXTRACT', Sequelize.literal('ISODOW'), Sequelize.col(dateCol)),
                        { [Op.between]: [weekNum * 7 - 6, weekNum * 7] }
                    )
                )
            }
        }
    }

    return whereClause
}