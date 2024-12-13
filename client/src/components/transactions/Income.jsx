import React, { useState } from "react";
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";

const Income = () => {
  const [incomeDetails, setIncomeDetails] = useState({
    amount: "",
    date: "",
    account: "", // Added account field
    categories: [],
  });

  const allCategories = [
    "Salary",
    "Savings",
    "Business",
    "Passive Income",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setIncomeDetails((prevDetails) => {
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
    console.log("Income details submitted:", incomeDetails);
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
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div>
                <label htmlFor="categories" className="block text-slate-300 mb-1">
                  Income Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={category}
                        checked={incomeDetails.categories.includes(category)}
                        onChange={handleCategoryChange}
                        className="form-checkbox text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-300">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="account" className="block text-slate-300 mb-1">
                  Account to Add Income To
                </label>
                <select
                  id="account"
                  name="account"
                  value={incomeDetails.account}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-blue-600"
                  required
                >
                  <option value="">Select Account</option>
                  <option value="savings">Savings Account</option>
                  <option value="checking">Checking Account</option>
                  <option value="investment">Investment Account</option>
                </select>
              </div>

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