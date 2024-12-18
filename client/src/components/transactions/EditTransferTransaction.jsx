import React, { useState, useEffect } from "react";

const EditTransferTransaction = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
  setModalData,
  accounts,
  onClose,
}) => {
  const [updatedData, setUpdatedData] = useState(modalData);

  useEffect(() => {
    setUpdatedData(modalData);
  }, [modalData]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSave = () => {
    // Logic to save the updated data
    console.log("Updated Data:", updatedData);
    setIsModalOpen(false); // Close modal after saving
  };


  return (
    isModalOpen && (
      <div className="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
        <div className="modal-container bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
          <h3 className="text-xl font-semibold text-white mb-4">
            Edit Transfer Transaction
          </h3>

          {/* From Account */}
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">
              From Account:
            </label>
            <select
              name="fromAccount"
              value={updatedData.fromAccount}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {accounts.length > 0 ? (
                accounts.map((accountItem) => (
                  <option key={accountItem.id} value={accountItem.name}>
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
              value={updatedData.toAccount}
              onChange={handleEditChange}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {accounts.length > 0 ? (
                accounts.map((accountItem) => (
                  <option key={accountItem.id} value={accountItem.name}>
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
