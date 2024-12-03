import React, { useState } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import axios from "axios"; // Import axios

const AddBudget = () => {

    const [date, setDate] = useState("");
    const [budgetLimit, setBudgetLimit] = useState("");
    const [categories, setCategories] = useState([]);
    const [account, setAccount] = useState("");

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const allCategories = ["Shopping", "Food", "Entertainment", "Transportation", "Bills"]; // STATIC CATEGORIES

    const accounts = ["Savings", "Checking", "Emergency Fund"]; // STATIC ACCOUNTS

    const handleSubmit = async (e) => {
        e.preventDefault();
        const budgetData = {
            date,
            budgetLimit,
            categories,
            account
        };

        try {
            const response = await axios.post("/api/budgets", budgetData, {
                headers: {
                    "Content-Type": "application/json"
                }
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


    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setCategories((prevCategories) => [...prevCategories, value]);
        } else {
            setCategories((prevCategories) => prevCategories.filter((category) => category !== value));
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader
                    title="Add Budget"
                    subtitle="Manage Your Expenses with Ease — Add a Budget"
                    onBackClick={() => window.history.back()}
                />

                <div className="mt-[4rem] flex items-center justify-center">
                    <div className="items-center w-full max-w-md p-6 rounded-badge shadow-md m-10 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white shadow-lg">

                        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                        {success && <div className="text-green-500 text-center mb-4">Budget added successfully!</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div>
                                <div className="flex items-center text-white">
                                    <label htmlFor="budgetLimit" className="block text-white mr-2 font-bold">Budget Limit (PHP)</label>
                                </div>
                                <div className="flex items-center justify-center">
                                    <i className="bi bi-cash-coin pt-3 pr-3 text-2xl items-center" />
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
                                <label htmlFor="date" className="block text-white font-bold">Month and Year</label>
                                <div className="flex items-center justify-center">
                                    <i className="bi bi-calendar-event pt-3 pr-3 text-2xl items-center" />
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

                            <div>
                                <label htmlFor="categories" className="block text-white font-bold">Budget Categories</label>
                                <div className="space-y-2 mt-2 pl-5">
                                    {allCategories.map((category, index) => (
                                        <div key={index} className="flex items-center">

                                            <input
                                                type="checkbox"
                                                id={`category-${category}`}
                                                value={category}
                                                checked={categories.includes(category)}
                                                onChange={handleCategoryChange}
                                                className="mr-2"
                                            />
                                            <label htmlFor={`category-${category}`} className="text-white">{category}</label>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white text-xs mt-2">Select multiple categories</p>
                            </div>

                            <div>
                                <label htmlFor="account" className="block text-white font-bold">Account</label>
                                <div className="flex items-center justify-center">
                                    <i className="bi bi-wallet pt-3 pr-3 text-2xl items-center" />
                                    <select
                                        id="account"
                                        value={account}
                                        onChange={(e) => setAccount(e.target.value)}
                                        required
                                        className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                                    >
                                        <option value="">Select Account</option>
                                        {accounts.map((acc, index) => (
                                            <option key={index} value={acc}>{acc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="text-center mt-6">
                                <button
                                    type="submit"
                                    className="px-10 py-2 bg-[#9747FF] text-white rounded-md"
                                >
                                    Add Budget
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBudget;
