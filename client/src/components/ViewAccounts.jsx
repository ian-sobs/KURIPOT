import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

const ViewAccounts = () => {
  // Static frontend data
  const accounts = [
    { name: "Savings", amount: 15000 },
    { name: "Checking", amount: 5000 },
    { name: "Emergency Fund", amount: 3000 },
    { name: "PNB Savings Account", amount: 1000 },
    { name: "BPI Savings", amount: 5000 },
    { name: "Gcash", amount: 7000 },
  ];

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] page-with-taskbar">
        <PageHeader
          title="My Accounts"
          subtitle="Manage Your Personal Information and Preferences"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead p-10">
          <div className="bg-bg-[#010827] p-5 rounded-badge shadow-lg">
            <ul>
              {accounts.map((account, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 p-4 rounded-badge mb-2"
                >
                  <span className="text-white font-semibold">
                    {account.name}
                  </span>
                  <span className="text-[#9747FF] font-bold">
                    Php {account.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 pb-0 flex justify-end">
            <Link to="/dashboard/addAccount">
              <button className="bg-[#9747FF] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#7e3adf] transition-all">
                <i className="bi-plus text-white text-xl"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAccounts;
