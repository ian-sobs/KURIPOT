import { protectedRoute } from "../../apiClient/axiosInstance";
import { useState, useEffect } from "react";

export default function BudgetCard(props) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBudgetLimit, setEditedBudgetLimit] = useState(props.budgetLimit);
  const [editedType, setEditedType] = useState(props.type);

  useEffect(() => {
    protectedRoute
      .get("budgets/getBudgetCategories", {
        params: {
          budgetId: props.id,
          type: "expense",
          // month: new Date(props.date).getMonth() + 1,
          // year: new Date(props.date).getFullYear(),
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        const { Categories } = data;
        setCategories(Categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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

  const handleEdit = async () => {
    try {
      const updatedData = {
        id: props.id,
        budgetLimit: props.budgetLimit, // Modify as needed for editing
        type: props.type, // Example: Change type if needed
      };

      await protectedRoute.put("/budgets/updateBudget", updatedData);
      setSuccess("Budget updated successfully!");
      setError(null);
      // Optionally, trigger a re-fetch or update local state
      props.refreshBudgets(); // Assuming a refreshBudgets function is passed as a prop
    } catch (error) {
      console.error("Failed to update budget:", error);
      setError("Failed to update budget.");
      setSuccess(false);
    }
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        id: props.id,
        budgetLimit: editedBudgetLimit,
        type: editedType,
      };

      await protectedRoute.put("/budgets/updateBudget", updatedData);
      setSuccess("Budget updated successfully!");
      setError(null);
      setIsEditing(false);
      props.refreshBudgets(); // Refresh parent component if needed
    } catch (error) {
      console.error("Failed to update budget:", error);
      setError("Failed to update budget.");
      setSuccess(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedBudgetLimit(props.budgetLimit);
    setEditedType(props.type);
  };

  return (
    <li
      key={props.id}
      className="relative flex justify-between items-center bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 p-6 rounded-badge mb-2"
    >
      {isEditing ? (
        <div className="flex flex-col w-full">
          {/* Editable Fields */}
          <div className="mb-2">
            <label className="text-sm text-gray-400">Budget Limit:</label>
            <input
              type="number"
              className="bg-[#180655]/20 text-white rounded p-2 w-full rounded-lg"
              value={editedBudgetLimit}
              onChange={(e) => setEditedBudgetLimit(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label className="text-sm text-gray-400">Type:</label>
            <input
              type="text"
              className="bg-[#180655]/20  text-white rounded p-2 w-full rounded-lg"
              value={editedType}
              onChange={(e) => setEditedType(e.target.value)}
            />
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center w-full items-center gap-4 p-5">
            <button
              onClick={handleSave}
              className="text-white font-semibold cursor-pointer d-flex align-items-center gap-2 border-0 bg-transparent"
            >
              <i className="pr-2 bi bi-check2 text-green-500"></i>
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-white font-semibold cursor-pointer d-flex align-items-center gap-2 border-0 bg-transparent"
            >
              <i className="pl-5 pr-2 bi bi-x-lg text-red-500"></i>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-5 right-16 text-white rounded flex items-center gap-2"
          >
            <i className="bi bi-pencil-square text-slate-500"></i>
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="absolute top-5 right-5 text-white rounded flex items-center gap-2"
          >
            <i className="bi bi-x-lg text-red-500"></i>
          </button>

          <div className="flex flex-col w-full">
            {/* Highlight the budget limit */}
            <div className="text-[#9747FF] text-2xl font-bold mb-2">
              Php {props.budgetLimit}
            </div>

            {/* Categories section */}
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

            {/* Date and Budget Type */}
            <div className="text-xs text-gray-400/70">
              <span>Created on: {props.date}</span>
              <br />
              <span>Type: {props.type}</span>
            </div>
          </div>
        </>
      )}
    </li>
  );
}
