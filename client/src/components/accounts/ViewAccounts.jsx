import React, { useEffect, useState } from "react";
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";
import AddAccount from "./AddAccount";
import { protectedRoute } from "../../apiClient/axiosInstance";
import AccountCard from "./AccountCard";

const ViewAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    protectedRoute.get('/accounts/getAccounts')
      .then((response) => {
        const { data } = response;
        console.log("accounts in viewAccounts:", data);
        setAccounts(data.accounts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
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
                  key={account.id}
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
