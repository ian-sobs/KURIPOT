import React, { useState } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import TransactionDaily from "../components/TransactionDaily";
import TransactionWeekly from "../components/TransactionWeekly";
import TransactionMonthly from "../components/TransactionMonthly";

const TransactionsPage = () => {
  const [date, setDate] = useState({ month: 11, year: 2024 }); // December 2024 (0-indexed months)
  const [activeTab, setActiveTab] = useState(0); // state to manage active tab

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handlePrevMonth = () => {
    setDate((prev) => {
      const newMonth = prev.month - 1;
      const newYear = newMonth < 0 ? prev.year - 1 : prev.year;
      return {
        month: (newMonth + 12) % 12,
        year: newYear,
      };
    });
  };

  const handleNextMonth = () => {
    setDate((prev) => {
      const newMonth = prev.month + 1;
      const newYear = newMonth > 11 ? prev.year + 1 : prev.year;
      return {
        month: newMonth % 12,
        year: newYear,
      };
    });
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // Dummy data for transactions
  const transactionData = [
    {
      date: "09",
      day: "Mon",
      transactions: [
        {
          category: "Food",
          name: "Lunch",
          description: "Restaurant",
          amount: -150.75,
          transactionType: "expense", // Negative amount
        },
        {
          category: "Travel",
          name: "Bus fare",
          description: "Commute to work",
          amount: -20.0,
          transactionType: "expense", // Negative amount
        },
        {
          category: "Entertainment",
          name: "Movie",
          description: "Cinema ticket",
          amount: -250.0,
          transactionType: "expense", // Negative amount
        },
        {
          category: "Salary",
          name: "Freelance Work",
          description: "Freelance income",
          amount: 500.0,
          transactionType: "income", // Positive amount
        },
      ],
    },
    {
      date: "10",
      day: "Tue",
      transactions: [
        {
          category: "Food",
          name: "Coffee",
          description: "Cafe",
          amount: -50.0,
          transactionType: "expense", // Negative amount
        },
        {
          category: "Transport",
          name: "Taxi",
          description: "Ride share",
          amount: -25.2,
          transactionType: "expense", // Negative amount
        },
      ],
    },
  ];

  // Calculate netIncome for each day based on the sum of transaction amounts
  const transactionDataWithNetIncome = transactionData.map((data) => {
    const netIncome = data.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return { ...data, netIncome }; // Add the calculated netIncome to the data
  });

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] page-with-taskbar">
        <PageHeader
          title="Transactions"
          subtitle="View and Manage All Your Financial Activities"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead flex items-center justify-center flex-col">
          {/* month switch */}
          <div className="month-switch w-full flex justify-between items-center mb-4">
            <button onClick={handlePrevMonth}>
              <i className="bi bi-caret-left ml-6"></i>
            </button>
            <h2>{`${months[date.month]} ${date.year}`}</h2>
            <button onClick={handleNextMonth}>
              <i className="bi bi-caret-right mr-6"></i>
            </button>
          </div>
          <div className="tab-container">
            {/* tab switch */}
            <div
              role="tablist"
              className="tab-switch tabs tabs-bordered w-full tabs-lg flex justify-center items-center"
            >
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={`tab text-white ${
                  activeTab === 0 ? "tab-active" : ""
                }`}
                aria-label="DAILY"
                onClick={() => handleTabChange(0)}
                defaultChecked
              />
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={`tab text-white ${
                  activeTab === 1 ? "tab-active" : ""
                }`}
                aria-label="WEEKLY"
                onClick={() => handleTabChange(1)}
              />
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={`tab text-white ${
                  activeTab === 2 ? "tab-active" : ""
                }`}
                aria-label="MONTHLY"
                onClick={() => handleTabChange(2)}
              />
            </div>
            {/* content tab */}
            <div role="tabpanel" className="content-tab">
              {activeTab === 0 && (
                <div>
                  {transactionDataWithNetIncome.map((data, index) => (
                    <TransactionDaily
                      key={index}
                      date={data.date}
                      day={data.day}
                      netIncome={data.netIncome}
                      transactions={data.transactions}
                    />
                  ))}
                </div>
              )}
              {activeTab === 1 && (
                <div>
                  <TransactionWeekly />
                  <TransactionWeekly />
                  <TransactionWeekly />
                </div>
              )}
              {activeTab === 2 && (
                <div>
                  <TransactionMonthly />
                  <TransactionMonthly />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
