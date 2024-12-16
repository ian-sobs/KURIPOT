import React from "react";
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";
import AddAccount from "./AddAccount";
import { useEffect, useState } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";
import AccountCard from "./AccountCard";

const ViewAccounts = () => {
  // Static frontend data
  // const accounts = [
  //   { name: "Savings", amount: 15000 },
  //   { name: "Checking", amount: 5000 },
  //   { name: "Emergency Fund", amount: 3000 },
  //   { name: "PNB Savings Account", amount: 1000 },
  //   { name: "BPI Savings", amount: 5000 },
  //   { name: "Gcash", amount: 7000 },
  // ];

  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    protectedRoute.get('/accounts/getAccounts')
      .then((response) => {
        const {data} = response
        console.log("accounts in viewAccounts:", data)
        setAccounts(data.accounts)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

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
          <div className="bg-[#010827]/25 p-5 rounded-badge shadow-lg">
            <ul>
              {accounts.map((account) => (
                <AccountCard
                  key={account.id} // Ensure each AccountCard has a unique key
                  {...account}
                  setAccounts={setAccounts}
                />
              ))}
            </ul>
          </div>
          <AddAccount accounts={accounts} setAccounts={setAccounts} />
        </div>
      </div>
    </div>
  );
};

export default ViewAccounts;
