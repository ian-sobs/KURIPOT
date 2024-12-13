import React, { useState, useEffect } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import HowToBudget from "../components/HowToBudget";
import AddBudget from "../components/AddBudget";
import { protectedRoute } from "../apiClient/axiosInstance";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    protectedRoute
      .get("/budgets/getBudgets")
      .then((response) => {
        const data = response.data; // Directly use `data` as it's already the array
        console.log("budgets:", data); // Check the structure of the data
        setBudgets(data || []); // Ensure it's an array even if undefined
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // Set loading to false in case of error
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] page-with-taskbar">
        <PageHeader
          title="Budgets"
          subtitle="Set a Budget and Stay on Track"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead p-10">
          {loading ? (
            // Loading state while data is being fetched
            <div className="flex justify-center items-center h-full text-white">
              Loading...
            </div>
          ) : budgets.length === 0 ? (
            // If there are no budgets
            <div className="flex flex-col items-center justify-center text-center">
              <img src="/images/budget-box.png" alt="" className="min-h-10" />
              <div className="text-white text-xl mb-2">
                You currently have no budget.
              </div>
              <div className="text-gray-400 text-sm">
                Input a budget and we'll help you manage your daily income and
                expenses.
              </div>
              <AddBudget />
              <div className="text-gray-400 text-sm underline">
                <HowToBudget />
              </div>
            </div>
          ) : (
            // If there are budgets
            <div>
              <ul className="text-white">
                {budgets.map((budget, index) => (
                  <li
                    key={budget.id} // Use unique `id` for the key
                    className="bg-[#15172E] p-4 mb-4 rounded-lg flex justify-between"
                  >
                    <div>
                      <div className="text-lg font-bold">
                        Budget {index + 1} {/* Display numbering */}
                      </div>
                      <div className="text-sm text-gray-400">
                        Date: {budget.date}
                      </div>
                      <div className="text-sm text-gray-400">
                        Type: {budget.type}
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        Categories:{" "}
                        {budget.categories && budget.categories.length > 0 ? (
                          <ul className="list-disc pl-5">
                            {budget.categories.map((category, idx) => (
                              <li key={idx}>{category.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <span>No categories assigned</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#9747FF] font-bold">
                        Php {parseFloat(budget.budgetLimit).toFixed(2)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <AddBudget />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Budgets;
