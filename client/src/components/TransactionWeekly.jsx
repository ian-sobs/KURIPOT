import React from "react";

const TransactionWeekly = ({ date, day, netIncome, transactions }) => {
  return (
    <div className="weeklystrans-container flex justify-between items-center py-2 border-b  border-b-gray-400">
      <div className="date-range flex flex-row w-16 flex-shrink-0">
        <div className="date1 flex flex-col justify-center items-center">
          <h3 className="text-xs">DEC</h3>
          <h3 className="text-lg">01</h3>
        </div>
        <h2 className="text-xl flex justify-center items-center mx-2"> - </h2>
        <div className="date2 flex flex-col justify-center items-center">
          <h3 className="text-xs">DEC</h3>
          <h3 className="text-lg">07</h3>
        </div>
      </div>
      <div className="finances flex flex-row space-x-4">
        <div className="income flex flex-col items-center">
          <h3 className="text-xs text-gray-300 font-light">income</h3>
          <h4>₱400.00</h4>
        </div>
        <div className="expense flex flex-col items-center">
          <h3 className="text-xs text-gray-300 font-light">expense</h3>
          <h4>₱250.00</h4>
        </div>
        <div className="net flex flex-col items-center">
          <h3 className="text-xs text-gray-300 font-light">net</h3>
          <h4>₱150.00</h4>
        </div>
      </div>
    </div>
  );
};

export default TransactionWeekly;
