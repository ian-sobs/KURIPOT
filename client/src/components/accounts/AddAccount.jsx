import React, { useState } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";

const AddAccount = ({accounts, setAccounts}) => {
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Popup State
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountData = {
      name: accountName,
      amount: parseFloat(amount),
    };

    // try {
    //   const response = await axios.post("http://localhost:5000/api/accounts/makeAccount", accountData, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   if (response.status === 200) {
    //     setSuccess(true);
    //     setError(null);
    //     setAccountName("");
    //     setAmount("");
    //   } else {
    //     throw new Error("Account creation failed!");
    //   }
    // } catch (err) {
    //   setError("Account creation failed!");
    //   setSuccess(false);
    // }
  
    protectedRoute.post("/accounts/makeAccount", accountData)
      .then((response) => {
        const {data} = response
        console.log(data.message)
        setSuccess(true);
        setError(null);
        setAccountName("");
        setAmount("");
        setAccounts([...accounts, data.account])
      })
      .catch((error) => {
        setError("Account creation failed!");
        setSuccess(false);
        console.log(error)
      })
  };

  return (
    <div>
      <div className="md:ml-[20%] lg:ml-[16.666%]">
        <div className="p-5 pb-0 flex justify-end">
        <button
          onClick={openPopup}
          className="bg-[#9747FF] text-white w-20 h-10 rounded-lg flex items-center justify-center hover:bg-[#7e3adf] transition-all"
        >
          <i className="bi-plus text-white text-xl"></i><div className="p-2">
                  New
                  </div>
        </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-lg font-bold text-slate-300">
                  ADD A NEW ACCOUNT
                </h2>
                <button
                  onClick={closePopup}
                  className="text-gray-500 hover:text-slate-300"
                >
                  ✕
                </button>
              </div>

              <div className="text-white space-y-4">
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
                    <label
                      htmlFor="amount"
                      className="block text-white font-bold"
                    >
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
        )}
      </div>
    </div>
  );
};

export default AddAccount;
