import { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";

export default function EditBudget({
  budgetId,
  currentBudgetLimit,
  currentCategories,
  setSuccess,
  setError,
  setIsEditing,
  setBudgets,
  userId, // Assuming you have userId available from context or prop
}) {
  const [editedAmount, setEditedAmount] = useState(currentBudgetLimit);
  const [editedDate, setEditedDate] = useState(""); // To handle date input
  const [editedType, setEditedType] = useState("expense"); // Set the type of budget (default to "expense")

  // Fetch categories when component mounts or budgetId changes
  useEffect(() => {
    protectedRoute
      .get("budgets/getBudgetCategories", {
        params: {
          budgetId: budgetId,
          type: editedType, // Fetch categories for the type of budget (expense or income)
        },
      })
      .then((response) => {
        const { data } = response;
        const { Categories } = data;
        // Set the categories if needed (or manage the categories in some other way)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [budgetId, editedType]); // Also depend on the type when fetching categories

  const handleSaveClick = async () => {
    // Format the editedAmount as a float with 2 decimals
    const formattedAmount = parseFloat(editedAmount).toFixed(2);

    // Prepare the updatedBudget object to be sent in the request
    const updatedBudget = {
      usrId: userId, // Include the user ID here
      id: budgetId,  // Pass the budget ID
      budgetLimit: formattedAmount,
      date: editedDate ? editedDate : null, // Include date if it's edited, otherwise null
      type: editedType, // Include the budget type
    };

    try {
      // Update the budget
      const budgetResponse = await protectedRoute.patch("/budgets/updateBudget", updatedBudget);

      if (budgetResponse.status === 200) {
        setSuccess("Budget updated successfully!");
        setError(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to update budget:", error);
      setError("Failed to update budget.");
      setSuccess(false);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Close the edit form
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <input
        type="number"
        value={editedAmount}
        onChange={(e) => setEditedAmount(e.target.value)}
        className="p-2 text-white bg-[#9747FF]/10 rounded-badge focus:outline-none caret-[#9747FF]"
        placeholder="Amount"
      />
      {/* Input for editing date */}
      <input
        type="date"
        value={editedDate}
        onChange={(e) => setEditedDate(e.target.value)}
        className="p-2 text-white bg-[#9747FF]/10 rounded-badge focus:outline-none caret-[#9747FF]"
      />
      {/* Select input for editing the type (expense or income) */}
      <select
        value={editedType}
        onChange={(e) => setEditedType(e.target.value)}
        className="p-2 text-white bg-[#9747FF]/10 rounded-badge focus:outline-none caret-[#9747FF]"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <div className="flex gap-2 items-center justify-center">
        <button
          onClick={handleSaveClick}
          className="text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <i className="bi bi-check-lg text-green-500"></i> Save
        </button>
        <button
          onClick={handleCancelClick}
          className="text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <i className="bi bi-x-lg text-red-500"></i> Cancel
        </button>
      </div>
    </div>
  );
}
