import React, { useState } from "react";
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";

const Expense = () => {
  const [expenseDetails, setExpenseDetails] = useState({
    amount: "",
    date: "",
    account: "", // Added account field
    categories: [], // Array to store selected categories
  });

  const allCategories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setExpenseDetails((prevDetails) => {
      const updatedCategories = checked
        ? [...prevDetails.categories, value]
        : prevDetails.categories.filter((category) => category !== value);

      return {
        ...prevDetails,
        categories: updatedCategories,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense details submitted:", expenseDetails);
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
                <label htmlFor="account" className="block text-slate-300 mb-1">
                  Account to Deduct From
                </label>
                <select
                  id="account"
                  name="account"
                  value={expenseDetails.account}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                >
                  <option value="">Select Account</option>
                  <option value="savings">Savings Account</option>
                  <option value="checking">Checking Account</option>
                  <option value="credit">Credit Card</option>
                </select>
              </div>

              <div>
                <label htmlFor="categories" className="block text-slate-300 mb-1">
                  Categories
                </label>
                <div className="space-y-2 mt-2 pl-5">
                  {allCategories.map((category, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`category-${category}`}
                        value={category}
                        checked={expenseDetails.categories.includes(category)}
                        onChange={handleCategoryChange}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="text-white"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="flex items-center text-white">
                  <p className="text-white text-xs mt-2">
                    Select multiple categories
                  </p>
                </div>
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
