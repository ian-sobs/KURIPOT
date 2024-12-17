import React, { useState } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";

export default function AccountCard({ id, name, amount, setAccounts }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedAmount, setEditedAmount] = useState(amount);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedAmount(amount);
  };

  const handleSaveClick = async () => {
    const updatedAmount = parseFloat(editedAmount);

    if (isNaN(updatedAmount)) {
      setError("Invalid amount. Please enter a valid number.");
      setSuccess(false);
      return;
    }

    const updatedAccount = { id, name: editedName, amount: updatedAmount };

    try {
      await protectedRoute.patch("/accounts/updateAccount", updatedAccount);

      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) => (acc.id === id ? updatedAccount : acc))
      );
      setIsEditing(false);
      setSuccess("Account updated successfully!");
      setError(null);
    } catch (error) {
      console.error("Failed to update account:", error);
      setError("Failed to update account.");
      setSuccess(false);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await protectedRoute.delete("/accounts/deleteAccounts", {
        data: { idArr: [id] },
      });

      if (result.data.message.includes("Successfully deleted")) {
        setAccounts((prevAccounts) =>
          prevAccounts.filter((acc) => acc.id !== id)
        );
        setSuccess(result.data.message);
        setError(null);
      } else {
        setError(result.data.message);
        setSuccess(false);
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      setError("Error deleting account.");
      setSuccess(false);
    }
  };

  return (
    <li
      key={id}
      className="flex flex-col justify-between items-start bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 p-4 rounded-badge mb-2"
    >
      {isEditing ? (
        <div className="flex gap-2 items-center w-full">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="flex-1 rounded-badge p-2 text-white bg-[#9747FF]/10 focus:outline-none caret-[#9747FF]"
          />
          <input
            type="number"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
            className="w-28 rounded-badge p-2 text-white bg-[#9747FF]/10 focus:outline-none caret-[#9747FF]"
          />
          <button
            onClick={handleSaveClick}
            className="text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <i className="bi bi-check-lg text-green-500"></i>
          </button>
          <button
            onClick={handleCancelClick}
            className="text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <i className="bi bi-x-lg text-red-500"></i>
          </button>
        </div>
      ) : (
        <div className="flex justify-between w-full items-center">
          <span
            className="text-white font-semibold cursor-pointer"
            onClick={handleEditClick}
          >
            {name}
          </span>
          <span className="text-[#9747FF] font-bold flex items-center ml-auto">
            Php {amount}
          </span>
          <button
            onClick={handleDelete}
            className="text-white rounded flex items-center gap-2"
          >
            <i className="bi bi-x-lg text-red-500 pl-5"></i>
          </button>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center text-xs mb-2 w-full">
          {error}
        </div>
      )}
      {/* {success && (
        <div className="text-green-500 text-center text-xs mb-2 w-full">
          {success}
        </div>
      )} */}
    </li>
  );
}
