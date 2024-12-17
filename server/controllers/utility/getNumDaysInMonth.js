exports.getDaysInMonth = function getDaysInMonth(year, month) {
    //month of date constructor is 0 based. passing a 1-based month parameter to getDaysInMonth
    //and setting day to 0 causes the date to roll over to the last day of the month we want
    //to find the number of days of
    return new Date(year, month, 0).getDate();
}