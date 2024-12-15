import React, { useState } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import TransactionDaily from "../components/transactions/TransactionDaily";
import TransactionWeekly from "../components/transactions/TransactionWeekly";
import TransactionMonthly from "../components/transactions/TransactionMonthly";

const TransactionsPage = () => {
  const [date, setDate] = useState({ month: 11, year: 2024 }); // Default: December 2024 (0-indexed months)
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab

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

  // Define transaction data
  const transactionData = {
    daily: [
      {
        date: "2024-12-01",
        day: "Sunday",
        netIncome: 5000.0,
        transactions: [
          {
            category: "Salary",
            name: "Freelance Project",
            description: "Payment for freelance project",
            amount: 5000.0,
            transactionType: "income",
          },
        ],
      },
      {
        date: "2024-12-02",
        day: "Monday",
        netIncome: -1000.0,
        transactions: [
          {
            category: "Food",
            name: "Groceries",
            description: "Groceries for the week",
            amount: -1000.0,
            transactionType: "expense",
          },
        ],
      },
    ],
    weekly: [
      {
        date: { start: "2024-11-30", end: "2024-12-06" },
        netIncome: 4000.0,
        totalIncome: 6000.0,
        totalExpense: -2000.0,
      },
      {
        date: { start: "2024-12-07", end: "2024-12-13" },
        netIncome: 3000.0,
        totalIncome: 7000.0,
        totalExpense: -4000.0,
      },
    ],
    monthly: [
      {
        month: "DEC",
        year: 2024,
        transactions: [
          {
            category: "Food",
            name: "Groceries",
            description: "Monthly groceries",
            amount: -2000.0,
            transactionType: "expense",
          },
          {
            category: "Salary",
            name: "Salary",
            description: "Full-time job salary",
            amount: 25000.0,
            transactionType: "income",
          },
          {
            category: "Utilities",
            name: "Internet Bill",
            description: "Monthly internet",
            amount: -1500.0,
            transactionType: "expense",
          },
        ],
      },
      {
        month: "JAN",
        year: 2025,
        transactions: [
          {
            category: "Travel",
            name: "Flight Tickets",
            description: "Round-trip to destination",
            amount: -5000.0,
            transactionType: "expense",
          },
          {
            category: "Salary",
            name: "Freelance Work",
            description: "Freelance projects",
            amount: 10000.0,
            transactionType: "income",
          },
        ],
      },
    ],
  };

  // Map monthly data to include net income, total income, and total expenses
  const monthlyTransactionDataWithNetIncome = transactionData.monthly.map(
    (data) => {
      const netIncome = data.transactions.reduce(
        (total, transaction) => total + transaction.amount,
        0
      );
      const income = data.transactions
        .filter((t) => t.transactionType === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = data.transactions
        .filter((t) => t.transactionType === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      return { ...data, netIncome, totalIncome: income, totalExpense: expense };
    }
  );

  const filteredTransactions = () => {
    if (activeTab === 0) {
      return transactionData.daily.filter((data) => {
        const transactionDate = new Date(data.date);
        return (
          transactionDate.getMonth() === date.month &&
          transactionDate.getFullYear() === date.year
        );
      });
    } else if (activeTab === 1) {
      return transactionData.weekly.filter((data) => {
        const startYear = new Date(data.date.start).getFullYear();
        return startYear === date.year;
      });
    } else if (activeTab === 2) {
      return monthlyTransactionDataWithNetIncome.filter(
        (data) => data.year === date.year
      );
    }
  };

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
            {activeTab === 0 ? (
              <>
                <button onClick={handlePrevMonth}>
                  <i className="bi bi-caret-left ml-6"></i>
                </button>
                <h2>{`${months[date.month]} ${date.year}`}</h2>
                <button onClick={handleNextMonth}>
                  <i className="bi bi-caret-right mr-6"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    setDate((prev) => ({ ...prev, year: prev.year - 1 }))
                  }
                >
                  <i className="bi bi-caret-left ml-6"></i>
                </button>
                <h2>{`${date.year}`}</h2>
                <button
                  onClick={() =>
                    setDate((prev) => ({ ...prev, year: prev.year + 1 }))
                  }
                >
                  <i className="bi bi-caret-right mr-6"></i>
                </button>
              </>
            )}
          </div>
          <div className="tab-container w-full px-6">
            <div
              role="tablist"
              className="tab-switch tabs tabs-bordered w-full tabs-lg flex justify-center items-center"
            >
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={`tab text-white ${
                  activeTab === 0 ? "tab-active text-[#9747FF]" : ""
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
                  activeTab === 1 ? "tab-active text-[#9747FF]" : ""
                }`}
                aria-label="WEEKLY"
                onClick={() => handleTabChange(1)}
              />
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={`tab text-white ${
                  activeTab === 2 ? "tab-active text-[#9747FF]" : ""
                }`}
                aria-label="MONTHLY"
                onClick={() => handleTabChange(2)}
              />
            </div>

            <div role="tabpanel" className="content-tab">
              {filteredTransactions().length === 0 ? (
                <div className="no-transactions">
                  <p>No transactions available for the selected period.</p>
                </div>
              ) : (
                filteredTransactions().map((data, index) => {
                  if (activeTab === 0) {
                    return (
                      <TransactionDaily
                        key={index}
                        date={data.date}
                        day={data.day}
                        netIncome={data.netIncome}
                        transactions={data.transactions}
                      />
                    );
                  } else if (activeTab === 1) {
                    return (
                      <TransactionWeekly
                        key={index}
                        date={data.date}
                        netIncome={data.netIncome}
                        totalIncome={data.totalIncome}
                        totalExpense={data.totalExpense}
                      />
                    );
                  } else {
                    return (
                      <TransactionMonthly
                        key={index}
                        date={{ month: data.month, year: data.year }}
                        netIncome={data.netIncome}
                        totalIncome={data.totalIncome}
                        totalExpense={data.totalExpense}
                        transactions={data.transactions}
                      />
                    );
                  }
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
