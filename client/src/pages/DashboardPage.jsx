import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({
    totalBalance: 0,
    income: 0,
    expenses: 0,
    //static data, feel free to remove when testing with the backend
    accounts: [
      { name: "Savings", amount: 15000 },
      { name: "Checking", amount: 5000 },
      { name: "Emergency Fund", amount: 3000 },
    ],
    topSpending: [
      { category: "Shopping", amount: 5000 },
      { category: "Food", amount: 2000 },
    ],
    recentTransactions: [
      {
        date: "2024-12-01",
        amount: 1500,
        description: "Salary Payment",
        type: "income",
      },
      {
        date: "2024-11-25",
        amount: 200,
        description: "Grocery Shopping",
        type: "expense",
      },
    ],
  });
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("#"); // Replace with actual API endpoint
        setData(response.data); // Assuming the API returns data in the required format
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  const calculatePercentage = (amount) => {
    if (data.expenses === 0) return 0;
    return ((amount / data.expenses) * 100).toFixed(2);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] overflow-auto page-with-taskbar">
        <PageHeader title="Dashboard" />

        <div className="page-with-navhead amount-container w-full p-0">
          <div className="amount-container-content w-full flex items-center justify-between p-10 pb-5">
            <div className="balance-container items-start text-left text-lg text-white">
              Total Balance
              <div className="amount text-4xl font-bold">
                {isBalanceVisible ? `Php ${data.totalBalance}` : "*****"}
              </div>
            </div>
            <button onClick={toggleBalanceVisibility} className="p-2">
              {isBalanceVisible ? (
                <i class="bi bi-eye text-2xl"></i>
              ) : (
                <i class="bi bi-eye-slash text-2xl"></i>
              )}
            </button>
          </div>
        </div>

        <div className="income-expenses-container items-center flex w-full text-lg text-white p-10 pt-0 rounded-full">
          <div className="income-container p-4 flex-1 bg-[#9747FF]/75 border border-white rounded-badge shadow-lg">
            <i className="bi-arrow-down-circle pr-2"></i>
            Income
            <div className="income-amount text-md font-bold">
              Php {data.income}
            </div>
          </div>
          <div className="expenses-container p-4 flex-1 bg-[#9747FF]/75 border border-white rounded-badge ml-4 shadow-lg">
            <i className="bi-arrow-up-circle pr-2"></i>
            Expenses
            <div className="expenses-amount text-md font-bold">
              Php {data.expenses}
            </div>
          </div>
        </div>

        {/* Accounts and Top Spending Section */}
        <div className="p-10 pb-5 pt-0">
          <div className="collapse collapse-arrow max-w-2xl w-full p-3 shadow- overflow-hidden mb-4 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-badge shadow-lg border-2 border-white border-opacity-20">
            <div className="flex justify-center items-center">
              <Link to="/dashboard/viewAccounts">
                <button className="text-white text-xs hover:underline transition-all">
                  Manage Accounts
                </button>
              </Link>
            </div>

            <input type="checkbox" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium pb-2">
              My Accounts
            </div>
            <div className="collapse-content">
              {data.accounts.length > 0 ? (
                <ul>
                  {data.accounts.map((account, index) => (
                    <li key={index} className="py-2">
                      <div className="flex justify-between">
                        <span>{account.name}</span>
                        <span className="font-bold">Php {account.amount}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You have no accounts.</p>
              )}
            </div>
          </div>
          <div className="collapse collapse-arrow max-w-2xl w-full p-3 rounded-badge shadow- overflow-hidden mb-4 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white shadow-lg border-2 border-white border-opacity-20">
            <input type="checkbox" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium pb-2">
              Top Spending
            </div>
            <div className="collapse-content">
              {data.topSpending.length > 0 ? (
                <ul>
                  {data.topSpending.map((spending, index) => (
                    <li key={index} className="py-2">
                      <div className="flex justify-between">
                        <span>{spending.category}</span>
                        <span className="font-bold">
                          Php {spending.amount} (
                          {calculatePercentage(spending.amount)}%)
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No spending data available.</p>
              )}
            </div>
          </div>
          <div className="collapse collapse-arrow max-w-2xl w-full p-3 rounded-badge shadow- overflow-hidden mb-4 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white shadow-lg border-2 border-white border-opacity-20">
            <input type="checkbox" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium pb-2">
              Recent Transactions
            </div>
            <div className="collapse-content">
              {data.recentTransactions.length > 0 ? (
                <ul>
                  {data.recentTransactions.map((transaction, index) => (
                    <li key={index} className="py-2">
                      <div className="flex justify-between">
                        <span>{transaction.date}</span>
                        <span
                          className={`font-bold ${
                            transaction.type === "income"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          Php {transaction.amount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {transaction.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent transactions available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
