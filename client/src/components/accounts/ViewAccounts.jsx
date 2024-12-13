import React from "react";
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";
import AddAccount from "./AddAccount";

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
      <div className="page-with-taskbar flex-1 md:ml-[20%] lg:ml-[16.666%]">
        <PageHeader
          title="My Accounts"
          subtitle="Manage Your Personal Information and Preferences"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead p-10 pl-5 pr-5">
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
          <AddAccount/>
        </div>
      </div>
    </div>
  );
};

export default ViewAccounts;
