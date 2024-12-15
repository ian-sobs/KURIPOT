import React, { useState, useEffect } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import AddBudget from "../components/budgets/AddBudget";
import HowToBudget from "../components/budgets/HowToBudget";
import { protectedRoute } from "../apiClient/axiosInstance";
import BudgetCard from "../components/budgets/BudgetCard";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    protectedRoute
      .get("/budgets/getBudgets")
      .then((response) => {
        const data = response.data; // Directly use `data` as it's already the array
        console.log("budgets:", data); // Check the structure of the data
        setBudgets(data.budgets || []); // Ensure it's an array even if undefined
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
                {budgets.map((budget) => (
                  <BudgetCard
                    key={budget.id} // Pass unique key
                    id={budget.id}
                    budgetLimit={parseFloat(budget.budgetLimit).toFixed(2)} // Ensure budget limit is formatted
                    //categories={budget.categories || []} // Ensure categories is an array
                    date={budget.date}
                    type={budget.type}
                  />
                ))}
              </ul>
              <AddBudget budgets={budgets} setBudgets={setBudgets} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Budgets;
