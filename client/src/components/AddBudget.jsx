import React, { useState, useEffect } from "react";
import { protectedRoute } from "../apiClient/axiosInstance";
import axios from "axios";

const AddBudget = () => {
  const [date, setDate] = useState("");
  const [budgetLimit, setBudgetLimit] = useState("");
  const [categories, setCategories] = useState([]);
  const [account, setAccount] = useState("");
  // const [allCategories, setAllCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [accounts, setAccounts] = useState([]);

  // Popup state
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  useEffect(() => {
    // Fetch accounts from backend
    protectedRoute
      .get("/accounts/getAccounts")
      .then((response) => {
        const { data } = response;
        console.log("accounts: ", data);
        setAccounts(data.accounts); // Store accounts in state
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch categories from backend
    protectedRoute
      .get("/categories/getCategories")
      .then((response) => {
        const { data } = response;
        console.log("categories: ", data);
        setCategories(data.categories); // Set categories correctly
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const budgetData = {
      date,
      budgetLimit,
      categories,
      account,
    };

    try {
      const response = await axios.post("/api/budgets", budgetData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
      } else {
        throw new Error("Budget creation failed!");
      }
    } catch (err) {
      setError("Budget creation failed!");
      setSuccess(false);
    }
  };

  // const handleCategoryChange = (e) => {
  //   const { value, checked } = e.target;

  //   if (checked) {
  //     setCategories((prevCategories) => [...prevCategories, value]);
  //   } else {
  //     setCategories((prevCategories) =>
  //       prevCategories.filter((category) => category !== value)
  //     );
  //   }
  // };

  return (
    <div>
      <button
        onClick={openPopup}
        className="bg-[#9747FF] text-white py-2 px-10 rounded-lg mt-5 mb-5 hover:bg-[#7e3adf] transition-all"
      >
        Add a Budget
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-bold text-slate-300">
                ADD A NEW BUDGET
              </h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-slate-300">
              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}
              {success && (
                <div className="text-green-500 text-center mb-4">
                  Budget added successfully!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center text-white">
                    <label
                      htmlFor="budgetLimit"
                      className="block text-slate-300 mb-1"
                    >
                      Budget Limit (PHP)
                    </label>
                  </div>
                  <div className="flex items-center justify-center">
                    {/* <i className="bi bi-cash-coin pt-3 pr-3 text-2xl items-center" /> */}
                    <input
                      type="number"
                      id="budgetLimit"
                      placeholder="0.00"
                      value={budgetLimit}
                      onChange={(e) => setBudgetLimit(e.target.value)}
                      required
                      className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-white">
                    <label htmlFor="date" className="block text-slate-300 mb-1">
                      Month and Year
                    </label>
                  </div>
                  <div className="flex items-center justify-center">
                    {/* <i className="bi bi-calendar-event pt-3 pr-3 text-2xl items-center" /> */}
                    <input
                      type="month"
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full p-2 pr-5 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                    />
                  </div>
                </div>

                {/* <div>
                  <div className="flex items-center text-white">
                    <label
                      htmlFor="categories"
                      className="block text-slate-300 mb-1"
                    >
                      Budget Categories
                    </label>
                  </div>
                  <div className="space-y-2 mt-2 pl-5">
                    {allCategories?.map((category, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`category-${category.name}`}
                          value={category.name}
                          checked={categories.includes(category.name)}
                          onChange={handleCategoryChange}
                          className="mr-2"
                        />
                        <label
                          htmlFor={`category-${category.name}`}
                          className="text-white"
                        >
                          {category.name}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-white">
                    <p className="text-white text-xs mt-2">
                      Select multiple categories
                    </p>
                  </div>
                </div> */}

                <div>
                  <div className="flex items-center text-white">
                    <label
                      htmlFor="account"
                      className="block text-slate-300 mb-1"
                    >
                      Budget Categories
                    </label>
                  </div>
                  <div className="flex items-center justify-center">
                
                    <select
                      id="account"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-indigo-100"
                    >
                      <option value="">Select Account</option>
                      {accounts.length > 0 ? (
                        accounts.map((acc, index) => (
                          <option key={index} value={acc.name}>
                            {acc.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No accounts available</option>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center text-white">
                    <label
                      htmlFor="account"
                      className="block text-slate-300 mb-1"
                    >
                      Account
                    </label>
                  </div>
                  <div className="flex items-center justify-center">
                    {/* <i className="bi bi-wallet pt-3 pr-3 text-2xl items-center" /> */}
                    <select
                      id="account"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-indigo-100"
                    >
                      <option value="">Select Account</option>
                      {accounts.length > 0 ? (
                        accounts.map((acc, index) => (
                          <option key={index} value={acc.name}>
                            {acc.name}
                          </option>
                        ))
                      ) : (
                        <option value="">No accounts available</option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <button
                    type="submit"
                    className="px-10 py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
                  >
                    Add Budget
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBudget;
