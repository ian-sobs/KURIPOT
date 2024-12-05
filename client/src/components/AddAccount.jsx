import React, { useState } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import axios from "axios";

const AddAccount = () => {
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountData = {
      name: accountName,
      amount: parseFloat(amount),
    };

    try {
      const response = await axios.post("/api/accounts", accountData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        setAccountName("");
        setAmount("");
      } else {
        throw new Error("Account creation failed!");
      }
    } catch (err) {
      setError("Account creation failed!");
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
        <PageHeader
          title="Add Account"
          subtitle="Add a New Financial Account"
          onBackClick={() => window.history.back()}
        />

        <div className="mt-16 flex items-center justify-center">
          <div className="w-full max-w-md p-6 rounded-badge shadow-md m-10 bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white">
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            {success && (
              <div className="text-green-500 text-center mb-4">
                Account added successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Name Field */}
              <div>
                <label
                  htmlFor="accountName"
                  className="block text-white font-bold"
                >
                  Account Name
                </label>
                <input
                  type="text"
                  id="accountName"
                  placeholder="Enter account name"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  required
                  className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                />
              </div>

              {/* Amount Field */}
              <div>
                <label htmlFor="amount" className="block text-white font-bold">
                  Initial Amount (PHP)
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center mt-6">
                <button
                  type="submit"
                  className="px-10 py-2 bg-[#9747FF] text-white rounded-md"
                >
                  Add Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAccount;
