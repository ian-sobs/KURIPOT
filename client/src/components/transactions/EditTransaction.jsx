import React, { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";
import { useNavigate } from "react-router-dom";

const EditTransaction = ({
  isModalOpen,
  setIsModalOpen,
  modalData,
  setModalData,
  loading,
  setLoading,  // Ensure this is passed as a prop
  accounts,
  categories,
  error,
  onClose,
  transacType,
  setTransacType, // New prop for transaction type (Income, Expense, Transfer)
  setLastUpdatedTransaction,
  lastUpdatedTransaction
}) => {
  const [updatedData, setUpdatedData] = useState(modalData);
  const navigate = useNavigate(); 
  const transacTypes = [{name: 'Income', value:'income'}, {name: 'Expense', value:'expense'}, {name: 'Transfer', value:'transfer'}]

  function categoryWasDeleted(category){
    if(!category || category == ''){
      return <option value=''>Select a category</option>
    }
  }

  useEffect(() => {
    setUpdatedData(modalData);
  }, [modalData]);

  useEffect(() => {
    console.log("updatedData", updatedData)
    console.log('transacType', transacType)
  }, [updatedData])

  const handleEditChange = (e) => {

    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    const transactionData = {
      note: updatedData.description,
      amount: parseFloat(parseFloat(updatedData.amount).toFixed(2)),
      account_id: parseInt(updatedData.account, 10),
      category_id: parseInt(updatedData.category, 10),
      date: new Date(new Date(updatedData.date).toISOString()),
      type: updatedData.transactionType,
      id: parseInt(updatedData.transactionId)
    };

    // If it's a transfer, we might need to send two accounts (from and to)
    // if (transactionType === "Transfer") {
    //   transactionData.toAccount = updatedData.toAccount;
    // }
    

    protectedRoute
      .patch(`/transactions/updateTransaction`, transactionData)
      .then((response) => {
        setLoading(false);
        if (response.status === 200) {
          console.log("Transaction updated successfully:", response.data);
          setIsModalOpen(false);
          setLastUpdatedTransaction(transactionData.id)
          navigate("/dashboard/transactions");
        } else if(response.status === 204){
          console.log("no changes were made")
          setIsModalOpen(false);
          navigate("/dashboard/transactions");
        } else {
          console.error("Failed to update transaction");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating transaction:", error);
      });
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="modal-container bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
        <h3 className="text-xl font-semibold text-white mb-4">Edit Transaction</h3>

        <div className="mb-4">
          <label className="block text-gray-300 font-medium">Description:</label>
          <input
            type="text"
            name="description"
            value={updatedData.description}
            onChange={handleEditChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

        {transacType !== "transfer" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-300 font-medium">Category:</label>
              <select
                name="category"
                value={updatedData.category}
                onChange={handleEditChange}
                className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categoryWasDeleted(updatedData.category)}
                {categories.length > 0 ? (
                  categories.map((categoryItem) => (
                    <option key={categoryItem.id} value={categoryItem.id}>
                      {categoryItem.name}
                    </option>
                  ))
                ) : (
                  <option value="">No categories available</option>
                )}
              </select>
            </div>
          </>
        )}

        <div className="mb-4">
          <label className="block text-gray-300 font-medium">Account:</label>
          <select
            name="account"
            value={updatedData.account || ''}
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

        {/* {transactionType === "Transfer" && (
          <div className="mb-4">
            <label className="block text-gray-300 font-medium">To Account:</label>
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
        )} */}

        <div className="mb-4">
          <label className="block text-gray-300 font-medium">Date:</label>
          <input
            type="date"
            name="date"
            value={updatedData.date}
            onChange={handleEditChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* { <div className="mb-4">
          <label className="block text-gray-300 font-medium">Account:</label>
          <select
            name="transactionType"
            value={updatedData.transactionType}
            onChange={handleEditChange}
            className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {transacTypes.length > 0 ? (
              transacTypes.map((transacType, index) => (
                <option key={index} onClick={()=>setTransacType(transacType.value)} value={transacType.value}>
                  {transacType.name}
                </option>
              ))
            ) : (
              <option value="">No types available</option>
            )}
          </select>
        </div> } */}

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
  );
};

export default EditTransaction;
