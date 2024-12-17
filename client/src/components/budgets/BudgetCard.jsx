import { protectedRoute } from "../../apiClient/axiosInstance";
import { useState, useEffect } from "react";

export default function BudgetCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState(props.budgetLimit);
  const [editedPurpose, setEditedPurpose] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    protectedRoute
      .get("budgets/getBudgetCategories", {
        params: {
          budgetId: props.id,
          type: "expense",
        },
      })
      .then((response) => {
        const { data } = response;
        const { Categories } = data;
        setCategories(Categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.id]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedPurpose(props.purpose || ""); // Set the initial purpose for editing
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedAmount(props.budgetLimit); // Reset amount to original
    setEditedPurpose(props.purpose || ""); // Reset purpose to original
  };

  const handleSaveClick = async () => {
    const updatedBudget = {
      id: props.id,
      budgetLimit: editedAmount,
      purpose: editedPurpose,
    };

    try {
      await protectedRoute.patch("/budgets/updateBudget", updatedBudget);
      setSuccess("Budget updated successfully!");
      setError(null);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update budget:", error);
      setError("Failed to update budget.");
      setSuccess(false);
    }
  };

  const handleDelete = async () => {
    try {
      await protectedRoute.delete("/budgets/deleteBudget", {
        data: { id: props.id }, // Pass the budget ID for deletion
      });
      setSuccess("Budget deleted successfully!");
      setError(null);
      props.setBudgets((prevBudgets) =>
        prevBudgets.filter((budget) => budget.id !== props.id)
      ); // Remove deleted budget from the state
    } catch (error) {
      console.error("Failed to delete budget:", error);
      setError("Failed to delete budget.");
      setSuccess(false);
    }
  };

  return (
    <div className="relative flex justify-between items-center bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 p-6 rounded-badge mb-2">
      {/* Conditional rendering for Delete Button */}
      {!isEditing && (
        <div className="absolute top-7 right-5 flex gap-5">
          <button
            onClick={handleEditClick}
            className="text-white rounded flex items-center gap-2"
          >
            <i className="bi bi-pencil text-slate-500"></i>
          </button>

          <button
            onClick={handleDelete}
            className="text-white rounded flex items-center gap-2"
          >
            <i className="bi bi-x-lg text-red-500"></i>
          </button>
        </div>
      )}

      <div className="flex flex-col w-full">
        {isEditing ? (
          // Editing UI
          <div className="flex flex-col w-full gap-4">
            <input
              type="number"
              value={editedAmount}
              onChange={(e) => setEditedAmount(e.target.value)}
              className="p-2 text-white bg-[#9747FF]/10 rounded-badge focus:outline-none caret-[#9747FF]"
              placeholder="Amount"
            />
            <textarea
              value={editedPurpose}
              onChange={(e) => setEditedPurpose(e.target.value)}
              className="p-2 text-white bg-[#9747FF]/10 rounded-badge focus:outline-none caret-[#9747FF]"
              placeholder="Purpose"
            />
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
        ) : (
          // View mode UI
          <div className="flex flex-col w-full">
            <div className="text-[#9747FF] text-2xl font-bold mb-2">
              Php {props.budgetLimit}
            </div>

            <div className="text-sm text-gray-400 mb-2">
              Purpose:{" "}
              {categories && categories.length > 0 ? (
                <ul className="list-disc pl-5">
                  {categories.map((category, idx) => (
                    <li key={idx} className="text-white">
                      {category.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No categories assigned.</span>
              )}
            </div>

            <div className="text-xs text-gray-400/70 mb-4">
              <span>Created on: {props.date}</span>
              <br />
              <span>Type: {props.type}</span>
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
}
