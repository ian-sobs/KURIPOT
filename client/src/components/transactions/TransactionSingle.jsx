import React from "react";

const TransactionSingle = ({
  category,
  name,
  description,
  amount,
  transactionType,
}) => {
  // Determine color based on income or expense type
  const getAmountClass = () => {
    if (transactionType === "income") {
      return "text-green-500"; // Green for income
    } else if (transactionType === "expense") {
      return "text-red-500"; // Red for expense
    } else {
      return "text-gray-500"; // Gray for zero
    }
  };

  return (
    <div className="singletrans-container flex justify-between items-center p-2 pl-8">
      <div className="singletrans-left flex flex-row">
        <div className="category-container flex items-center justify-center flex-col w-0">
          <i className="bi bi-car-front-fill"></i>
          <h3 className="text-xs truncate">{category}</h3>
        </div>
        <div className="singletrans-text text-sm flex flex-col ml-8">
          <h3 className="font-medium">{name}</h3>
          <h3 className="from-account text-xs text-gray-300 font-extralight">
            from: Account
          </h3>
          <h3 className="text-gray-300 sm:max-w-48 mr-4">{description}</h3>
        </div>
      </div>

      <div className={`singletrans-right ${getAmountClass()}`}>₱{amount}</div>
    </div>
  );
};

export default TransactionSingle;
