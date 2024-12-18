import React, { useState, useEffect } from "react";
import TransactionSingle from "./TransactionSingle";
import { protectedRoute } from "../../apiClient/axiosInstance";
import formatNumWithCommas from "../../utility/formatNumWithCommas";
import TransactionSingleTransfer from "./TransactionSingleTransfer";

const TransactionDaily = ({ date, day, netIncome: initialNetIncome }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [netIncome, setNetIncome] = useState(initialNetIncome); // Initialize state
  const [transactions, setTransactions] = useState([]);

  const formattedDate = new Date(date).getDate().toString().padStart(2, "0");
  console.log("params date 2", date);

  useEffect(() => {
    protectedRoute
      .get("/transactions/getTransactions", {
        params: {
          period: "day",
          year: new Date(date).getFullYear(),
          month: new Date(date).getMonth() + 1,
          day: day,
        },
      })
      .then((response) => {
        console.log("transactions for the this day", response.data);
        const { data } = response;
        setTransactions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const abbreviatedDay = new Date(date).toLocaleString("en-us", {
    weekday: "short",
  });

  const getNetIncomeClass = (value) => {
    if (value > 0) return "text-green-500"; 
    if (value < 0) return "text-red-500"; 
    return "text-gray-500"; 
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  function renderTransacSingle(transaction) {
    if (transaction.type !== "transfer") {
      return (
        <TransactionSingle
          key={transaction.id}
          category={transaction.category.name}
          account={transaction.account.name}
          description={transaction.note}
          amount={transaction.amount}
          transactionType={transaction.type}
          transactionId={transaction.id}
          onDelete={(id, amount) => {
            setTransactions((prevTransactions) =>
              prevTransactions.filter((transac) => transac.id !== id)
            );
            setNetIncome((prevNetIncome) => prevNetIncome - amount); // Update netIncome
          }}
        />
      );
    } else if (transaction.type === "transfer") {
      return (
        <TransactionSingleTransfer
          fromAccount={transaction.fromAccount.name}
          toAccount={transaction.toAccount.name}
          description={transaction.note}
          amount={transaction.amount}
        />
      );
    }
  }

  return (
    <div>
      <div className="daily-container flex justify-between items-center p-2 border-b border-b-gray-400 ">
        <div className="trans-left flex flex-col items-center">
          <h2 className="text-xl font-semibold">{formattedDate}</h2>
          <h2>{abbreviatedDay}</h2>
        </div>
        <div className="trans-right flex justify-center items-center ">
          <h2
            className={`net-income mr-4 font-medium text-lg ${getNetIncomeClass(
              netIncome
            )}`}
          >
            ₱{formatNumWithCommas(netIncome)}
          </h2>
          <button onClick={handleToggle}>
            <i
              className={`bi ${isOpen ? "bi bi-chevron-up" : "bi bi-chevron-down"}`}
            ></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="transaction-details border-b border-gray-400 max-h-64 overflow-y-auto">
          {transactions.length !== 0 ? (
            transactions.map((transaction, index) =>
              renderTransacSingle(transaction)
            )
          ) : (
            <p>No transactions for this day</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionDaily;
