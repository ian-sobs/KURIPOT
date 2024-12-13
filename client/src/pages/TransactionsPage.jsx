// Expanded Dummy Data for Transactions Page
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

  // Expanded Dummy Data for transactions (Daily)
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
          transactionType: "expense",
        },
        {
          category: "Travel",
          name: "Bus fare",
          description: "Commute to work",
          amount: -20.0,
          transactionType: "expense",
        },
        {
          category: "Entertainment",
          name: "Movie",
          description: "Cinema ticket",
          amount: -250.0,
          transactionType: "expense",
        },
        {
          category: "Salary",
          name: "Freelance Work",
          description: "Freelance income",
          amount: 500.0,
          transactionType: "income",
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
          description: "Morning coffee",
          amount: -50.0,
          transactionType: "expense",
        },
        {
          category: "Health",
          name: "Gym Membership",
          description: "Monthly subscription",
          amount: -1200.0,
          transactionType: "expense",
        },
        {
          category: "Salary",
          name: "Project Bonus",
          description: "Completion bonus",
          amount: 1000.0,
          transactionType: "income",
        },
      ],
    },
    {
      date: "11",
      day: "Wed",
      transactions: [
        {
          category: "Shopping",
          name: "Clothes",
          description: "Online purchase",
          amount: -800.0,
          transactionType: "expense",
        },
        {
          category: "Miscellaneous",
          name: "Donation",
          description: "Charity",
          amount: -500.0,
          transactionType: "expense",
        },
      ],
    },
  ];

  const transactionDataWithNetIncome = transactionData.map((data) => {
    const netIncome = data.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
    return { ...data, netIncome };
  });

  // Expanded Dummy Data for transactions (Weekly)
  const weeklyTransactionData = [
    {
      weekStart: "01",
      weekEnd: "07",
      month: "DEC",
      year: 2024,
      transactions: [
        {
          category: "Food",
          name: "Groceries",
          description: "Weekly groceries",
          amount: -750.0,
          transactionType: "expense",
        },
        {
          category: "Salary",
          name: "Monthly Pay",
          description: "Full-time job salary",
          amount: 20000.0,
          transactionType: "income",
        },
        {
          category: "Utilities",
          name: "Electricity Bill",
          description: "Monthly electricity",
          amount: -3500.0,
          transactionType: "expense",
        },
      ],
    },
    {
      weekStart: "08",
      weekEnd: "14",
      month: "DEC",
      year: 2024,
      transactions: [
        {
          category: "Entertainment",
          name: "Streaming Subscription",
          description: "Monthly Netflix plan",
          amount: -500.0,
          transactionType: "expense",
        },
        {
          category: "Savings",
          name: "Investment",
          description: "Stocks purchase",
          amount: -10000.0,
          transactionType: "expense",
        },
        {
          category: "Salary",
          name: "Freelance Payment",
          description: "Project completion",
          amount: 8000.0,
          transactionType: "income",
        },
      ],
    },
  ];

  const weeklyTransactionDataWithNetIncome = weeklyTransactionData.map(
    (week) => {
      const netIncome = week.transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
      const income = week.transactions
        .filter((t) => t.transactionType === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = week.transactions
        .filter((t) => t.transactionType === "expense")
        .reduce((sum, t) => sum + t.amount, 0); // Keep negative values as they are, don't use Math.abs()

      return { ...week, netIncome, totalIncome: income, totalExpense: expense };
    }
  );

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
                  {weeklyTransactionDataWithNetIncome.map((week, index) => (
                    <TransactionWeekly
                      key={index}
                      date={{
                        start: week.weekStart,
                        end: week.weekEnd,
                        month: week.month,
                      }}
                      year={week.year}
                      netIncome={week.netIncome}
                      totalIncome={week.totalIncome}
                      totalExpense={week.totalExpense}
                      transactions={week.transactions}
                    />
                  ))}
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
