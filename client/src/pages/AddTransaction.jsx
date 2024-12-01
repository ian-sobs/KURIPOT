import React, { useState, useEffect } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const AddTransaction = () => {
    // State to hold form data
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [account, setAccount] = useState("");

    // State to hold user accounts and available categories
    const [accounts, setAccounts] = useState([]);
    const [categories] = useState(["Income", "Expenses", "Transfer"]); // STATIC DATA
    // const [categories,setCategories] = useState(["Income", "Expenses", "Transfer"]);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // fetch accounts of user
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch("/api/accounts"); // Replace with your API endpoint
                const data = await response.json();
                setAccounts(data); // Assuming response is an array of accounts
            } catch (err) {
                setError("Failed to load accounts");
            }
        };
        fetchAccounts();
    }, []);

    // form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const transactionData = {
            amount,
            category,
            date,
            account,
        };

        try {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transactionData),
            });
            if (response.ok) {
                setSuccess(true);
                setError(null);
            } else {
                throw new Error("Transaction Failed!");
            }
        } catch (err) {
            setError("Transaction Failed!");
            setSuccess(false);
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader
                    title="Add Transaction"
                    subtitle="Record and Categorize Your Income and Expenses"
                />
                
                <div className="mt-[4rem] flex items-center justify-center">
                    <div className="items-center w-full max-w-md p-6 rounded-lg shadow-md m-10 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-lg shadow-lg">

                        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                        {success && <div className="text-green-500 text-center mb-4">Transaction added successfully!</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="amount" className="block text-white">Amount (PHP)</label>
                                <input
                                    type="number"
                                    id="amount"
                                    placeholder="00.00"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                    className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                                />
                            </div>

                            <div>
                                <label htmlFor="category" className="block text-white">Category</label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

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
                                <label htmlFor="account" className="block text-white">Account</label>
                                <select
                                    id="account"
                                    value={account}
                                    onChange={(e) => setAccount(e.target.value)}
                                    required
                                    className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                                >
                                    <option value="">Select Account</option>
                                    {accounts.map((acc) => (
                                        <option key={acc.id} value={acc.id}>
                                            {acc.name}
                                        </option>
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

export default AddTransaction;
