import React, { useState, useEffect } from "react";
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";
import { protectedRoute } from "../../apiClient/axiosInstance";

const Income = () => {
  const [incomeDetails, setIncomeDetails] = useState({
    amount: "",
    date: "",
    account: "",
    categoryId: null,
  });

  const [allCategories, setAllCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);

  // Define state for error and success messages
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch accounts
    protectedRoute
      .get("/accounts/getAccounts")
      .then((response) => {
        const { data } = response;
        setAccounts(data.accounts || []);
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
        setError("Failed to fetch accounts.");
      });

    // Fetch categories
    protectedRoute
      .get("/categories/getCategories", {
        params: { isIncome: true },
      })
      .then((response) => {
        const { data } = response;
        setAllCategories(data || []);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      date: new Date(incomeDetails.date), 
      amount: parseFloat(incomeDetails.amount).toFixed(2),
      accountId: parseInt(incomeDetails.account, 10),
      categoryId: parseInt(incomeDetails.categoryId, 10),
      note: incomeDetails.note || "", // Default to empty string if no note
      recurrId: null,
    };

    // Reset error and success before making a request
    setError(null);
    setSuccess(null);

    protectedRoute
      .post("/transactions/makeIncome", submitData)
      .then((response) => {
        console.log("Income successfully submitted:", response.data);
        setSuccess("Income successfully added!");
      })
      .catch((error) => {
        console.error("Error submitting income:", error);
        setError("Failed to submit income.");
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] page-with-taskbar">
        <PageHeader
          title="Income Transaction"
          subtitle="View and Manage All Your Financial Activities"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead flex-col items-center justify-center mt-5 p-4">
          <div className="max-w-md mx-auto mt-5 p-6 bg-gray-950 rounded-badge shadow-lg">
            {/* Display error or success messages */}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {success && <div className="text-green-500 text-center mb-4">{success}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount Input */}
              <div>
                <label htmlFor="amount" className="block text-slate-300 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={incomeDetails.amount}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  placeholder="e.g., 5000"
                  required
                />
              </div>

              {/* Date Input */}
              <div>
                <label htmlFor="date" className="block text-slate-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={incomeDetails.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                />
              </div>

              {/* Categories Input */}
              <div>
                <label htmlFor="categories" className="block text-slate-300 mb-1">
                  Income Categories
                </label>
                <select
                  id="categories"
                  name="categoryId"
                  value={incomeDetails.categoryId || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {allCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Accounts Input */}
              <div>
                <label htmlFor="account" className="block text-slate-300 mb-1">
                  Account to Add Income To
                </label>
                <select
                  id="account"
                  name="account"
                  value={incomeDetails.account || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                >
                  <option value="" disabled>
                    Select an account
                  </option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.name} - Php {account.balance}
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
                  value={incomeDetails.note}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  placeholder=""
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
              >
                Save Income
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Income;
