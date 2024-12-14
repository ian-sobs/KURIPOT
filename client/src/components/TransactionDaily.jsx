import React, { useState } from "react";
import TransactionSingle from "./TransactionSingle";

const TransactionDaily = ({ date, day, netIncome, transactions }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Format date to be always 2 digits
  const formattedDate = new Date(date).getDate().toString().padStart(2, "0");

  // Get the abbreviated day (e.g., Sun for Sunday)
  const abbreviatedDay = new Date(date).toLocaleString("en-us", {
    weekday: "short",
  });

  // Function to determine text color for netIncome
  const getNetIncomeClass = (value) => {
    if (value > 0) return "text-green-500"; // Green for positive
    if (value < 0) return "text-red-500"; // Red for negative
    return "text-gray-500"; // Gray for zero
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="daily-container flex justify-between items-center py-2 border-b border-b-gray-400">
        <div className="trans-left flex flex-col items-center">
          <h2 className="text-xl font-semibold">{formattedDate}</h2>
          <h2>{abbreviatedDay}</h2>
        </div>
        <div className="trans-right flex justify-center items-center">
          <h2
            className={`net-income mr-4 font-medium text-lg ${getNetIncomeClass(
              netIncome
            )}`}
          >
            ₱{netIncome}
          </h2>
          <button onClick={handleToggle}>
            <i
              className={`bi ${
                isOpen ? "bi bi-chevron-up" : "bi bi-chevron-down"
              }`}
            ></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="transaction-details border-b border-gray-400">
          {transactions.map((transaction, index) => (
            <TransactionSingle
              key={index}
              category={transaction.category}
              name={transaction.name}
              description={transaction.description}
              amount={transaction.amount}
              transactionType={transaction.transactionType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionDaily;
