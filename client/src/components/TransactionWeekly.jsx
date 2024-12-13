import React from "react";

const TransactionWeekly = ({ date, netIncome, totalIncome, totalExpense }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formatDate = (date) => {
    // Extracts the day and formats it with two digits
    const day = new Date(date).getDate().toString().padStart(2, "0");
    return day;
  };

  const getNetIncomeClass = (amount) => {
    if (amount > 0) return "text-green-500"; // Income (green)
    if (amount < 0) return "text-red-500"; // Expense (red)
    return "text-gray-500"; // Neutral (gray)
  };

  return (
    <div className="weeklystrans-container flex justify-between items-center py-4 border-b border-b-gray-400">
      <div className="date-range flex flex-row w-16 flex-shrink-0">
        <div className="date1 flex flex-col justify-center items-center">
          <h3 className="text-xs">{months[new Date(date.start).getMonth()]}</h3>
          <h3 className="text-lg">{formatDate(date.start)}</h3>
        </div>
        <h2 className="text-xl flex justify-center items-center mx-2"> - </h2>
        <div className="date2 flex flex-col justify-center items-center">
          <h3 className="text-xs">{months[new Date(date.end).getMonth()]}</h3>
          <h3 className="text-lg">{formatDate(date.end)}</h3>
        </div>
      </div>
      <div className="finances flex flex-row space-x-4">
        <div className="income flex flex-col items-center">
          <h3 className="text-xs text-gray-300 font-light">Income</h3>
          <h4 className={`text-sm ${getNetIncomeClass(totalIncome)}`}>
            ₱{totalIncome.toFixed(2)}
          </h4>
        </div>
        <div className="expense flex flex-col items-center">
          <h3 className="text-xs text-gray-300 font-light">Expense</h3>
          <h4 className={`text-sm ${getNetIncomeClass(totalExpense)}`}>
            ₱{totalExpense.toFixed(2)}
          </h4>
        </div>
        <div className="net flex flex-col items-center">
          <h3 className="text-xs text-gray-300 font-light">Net</h3>
          <h4 className={`text-sm font-medium ${getNetIncomeClass(netIncome)}`}>
            ₱{netIncome.toFixed(2)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TransactionWeekly;
