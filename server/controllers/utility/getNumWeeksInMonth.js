exports.getNumWeeksInMonth = function getNumWeeksInMonth(year, month) {
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const firstDayWeekday = firstDayOfMonth.getDay(); // Day of the week (0 = Sunday)
  
    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month, 0); // Automatically gets the last day
    const lastDay = lastDayOfMonth.getDate(); // Number of days in the month
    const lastDayWeekday = lastDayOfMonth.getDay();
  
    // Calculate the total number of days spanned by weeks
    const totalDays = lastDay + firstDayWeekday + 6 - lastDayWeekday; // Offset for the first week
  
    // Calculate the number of weeks, rounding up for partial weeks
    const numWeeks = Math.ceil(totalDays / 7);
  
    return numWeeks;
}