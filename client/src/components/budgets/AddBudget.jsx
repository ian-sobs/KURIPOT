import React, { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";
import axios from "axios";

const AddBudget = ({ budgets, setBudgets }) => {
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([]); // Holds all available categories
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories with limits
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(""); // Total budget limit input
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Popup state
  const [isOpen, setIsOpen] = useState(false);
  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  useEffect(() => {
    // Fetch categories from backend
    protectedRoute
      .get("/categories/getCategories", {
        params: {
          isIncome: false,
        },
      })
      .then((response) => {
        const { data } = response; // Assume data is an array
        console.log("categories data", data);
        setCategories(data); // Set the available categories
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
    console.log("selectedCategories", selectedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the sum of category limits
    const categoryLimitsSum = selectedCategories.reduce(
      (sum, category) => sum + (parseFloat(category.categorylimit) || 0),
      0
    );

    // Validate that the category limits sum matches the total budget limit
    // if (categoryLimitsSum !== parseFloat(totalBudgetLimit)) {
    //   setError("The sum of category limits must match the total budget limit.");
    //   setSuccess(false);
    //   return;
    // }

    const budgetData = {
      date: date,
      categories: selectedCategories.filter(
        (category) => category.categoryId && category.categoryLimit
      ),
      budgetLimit: totalBudgetLimit, // Include the total budget limit in the data
      type: "expense",
    };
    console.log("budgetDate", budgetData);
    try {
      const response = await protectedRoute.post(
        "/budgets/makeBudget",
        budgetData
      );
      const { data } = response;
      const { budget, budgetCategories } = data;
      if (response.status === 201) {
        const { id, date, budgetLimit, type } = budget;
        setSuccess(true);
        setError(null);
        setSelectedCategories([]); // Reset the form
        setTotalBudgetLimit("");
        setDate("");
        console.log("newBudget ", budget);

        setBudgets([...budgets, { id, date, budgetLimit, type }]);
      } else {
        throw new Error("Budget creation failed!");
      }
    } catch (err) {
      setError("Budget creation failed!");
      setSuccess(false);
    }
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={openPopup}
        className="bg-[#9747FF] text-white py-2 px-10 rounded-lg mt-4 hover:bg-[#7e3adf] transition-all"
      >
        Add a Budget
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-bold text-slate-300">
                ADD A NEW BUDGET
              </h2>
              <button
                onClick={closePopup}
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
                  Budget added successfully!
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

                {/* Selected Categories with Limits */}
                <div>
                  <label className="block text-slate-300 mb-1">
                    Budget Categories
                  </label>
                  {selectedCategories.map((category, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <select
                        value={category.name}
                        onChange={(e) => {
                          console.log(
                            "e.target ",
                            e.target.selectedOptions[0].getAttribute(
                              "data-cat_id"
                            )
                          );
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
                    Add Budget
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBudget;
