const {Op, Sequelize, where} = require('sequelize')

function getWeekDateRange(year, month, weekNum) {
    // Create a Date object for the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    
    // Find the day of the week for the 1st of the month (0 = Sunday, 6 = Saturday)
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    // Calculate the start date of the given week
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(1 - firstDayWeekday + (weekNum - 1) * 7);
    
    // Calculate the end date of the given week
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7); // A week is 7 days
    
    return { startDate, endDate };
  }


exports.valQueryParamDate = function valQueryParamDate(reqQuery, res, dateCol){
    //dateCol is a string of the name of the date column in a table
    let {period, day, month, year, weekNum, startDate, endDate} = reqQuery

    month = parseInt(month, 10)
    day = parseInt(day, 10)
    year = parseInt(year, 10)
    weekNum = parseInt(weekNum, 10)

    let whereClause = {}
    let opAndConditions = []

    let parsedStartDate
    let parsedEndDate

    if(period === 'range'){
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'start and end dates are required' });
        }

        // Parse the dates to ensure they are in the correct format
        parsedStartDate = new Date(startDate);
        parsedEndDate = new Date(endDate);

        if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        if (parsedStartDate > parsedEndDate) {
            return res.status(400).json({ message: 'Start date cannot be later than end date' });
        }
        console.log("dateCol ", dateCol)

        parsedStartDate = new Date(parsedStartDate.toISOString())
        parsedEndDate = new Date(parsedEndDate.toISOString())

        whereClause[dateCol] = {
            [Op.between]: [parsedStartDate, parsedEndDate]
        }
    }
    else if(period === 'year'){
        parsedStartDate = new Date(year, 0, 1, 0, 0, 0, 0);
        parsedEndDate = new Date(year + 1, 1, 0, 0, 0, 0, 0);

        parsedStartDate = new Date(parsedStartDate.toISOString())
        parsedEndDate = new Date(parsedEndDate.toISOString())

        whereClause[dateCol] = {
            [Op.gte]: parsedStartDate,
            [Op.lt]: parsedEndDate
        }
    }
    else if(period === 'month'){
        parsedStartDate = new Date(year, (month - 1) % 12 , 1, 0, 0, 0, 0);

        if(month == 12){
            year = year + 1
        }

        parsedEndDate = new Date(year, month % 12, 1, 0, 0, 0, 0);

        parsedStartDate = new Date(parsedStartDate.toISOString())
        parsedEndDate = new Date(parsedEndDate.toISOString())

        whereClause[dateCol] = {
            [Op.gte]: parsedStartDate,
            [Op.lt]: parsedEndDate
        }
    }
    else if(period === 'day'){
        let date = new Date(year, month - 1, day);
        let nextDate = new Date(date);
        nextDate.setDate(date.getDate() + 1); // Move to the next day

        // Validate the input date
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return res.status(400).json({ message: 'Invalid date provided' });
        }

        // Define the start and end of the day
        parsedStartDate = new Date(year, month - 1, day, 0, 0, 0, 0); // Start of the day
        parsedEndDate = nextDate.getFullYear() === year && nextDate.getMonth() === month - 1
            ? new Date(year, month - 1, day + 1, 0, 0, 0, 0) // Next day at midnight
            : nextDate; // Handles month/year rollover automatically

        parsedStartDate = new Date(parsedStartDate.toISOString())
        parsedEndDate = new Date(parsedEndDate.toISOString())

        whereClause[dateCol] = {
            [Op.gte]: parsedStartDate,
            [Op.lt]: parsedEndDate,
        };
    }
    else if(period === 'week'){
        let {startDate, endDate} = getWeekDateRange(year, month, weekNum)

        parsedStartDate = new Date(startDate.toISOString())
        parsedEndDate = new Date(endDate.toISOString())

        whereClause[dateCol] = {
            [Op.gte]: parsedStartDate,
            [Op.lt]: parsedEndDate
        }
    }
    // else{
    //     year = parseInt(year, 10)

    //     if(year < 0){
    //         return res.status(400).json({message: 'year > 0 is required'})
    //     }

    //     opAndConditions.push(
    //         Sequelize.where(
    //             Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM'), Sequelize.col(dateCol)),
    //             { [Op.eq]: year }
    //         )
    //     );
    //     // whereClause[Op.and] = [
    //     //     Sequelize.where(
    //     //         Sequelize.fn('EXTRACT', Sequelize.literal('YEAR FROM'), Sequelize.col(dateCol)),
    //     //         { [Op.eq]: year }
    //     //     ),
    //     // ]

    //     if(period === 'month' || period === 'week' || period === 'day'){
    //         month = parseInt(month, 10);

    //         if(month < 1 && month > 12){
    //             return res.status(400).json({message: 'month must be a number from 1 to 12'})
    //         }

    //         opAndConditions.push(
    //             Sequelize.where(
    //                 Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM'), Sequelize.col(dateCol)),
    //                 { [Op.eq]: month }
    //             )
    //         );

    //         // whereClause[Op.and].push(
    //         //     Sequelize.where(
    //         //         Sequelize.fn('EXTRACT', Sequelize.literal('MONTH FROM'), Sequelize.col(dateCol)),
    //         //         { [Op.eq]: month }
    //         //     )
    //         // );

    //         if(period === 'day'){
    //             day = parseInt(day, 10)
    //             let checkDate = new Date(year, month - 1, day)

    //             if (
    //                 checkDate.getFullYear() !== year ||
    //                 checkDate.getMonth() !== month - 1 ||
    //                 checkDate.getDate() !== day
    //             ) {
    //                 return res.status(400).json({ error: "Invalid day for the given month and year." });
    //             }

    //             opAndConditions.push(
    //                 Sequelize.where(
    //                     Sequelize.fn('EXTRACT', Sequelize.literal('DAY FROM'), Sequelize.col(dateCol)),
    //                     { [Op.eq]: day }
    //                 )
    //             )
    //             // whereClause[Op.and].push(
    //             //     Sequelize.where(
    //             //         Sequelize.fn('EXTRACT', Sequelize.literal('DAY FROM'), Sequelize.col(dateCol)),
    //             //         { [Op.eq]: day }
    //             //     )
    //             // );
    //         }
    //         else{
    //             // if period is set to 'week', date handling logic for week goes here
    //             weekNum = parseInt(weekNum, 10)

    //             // Get the number of days in the given month
    //             const daysInMonth = getDaysInMonth(year, month);

    //             // Calculate the maximum number of weeks (taking into account the number of days)
    //             const maxWeeks = Math.ceil(daysInMonth / 7);

    //             // Validate if the weekNum is valid for the given month
    //             if (isNaN(weekNum) || weekNum < 1 || weekNum > maxWeeks) {
    //                 return res.status(400).json({message: 'invalid week number provided'})
    //             }

    //             opAndConditions.push(
    //                 Sequelize.where(
    //                     Sequelize.fn('EXTRACT', Sequelize.literal('ISODOW'), Sequelize.col(dateCol)),
    //                     { [Op.between]: [weekNum * 7 - 6, weekNum * 7] }
    //                 )
    //             )

    //             // whereClause[Op.and].push(
    //             //     Sequelize.where(
    //             //         Sequelize.fn('EXTRACT', Sequelize.literal('ISODOW'), Sequelize.col(dateCol)),
    //             //         { [Op.between]: [weekNum * 7 - 6, weekNum * 7] }
    //             //     )
    //             // )
    //         }
    //     }
    //     whereClause[Op.and] = opAndConditions
    // }

    // whereClause[dateCol] = {
    //     [Op.between]: [parsedStartDate.toISOString(), parsedEndDate.toISOString()]
    // }

    return whereClause
}
