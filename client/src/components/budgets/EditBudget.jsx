import React, { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";

const EditBudget = ({ budget, setBudgets, closeModal }) => {
  const [date, setDate] = useState(budget.date);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    budget.categories
  );
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(budget.budgetLimit);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    protectedRoute
      .get("/categories/getCategories", {
        params: {
          isIncome: false,
        },
      })
      .then((response) => {
        const { data } = response;
        setCategories(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddCategory = () => {
    setSelectedCategories((prev) => [
      ...prev,
      { name: "", categoryId: "", categoryLimit: "" },
    ]);
  };

  const handleRemoveCategory = (index) => {
    setSelectedCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (index, field, value) => {
    setSelectedCategories((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgetData = {
      id: budget.id,
      date: date,
      categories: selectedCategories.filter(
        (category) => category.categoryId && category.categoryLimit
      ),
      budgetLimit: totalBudgetLimit,
      type: "expense",
    };

    try {
      const response = await protectedRoute.put(
        "/budgets/updateBudget",
        budgetData
      );
      if (response.status === 200) {
        setSuccess(true);
        setError(null);
        setBudgets((prev) =>
          prev.map((b) => (b.id === budget.id ? budgetData : b))
        );
        closeModal();
      } else {
        throw new Error("Budget update failed!");
      }
    } catch (err) {
      setError("Budget update failed!");
      setSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold text-slate-300">EDIT BUDGET</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-slate-300"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 text-slate-300">
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-center mb-4">
              Budget updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-slate-300 mb-1">
                Month and Year
              </label>
              <input
                type="month"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-2 pr-5 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="totalBudgetLimit"
                className="block text-slate-300 mb-1"
              >
                Total Budget Limit
              </label>
              <input
                type="number"
                id="totalBudgetLimit"
                value={totalBudgetLimit}
                onChange={(e) => setTotalBudgetLimit(e.target.value)}
                required
                className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">
                Budget Categories
              </label>
              {selectedCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <select
                    value={category.name}
                    onChange={(e) => {
                      handleCategoryChange(
                        index,
                        "categoryId",
                        parseInt(
                          e.target.selectedOptions[0].getAttribute(
                            "data-cat_id"
                          ),
                          10
                        )
                      );
                      handleCategoryChange(index, "name", e.target.value);
                    }}
                    required
                    className="flex-1 px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring focus:ring-indigo-100"
                  >
                    <option value="">Select a Category</option>
                    {categories.map((cat, i) => (
                      <option key={i} value={cat.name} data-cat_id={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder="Limit"
                    value={category.categoryLimit}
                    onChange={(e) =>
                      handleCategoryChange(
                        index,
                        "categoryLimit",
                        e.target.value
                      )
                    }
                    required
                    className="w-24 p-2 bg-[#C6D9EA]/20 text-white rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddCategory}
                className="mt-2 text-indigo-400 hover:underline"
              >
                + Add Another Category
              </button>
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="px-10 py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
              >
                Update Budget
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBudget;
