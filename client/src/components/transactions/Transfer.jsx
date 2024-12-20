import React, { useState, useEffect } from "react";
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";
import { protectedRoute } from "../../apiClient/axiosInstance";

const Transfer = () => {
  const [expenseDetails, setExpenseDetails] = useState({
    amount: "",
    date: "",
    accountFrom: "", // Account to transfer money from
    accountTo: "", // Account to transfer money to
  });

  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null); // To handle errors
  const [successMessage, setSuccessMessage] = useState(null); // For success confirmation message

  useEffect(() => {
    console.log("expenseDetails", expenseDetails);
  }, [expenseDetails]);

  useEffect(() => {
    protectedRoute
      .get("/accounts/getAccounts")
      .then((response) => {
        const { data } = response;
        console.log("accounts in viewAccounts:", data);
        setAccounts(data.accounts); // Assuming 'data.accounts' is the list of accounts
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transfer details submitted:", expenseDetails);

    let toSubmit = {
      amount: expenseDetails.amount,
      fromAccountId: expenseDetails.accountFrom,
      toAccountId: expenseDetails.accountTo,
      note: expenseDetails.note,
      date: expenseDetails.date,
    };

    setError(null);
    setSuccessMessage(null);

    protectedRoute
      .post("/transactions/makeTransfer", toSubmit)
      .then((response) => {
        const { data } = response;
        console.log("new transfer", data);
        setSuccessMessage("Transfer recorded successfully!");
      })
      .catch((error) => {
        console.log(error);
        setError("Transfer transaction failed.");
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] page-with-taskbar">
        <PageHeader
          title="Transfer Money"
          subtitle="Transfer Money Between Accounts"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead flex-col items-center justify-center mt-5 p-4">
          <div className="max-w-md mx-auto mt-5 p-6 bg-gray-950 rounded-badge shadow-lg">
            {/* Error and Success Messages */}
            {error && (
              <div className="text-red-500 mt-2 text-center">{error}</div>
            )}
            {successMessage && (
              <div className="text-green-500 mt-2 text-center">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-slate-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={expenseDetails.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  placeholder="e.g., 5000"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-slate-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={expenseDetails.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="accountFrom"
                  className="block text-slate-300 mb-1"
                >
                  Account to Transfer From
                </label>
                <select
                  id="accountFrom"
                  name="accountFrom"
                  value={expenseDetails.accountFrom}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                >
                  <option value="">Select Account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="accountTo"
                  className="block text-slate-300 mb-1"
                >
                  Account to Transfer To
                </label>
                <select
                  id="accountTo"
                  name="accountTo"
                  value={expenseDetails.accountTo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                >
                  <option value="">Select Account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>
              </div>

              
              {/* Note Input */}
              <div>
                <label htmlFor="note" className="block text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={expenseDetails.note}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  placeholder=""
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
              >
                Transfer Money
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
