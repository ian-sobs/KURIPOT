import React from "react";
import formatNumWithCommas from "../../utility/formatNumWithCommas";
import { protectedRoute } from "../../apiClient/axiosInstance";

const TransactionSingle = ({
  category,
  // name,
  account,
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

  const handleDelete = () => {
    protectedRoute
      .delete("/transactions/deleteTransaction", { data: { id: transactionId } }) // Use transactionId
      .then(() => {
        onDelete(transactionId); // Notify the parent component
      })
      .catch((error) => {
        console.error("Failed to delete transaction", error);
      });
  };

  return (
    <div className="singletrans-container flex justify-between items-center p-2 pl-8">
      <div className="singletrans-left flex flex-row">
        <div className="category-container flex items-center justify-center flex-col w-0">
          <i className="bi bi-car-front-fill"></i>
          {/* <h3 className="text-xs truncate">{fs}</h3> */}
        </div>
        <div className="singletrans-text text-sm flex flex-col ml-8">
          <h3 className="font-medium">{description}</h3>
          <h3 className="from-account text-xs text-gray-300 font-extralight">
            Account: {account}
          </h3>
          <h3 className="from-account text-xs text-gray-300 font-extralight">
            Category: {category}
          </h3>
          {/* <h3 className="text-gray-300 sm:max-w-48 mr-4">{description}</h3> */}
        </div>
      </div>

      <div className={`singletrans-right ${getAmountClass()}`}>₱{formatNumWithCommas(amount)}</div>
    </div>
  );
};

export default TransactionSingle;
