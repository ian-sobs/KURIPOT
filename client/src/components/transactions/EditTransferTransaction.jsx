import React, { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";
import { useNavigate } from "react-router-dom"; 

const EditTransferTransaction = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
  setModalData,
  accounts,
  onClose,
  setLastUpdatedTransaction,
  lastUpdatedTransaction
}) => {
  const [updatedData, setUpdatedData] = useState(modalData);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    setUpdatedData(modalData);
  }, [modalData]);

  useEffect(()=>{
    console.log('updatedData', updatedData)
  })

  const handleEditChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "toAccount") {
      // Find the selected account
      const selectedAccount = accounts.find(account => account.id === parseInt(value));
      if (selectedAccount) {
        setUpdatedData({
          ...updatedData,
          toAccount: selectedAccount.name, // Update account name
          toAccountId: selectedAccount.id // Update account ID
        });
      }
    } else if (name === "fromAccount") {
      const selectedAccount = accounts.find(account => account.id === parseInt(value));
      if (selectedAccount) {
        setUpdatedData({
          ...updatedData,
          fromAccount: selectedAccount.name, // Update account name
          fromAccountId: selectedAccount.id // Update account ID
        });
      }
    } else {
      setUpdatedData({ ...updatedData, [name]: value });
    }
  };

  const handleSave = () => {

    if (!updatedData.date) {
      setFormError("Date is required.");
      return;
    }

    setFormError("");
    // Logic to save the updated data
    const transactionData = {
      id: parseInt(updatedData.transactionId, 10),
      amount: parseFloat(parseFloat(updatedData.amount).toFixed(2)),
      from_account_id: parseInt(updatedData.fromAccountId, 10),
      date: new Date(new Date(updatedData.date).toISOString()),
      to_account_id: parseInt(updatedData.toAccountId, 10),
      note: updatedData.description,
      type: 'transfer'
    }
    protectedRoute.patch("/transactions/updateTransaction", transactionData)
      .then((response) => {
        setIsModalOpen(false); // Close modal after saving
        const {data} = response
        console.log(data)
        navigate("/dashboard/transactions");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error)
        setIsModalOpen(false);
        navigate("/dashboard/transactions");
      })
    console.log("Updated Data:", updatedData);
    
  };


  return (
    isModalOpen && (
      <div className="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
        <div className="modal-container bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">
            Edit Transfer Transaction
          </h3>

          {formError && (
          <p className="text-red-500 text-sm mb-4">{formError}</p>
        )}
          {/* From Account */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">
              From Account:
            </label>
            <select
              name="fromAccount"
              value={updatedData.fromAccountId || ""}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {accounts.length > 0 ? (
                accounts.map((accountItem) => (
                  <option key={accountItem.id} value={accountItem.id}>
                    {accountItem.name}
                  </option>
                ))
              ) : (
                <option value="">No accounts available</option>
              )}
            </select>

          </div>

          {/* To Account */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">
              To Account:
            </label>
            <select
              name="toAccount"
              value={updatedData.toAccountId || ""}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {accounts.length > 0 ? (
                accounts.map((accountItem) => (
                  <option key={accountItem.id} value={accountItem.id}>
                    {accountItem.name}
                  </option>
                ))
              ) : (
                <option value="">No accounts available</option>
              )}
            </select>
          </div>

          {/* Amount */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">Amount:</label>
            <input
              type="number"
              name="amount"
              value={updatedData.amount}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Transaction Date */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">
              Transaction Date:
            </label>
            <input
              type="date"
              name="date"
              value={updatedData.date}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={updatedData.description}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 text-gray-200 px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditTransferTransaction;
