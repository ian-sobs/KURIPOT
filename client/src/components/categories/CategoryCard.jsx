import React, { useState } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";

export default function CategoryCard({ id, name, setCategories }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [affectedAccounts, setAffectedAccounts] = useState([]); // New state to store affected accounts

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(name);
  };

  const handleSaveClick = async () => {
    const updatedCategory = { id, name: editedName };

    try {
      await protectedRoute.patch("/categories/updateCategory", updatedCategory);

      // Update the category list locally
      setCategories((prevCategories) =>
        prevCategories.map((cat) => (cat.id === id ? updatedCategory : cat))
      );
      setIsEditing(false);
    //   setSuccess("Category updated successfully!");
      setError(null);
    } catch (error) {
      console.error("Failed to update category:", error);
      setError("Failed to update category.");
      setSuccess(false);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await protectedRoute.delete("/categories/deleteCategory", {
        data: { id }, // Send id directly
      });

      if (result.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat.id !== id)
        );
        setSuccess(result.data.message); // Display success message
        setAffectedAccounts(result.data.affectedAccounts || []); // Save affected accounts for display
        setError(null);
      } else {
        setError(result.data.message);
      }
    } catch (error) {
      console.error("Failed to delete category:", error);
      setError("Error deleting category.");
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

      {success && (
        <div className="text-green-500 text-center text-xs mb-2 w-full">
          {success}
        </div>
      )}

      {/* {affectedAccounts.length > 0 && (
        <div className="text-gray-300 text-sm mt-2">
          <h4>Affected Accounts:</h4>
          <ul>
            {affectedAccounts.map((account, index) => (
              <li key={index}>
                Account ID: {account.account_id}, Type: {account.type}, Amount:{" "}
                {account.amount}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </li>
  );
}
