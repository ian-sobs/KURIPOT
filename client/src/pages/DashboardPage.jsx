import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import axios from "axios";
import TransactionCard from "../components/transactions/TransactionCard";
import { protectedRoute } from "../apiClient/axiosInstance";
import TopSpendingCard from "../components/categories/TopSpendingCard";
import formatNumWithCommas from "../utility/formatNumWithCommas";

const Dashboard = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [accounts, setAccounts] = useState([]);
  const [topSpending, setTopSpending] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  useEffect(() => {
    protectedRoute
      .get("/transactions/getTransactions", {
        params: {
          period: "range",
          startDate: new Date(
            Date.UTC(
              new Date().getUTCFullYear(),
              new Date().getUTCMonth(),
              new Date().getUTCDate() - 7
            )
          ),
          endDate: new Date(
            Date.UTC(
              new Date().getUTCFullYear(),
              new Date().getUTCMonth(),
              new Date().getUTCDate() + 7
            )
          ),
        },
      })
      .then((response) => setRecentTransactions(response.data))
      .catch((error) => console.log(error));

    protectedRoute
      .get("/transactions/getTotalIncome")
      .then((response) => setIncome(response.data.totalIncome || 0))
      .catch((error) => console.log(error));

    protectedRoute
      .get("/transactions/getTotalExpense")
      .then((response) => setExpenses(response.data.totalExpense))
      .catch((error) => console.log(error));

    protectedRoute
      .get("/accounts/getAccounts")
      .then((response) => {
        setAccounts(response.data.accounts);
        setTotalBalance(response.data.totalBalance || 0);
      })
      .catch((error) => console.log(error));

    protectedRoute
      .get("/transactions/getTopSpending")
      .then((response) => setTopSpending(response.data.categories))
      .catch((error) => console.log(error));
  }, []);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] overflow-auto page-with-taskbar">
        <PageHeader title="Dashboard" />

        <div className="page-with-navhead amount-container w-full p-0">
          <div className="amount-container-content w-full flex items-center justify-between p-6 pb-5">
            <div className="balance-container items-start text-left text-lg text-white">
              Total Balance
              <div className="amount text-4xl font-bold">
                {isBalanceVisible
                  ? totalBalance < 0
                    ? `- ₱ ${formatNumWithCommas(-totalBalance)}`
                    : `₱ ${formatNumWithCommas(totalBalance)}`
                  : "₱ *****"}
              </div>
            </div>
            <button onClick={toggleBalanceVisibility} className="p-2">
              {isBalanceVisible ? (
                <i className="bi bi-eye text-2xl"></i>
              ) : (
                <i className="bi bi-eye-slash text-2xl"></i>
              )}
            </button>
          </div>
        </div>

        <div className="income-expenses-container items-center flex w-full text-lg text-white p-6 pt-0 rounded-full">
          <div className="income-container p-4 flex-1 bg-[#9747FF]/75 border border-white rounded-badge shadow-lg">
            <i className="bi-arrow-down-circle pr-2"></i>
            Income
            <div className="income-amount text-md font-bold">
              ₱ {formatNumWithCommas(income)}
            </div>
          </div>
          <div className="expenses-container p-4 flex-1 bg-[#9747FF]/75 border border-white rounded-badge ml-4 shadow-lg">
            <i className="bi-arrow-up-circle pr-2"></i>
            Expenses
            <div className="expenses-amount text-md font-bold">
              - ₱ {formatNumWithCommas(-expenses)}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-4 p-6 h-full">
          {/* Accounts Section */}
          <div className="dash-left justify-between w-full lg:max-w-[50%] gap-4 flex flex-col">
            <div className="collapse collapse-arrow w-full p-3 shadow- overflow-hidden bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-badge shadow-lg border-2 border-white border-opacity-20">
              <input
                type="checkbox"
                className="lg:hidden"
                name="my-accordion-1"
                defaultChecked
              />
              <div className="collapse-title text-xl font-medium pb-0 lg:block">
                My Accounts
              </div>
              <div className="collapse-content lg:block">
                {accounts.length > 0 ? (
                  <ul>
                    {accounts.map((account, index) => (
                      <li key={index} className="py-2 flex justify-between">
                        <span>{account.name}</span>
                        <span className="font-bold">
                          ₱ {formatNumWithCommas(account.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm font-light">
                    You have no accounts.
                  </p>
                )}
              </div>
              <Link
                to="/dashboard/viewAccounts"
                className="flex justify-center"
              >
                <button className="text-gray-300 text-xs hover:underline transition-all">
                  Manage Accounts
                </button>
              </Link>
            </div>

            {/* Top Spending Section */}
            <div className="collapse collapse-arrow w-full p-3 rounded-badge shadow- overflow-hidden bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white shadow-lg border-2 border-white border-opacity-20">
              <input
                type="checkbox"
                className="lg:hidden"
                name="my-accordion-2"
                defaultChecked
              />
              <div className="collapse-title text-xl font-medium pb-2 lg:block">
                Top Spending
              </div>
              <div className="collapse-content lg:block">
                {topSpending.length > 0 ? (
                  <ul>
                    {topSpending.map((spending, index) => (
                      <TopSpendingCard key={index} {...spending} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm font-light">
                    No spending data available.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Transactions Section */}
          <div className="dash-right w-full lg:max-w-[50%] min-h-full flex flex-col">
            <div className="collapse collapse-arrow h-full p-3 rounded-badge shadow- flex-grow bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white shadow-lg border-2 border-white border-opacity-20">
              <input
                type="checkbox"
                className="lg:hidden"
                name="my-accordion-3"
                defaultChecked
              />
              <div className="collapse-title text-xl font-medium pb-2 lg:block">
                Recent Transactions
              </div>
              <div className="collapse-content lg:block">
                {recentTransactions.length > 0 ? (
                  <ul className="h-64 md:h-72 lg:h-80 overflow-y-auto">
                    {recentTransactions.map((transaction, index) => (
                      <TransactionCard key={index} {...transaction} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm font-light">
                    No recent transactions available.
                  </p>
                )}
              </div>
              <Link
                to="/dashboard/transactions"
                className="flex justify-center"
              >
                <button className="text-gray-300 text-xs hover:underline transition-all">
                  Manage Transactions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
