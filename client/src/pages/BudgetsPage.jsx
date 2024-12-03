import React, { useState, useEffect } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import axios from "axios";

const Budgets = () => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    
        const fetchBudgets = async () => {
            try {
                const response = await axios.get("/api/budgets"); // Replace with your API endpoint
                setBudgets(response.data); // Assume API returns an array of budgets
            } catch (error) {
                console.error("Error fetching budgets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBudgets();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader
                    title="Budgets"
                    subtitle="Set a Budget and Stay on Track"
                    onBackClick={() => window.history.back()}
                />

                <div className="mt-[4rem] p-10">
                    {budgets.length === 0 ? (
                        // budgets are null
                        <div className="flex flex-col items-center justify-center text-center">
                            <img
                                src="/images/budget-box.png"
                                alt=""
                                className="min-h-10"
                            />
                            <div className="text-white text-xl mb-2">
                                You currently have no budget.
                            </div>
                            <div className="text-gray-400 text-sm">
                                Input a budget and we'll help you manage your daily income and expenses.
                            </div>
                            <Link to="/dashboard/budgets/addBudget">
                                <button className="bg-[#9747FF] text-white py-2 px-10 rounded-lg mt-5 mb-5 hover:bg-[#7e3adf] transition-all">
                                    Add a Budget
                                </button>
                            </Link>
                            <div className="text-gray-400 text-sm underline">
                                How to use a budget?
                            </div>
                        </div>
                    ) : (
                        // if there are budgets
                        <div>
                            <h2 className="text-white text-2xl mb-4">Your Budgets</h2>
                            <ul className="text-white">
                                {budgets.map((budget, index) => (
                                    <li
                                        key={index}
                                        className="bg-[#15172E] p-4 mb-4 rounded-lg flex justify-between"
                                    >
                                        <div>
                                            <div className="text-lg font-bold">{budget.name}</div>
                                            <div className="text-sm text-gray-400">
                                                Limit: Php {budget.limit.toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-green-400">
                                                Spent: Php {budget.spent.toFixed(2)}
                                            </div>
                                            <div
                                                className={`text-sm ${
                                                    budget.spent > budget.limit
                                                        ? "text-red-500"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                Remaining: Php {(
                                                    budget.limit - budget.spent
                                                ).toFixed(2)}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <Link to="/dashboard/budgets/addBudget">
                                <button className="bg-[#9747FF] text-white py-2 px-10 rounded-lg mt-5 hover:bg-[#7e3adf] transition-all">
                                    Add Another Budget
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Budgets;
