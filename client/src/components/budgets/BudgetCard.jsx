import { protectedRoute } from "../../apiClient/axiosInstance";
import { useState, useEffect } from "react";
import EditBudget from "./EditBudget";

export default function BudgetCard(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAmount, setEditedAmount] = useState(props.budgetLimit);
  const [categories, setCategories] = useState([]);
  const [editedCategories, setEditedCategories] = useState([]);
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
        setEditedCategories(Categories);  // Set initial categories to editable state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedAmount(props.budgetLimit); // Reset amount to original
    setEditedCategories(categories); // Reset categories to original
  };

  const handleCategoryChange = (categoryId, newCategoryName) => {
    setEditedCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId ? { ...category, name: newCategoryName } : category
      )
    );
  };

  const handleSaveClick = async () => {
    const updatedBudget = {
      id: props.id,
      budgetLimit: editedAmount,
    };

    const updatedCategories = editedCategories.map((category) => ({
      id: category.id,
      categoryLimit: category.categoryLimit, // Assuming you can update category limits here
    }));

    try {
      // Update the budget itself
      await protectedRoute.patch("/budgets/updateBudget", updatedBudget);

      // Update the categories (using the provided updateBudgetCategory API)
      await Promise.all(
        updatedCategories.map(async (category) => {
          const updateData = {
            id: category.id,
            categoryId: category.id,
            categoryLimit: category.categoryLimit,
          };

          await protectedRoute.patch("/budgets/updateBudgetCategory", updateData);
        })
      );

      setSuccess("Budget and categories updated successfully!");
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
          {/* <button
            onClick={handleEditClick}
            className="text-white rounded flex items-center gap-2"
          >
            <i className="bi bi-pencil text-slate-500"></i>
          </button> */}

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
        <EditBudget
          budgetId={props.id}
          currentBudgetLimit={props.budgetLimit}
          currentCategories={categories}
          setSuccess={setSuccess}
          setError={setError}
          setIsEditing={setIsEditing}
          setBudgets={props.setBudgets}
        />
      ) : (
          // View mode UI
          <div className="flex flex-col w-full">
            <div className="text-[#9747FF] text-2xl font-bold mb-2">
              Php {props.budgetLimit}
            </div>

            <div className="text-sm text-gray-400 mb-2">
              Categories:{" "}
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
