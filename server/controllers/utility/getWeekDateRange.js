exports.getWeekDateRange = function getWeekDateRange(year, month, weekNum) {
    // Create a Date object for the first day of the month
    const firstDayOfMonth = new Date(year, month - 1, 1);
    
    // Find the day of the week for the 1st of the month (0 = Sunday, 6 = Saturday)
    const firstDayWeekday = firstDayOfMonth.getDay();
    
    // Calculate the start date of the given week
    let startDate = new Date(firstDayOfMonth);
    startDate.setDate(1 - firstDayWeekday + (weekNum - 1) * 7);
    
    // Calculate the end date of the given week
    let endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7); // A week is 7 days
    
    startDate = new Date(startDate.toISOString())
    endDate = new Date(endDate.toISOString())
    
    return { startDate, endDate };
}