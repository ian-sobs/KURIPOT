import React, { useState, useEffect } from "react";
import formatNumWithCommas from "../../utility/formatNumWithCommas";
import { protectedRoute } from "../../apiClient/axiosInstance";
import EditTransaction from "./EditTransaction";// Import the modal component

const TransactionSingle = ({
  category,
  account,
  categoryId,
  accountId,
  description,
  amount,
  transactionType,
  transactionId,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    description,
    amount,
    account: accountId,
    category: categoryId,
    transactionId,
    date: "",
    transactionType
  });

  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [transacType, setTransacType] = useState(transactionType)

  // Fetch account data
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

  // Fetch categories based on transaction type (income or expense)
  useEffect(() => {
    if (isModalOpen) {
      setLoading(true);
      const isIncome = transacType === "income"; // Determine category type
      protectedRoute
        .get("/categories/getCategories", {
          params: { isIncome },
        })
        .then((response) => {
          const { data } = response;
          setCategories(data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          setError("Failed to fetch categories.");
          setLoading(false);
        });
    }
  }, [isModalOpen, transacType]);

  // Handle delete transaction
  const handleDelete = () => {
    protectedRoute
      .delete("/transactions/deleteTransaction", { data: { id: transactionId } })
      .then(() => {
        onDelete(transactionId); // Notify the parent component
      })
      .catch((error) => {
        console.error("Failed to delete transaction", error);
      });
  };

  // Determine color based on income or expense type
  const getAmountClass = () => {
    if (transactionType === "income") {
      return "text-green-500";
    } else if (transactionType === "expense") {
      return "text-red-500";
    } else {
      return "text-gray-500";
    }
  };

  // Open modal and fetch the existing transaction data for editing
  const openEditModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="singletrans-container flex justify-between items-center p-2 pl-8">
      <div className="singletrans-left flex flex-row">
        <div className="category-container flex items-center justify-center flex-col w-0">
          <i className="bi bi-car-front-fill"></i>
        </div>
        <div className="singletrans-text text-sm flex flex-col ml-8">
          <h3 className="font-medium">{description}</h3>
          <h3 className="from-account text-xs text-gray-300 font-extralight">
            Account: {account}
          </h3>
          <h3 className="from-account text-xs text-gray-300 font-extralight">
            Category: {category}
          </h3>
        </div>
      </div>

      <div className={`singletrans-right ${getAmountClass()}`}>₱{formatNumWithCommas(amount)}</div>

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

      {/* Render Modal */}
      {isModalOpen && (
        <EditTransaction
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalData={modalData}
          setModalData={setModalData}
          setLoading={setLoading} 
          accounts={accounts}
          categories={categories}
          error={error}
          onClose={closeModal}
          transacType={transacType}
          setTransacType={setTransacType}
        />
      )}
    </div>
  );
};

export default TransactionSingle;
