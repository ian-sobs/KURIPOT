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
    accounts: [],
    topSpending: [],
    recentTransactions: [],
  });

  useEffect(() => {
    //fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get("#"); // API call using axios
        setData(response.data); // Assuming the API returns data in the required format
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
        <PageHeader title="Dashboard" />

        <div className="mt-[4rem] amount-container w-full p-0">
          <div className="amount-container-content w-full flex items-center justify-between p-10 pb-5">
            <div className="balance-container items-start text-left text-lg text-white">
              Total Balance
              <div className="amount text-4xl font-bold">Php {data.totalBalance}</div>
            </div>
          </div>
        </div>

        <div className="income-expenses-container items-center flex w-full text-lg text-white p-10 pt-0 rounded-full">
          <div className="income-container p-4 flex-1 bg-[#9747FF]/75 border border-white rounded-lg shadow-lg">
            <i className="fs-4 bi-arrow-down-circle pr-2"></i>
            Income
            <div className="income-amount text-md font-bold">Php {data.income}</div>
          </div>
          <div className="expenses-container p-4 flex-1 bg-[#9747FF]/75 border border-white rounded-lg ml-4 shadow-lg">
            <i className="fs-4 bi-arrow-up-circle pr-2"></i>
            Expenses
            <div className="expenses-amount text-md font-bold">Php {data.expenses}</div>
          </div>
        </div>

        {/* Accounts and Top Spending Section */}
        <div className="p-10 pb-5 pt-0">
          <div className="collapse collapse-arrow max-w-2xl w-full p-3 rounded-lg shadow- overflow-hidden mb-4 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-lg shadow-lg border-2 border-white border-opacity-20">
            <div className="flex justify-end items-center">
              <Link to="/dashboard/viewAccounts">
                <button className="text-white text-xs hover:underline transition-all">
                  Manage Accounts
                </button>
              </Link>
            </div>


            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium border-b border-white pb-2">
              My Accounts
            </div>
            <div className="collapse-content">
              {data.accounts.length > 0 ? (
                <ul>
                  {data.accounts.map((account, index) => (
                    <li key={index}>{account}</li>
                  ))}
                </ul>
              ) : (
                <p>You have no accounts.</p>
              )}
            </div>
          </div>
          <div className="collapse collapse-arrow max-w-2xl w-full p-3 rounded-lg shadow- overflow-hidden mb-4 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-lg shadow-lg border-2 border-white border-opacity-20">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium border-b border-white pb-2">
              Top Spending
            </div>
            <div className="collapse-content">
              {data.topSpending.length > 0 ? (
                <ul>
                  {data.topSpending.map((spending, index) => (
                    <li key={index}>
                      {spending.category}: Php {spending.amount}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No spending data available.</p>
              )}
            </div>
          </div>
          <div className="collapse collapse-arrow max-w-2xl w-full p-3 rounded-lg shadow- overflow-hidden mb-4 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-lg shadow-lg border-2 border-white border-opacity-20">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium border-b border-white pb-2">
              Recent Transactions
            </div>
            <div className="collapse-content">
              {data.recentTransactions.length > 0 ? (
                <ul>
                  {data.recentTransactions.map((transaction, index) => (
                    <li key={index} className="py-2">
                      <div className="flex justify-between">
                        <span>{transaction.date}</span>
                        <span className={`font-bold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                          Php {transaction.amount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{transaction.description}</p>
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
