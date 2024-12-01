import React, { useState } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const AddBudget = () => {
    // State to hold form data
    const [date, setDate] = useState("");
    const [budgetLimit, setBudgetLimit] = useState("");
    const [type, setType] = useState("");
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const types = ["Income", "Expenses", "Transfer"]; // STATIC CATEGORIES

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const budgetData = {
            date,
            budgetLimit,
            type
        };

        try {
            const response = await fetch("/api/budgets", { //insert api call 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(budgetData)
            });

            if (response.ok) {
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

    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader
                    title="Add Budget"
                    subtitle="Manage Your Expenses with Ease — Add a Budget"
                />
                
                <div className="mt-[4rem] flex items-center justify-center">
                    <div className="items-center w-full max-w-md p-6 rounded-lg shadow-md m-10 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-lg shadow-lg">

                        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                        {success && <div className="text-green-500 text-center mb-4">Budget added successfully!</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="date" className="block text-white">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full p-2 pr-5 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                                />
                            </div>

                            <div>
                                <label htmlFor="budgetLimit" className="block text-white">Budget Limit (PHP)</label>
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

                            <div>
                                <label htmlFor="type" className="block text-white">Type</label>
                                <select
                                    id="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                    className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                                >
                                    <option value="">Select Type</option>
                                    {types.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="text-center mt-6">
                                <button
                                    type="submit"
                                    className="px-10 py-2 bg-[#9747FF] text-white rounded-md"
                                >
                                    Save
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
