import React, { useState, useEffect } from "react";
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";
import { protectedRoute } from "../../apiClient/axiosInstance";

const Expense = () => {
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationMessage, setConfirmationMessage] = useState(""); // To store confirmation message

  useEffect(() => {
    protectedRoute
      .get("/accounts/getAccounts")
      .then((response) => {
        const { data } = response;
        setAccounts(data.accounts);
      })
      .catch((error) => {
        console.log("Error fetching accounts:", error);
      });
  }, []);

  useEffect(() => {
    protectedRoute
      .get("/categories/getCategories")
      .then((response) => {
        const { data } = response;
        setCategories(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      });
  }, []);

  const [expenseDetails, setExpenseDetails] = useState({
    amount: "",
    date: "",
    accountId: "",
    categoryId: "",
    note: "",
    recurrId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setExpenseDetails((prevDetails) => ({
      ...prevDetails,
      categoryId: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmationMessage(""); // Reset confirmation message before submitting

    protectedRoute
      .post("/transactions/makeExpense", expenseDetails)
      .then((response) => {
        setConfirmationMessage("Expense transaction successful!"); // Success message
        console.log("Expense transaction successful:", response.data);
        // Optionally, reset the form after a successful transaction
        setExpenseDetails({
          amount: "",
          date: "",
          accountId: "",
          categoryId: "",
          note: "",
          recurrId: "",
        });
      })
      .catch((error) => {
        setConfirmationMessage("Failed to complete the expense transaction."); // Error message
        console.error("Error during expense transaction:", error);
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] page-with-taskbar">
        <PageHeader
          title="Expense Transaction"
          subtitle="Track and Manage Your Expenses"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead flex-col items-center justify-center mt-5 p-4">
          <div className="max-w-md mx-auto mt-5 p-6 bg-gray-950 rounded-badge shadow-lg">
            {confirmationMessage && (
              <div
                className={`mb-4 p-4 text-center rounded-md ${
                  confirmationMessage.includes("successful")
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {confirmationMessage}
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
                  htmlFor="accountId"
                  className="block text-slate-300 mb-1"
                >
                  Account
                </label>
                <select
                  id="accountId"
                  name="accountId"
                  value={expenseDetails.accountId}
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
                <label htmlFor="categoryId" className="block text-slate-300 mb-1">
                  Category
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={expenseDetails.categoryId}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="note" className="block text-slate-300 mb-1">
                  Note (Optional)
                </label>
                <textarea
                  id="note"
                  name="note"
                  value={expenseDetails.note}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  placeholder="Add any notes"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
              >
                Save Expense
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;
