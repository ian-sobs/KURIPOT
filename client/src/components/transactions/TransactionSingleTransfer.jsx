import React, { useState, useEffect } from "react";
import formatNumWithCommas from "../../utility/formatNumWithCommas";
import { protectedRoute } from "../../apiClient/axiosInstance";
import EditTransferTransaction from "./EditTransferTransaction";

const TransactionSingleTransfer = ({
  fromAccount,
  toAccount,
  fromAccountId,
  toAccountId,
  description,
  amount,
  transactionId,
  date, // Add this line
  onDelete,
  setLastUpdatedTransaction,
  lastUpdatedTransaction
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    fromAccount,
    toAccount,
    description,
    amount,
    date, // Include date here
  });

  const openEditModal = () => {
    setModalData({
      fromAccount,
      fromAccountId,
      toAccount,
      toAccountId,
      description,
      amount,
      date, // Pass date here
      transactionId
    });
    setIsModalOpen(true);
  };

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]); // Preserved for future use
  const [error, setError] = useState("");

  // Delete transaction handler
  const handleDelete = () => {
    protectedRoute
      .delete("/transactions/deleteTransaction", {
        data: { id: transactionId },
      })
      .then(() => {
        onDelete(transactionId); // Notify parent component
      })
      .catch((error) => {
        console.error("Failed to delete transaction:", error);
      });
  };

  // Close edit modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch accounts when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setLoading(true);
      protectedRoute
        .get("/accounts/getAccounts")
        .then((response) => {
          const { data } = response;
          setAccounts(data.accounts || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching accounts:", error);
          setError("Failed to fetch accounts.");
          setLoading(false);
        });
    }
  }, [isModalOpen]);

  return (
    <div className="singletrans-container flex justify-between items-center p-2 pl-8">
      <div className="singletrans-left flex flex-row">
        <div className="category-container flex items-center justify-center flex-col w-0">
          <i className="bi bi-car-front-fill"></i>
        </div>
        <div className="singletrans-text text-sm flex flex-col ml-8">
          <h3 className="font-medium">{description}</h3>
          <h3 className="text-xs text-gray-300 font-extralight">
            From account: {fromAccount}
          </h3>
          <h3 className="text-xs text-gray-300 font-extralight">
            To account: {toAccount}
          </h3>
        </div>
      </div>
      <div className="singletrans-right text-gray-500">
        ₱{formatNumWithCommas(amount)}
      </div>
      <button
        className="edit-button text-blue-500 hover:text-blue-700"
        onClick={openEditModal}
      >
        <i className="bi bi-pencil pl-5"></i>
      </button>
      <button
        className="delete-button text-red-500/50 hover:text-red-700"
        onClick={handleDelete}
      >
        <i className="bi bi-trash pl-5"></i>
      </button>
      {isModalOpen && (
        <EditTransferTransaction
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalData={modalData}
          setModalData={setModalData}
          setLoading={setLoading}
          accounts={accounts}
          categories={categories}
          error={error}
          onClose={closeModal}
          setLastUpdatedTransaction = {setLastUpdatedTransaction}
          lastUpdatedTransaction = {lastUpdatedTransaction}
        />
      )}
    </div>
  );
};

export default TransactionSingleTransfer;
