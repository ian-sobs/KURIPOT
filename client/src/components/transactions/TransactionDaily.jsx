import React, { useState, useEffect } from "react";
import TransactionSingle from "./TransactionSingle";
import { protectedRoute } from "../../apiClient/axiosInstance";
import formatNumWithCommas from "../../utility/formatNumWithCommas";
import TransactionSingleTransfer from "./TransactionSingleTransfer";

const TransactionDaily = ({ date, day, netIncome }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [net, setNet] = useState(0);
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

  // Format date to be always 2 digits

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

  function renderTransacSingle(transaction) {
    if (transaction.type != "transfer") {
      return (
        <TransactionSingle
          key={transaction.id}
          category={transaction.category.name}
          //name={"klsjaf"}
          account={transaction.account.name}
          description={transaction.note}
          amount={transaction.amount}
          transactionType={transaction.type}
          transactionId={transaction.id} // Pass transactionId for delete
          onDelete={(id) => {
            setTransactions((prevTransactions) =>
              prevTransactions.filter((transac) => transac.id !== id)
            );
          }}
        />
      );
    } else if (transaction.type == "transfer") {
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
              className={`bi ${
                isOpen ? "bi bi-chevron-up" : "bi bi-chevron-down"
              }`}
            ></i>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="transaction-details border-b border-gray-400 max-h-64 overflow-y-auto">
          {transactions.length !== 0 ? (
            transactions.map((transaction, index) =>
              //console.log("single transaction", transaction)
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
