import React, { useState } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";

const AddCategory = ({ onAddCategory, userId }) => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState(""); // Income or Expense
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation check for empty category name or type
    if (!categoryName || !categoryType) {
      setError("Both Category Name and Category Type are required.");
      return;
    }

    // Convert categoryType to 1 or 0 for the backend
    const isIncome = categoryType === "Income" ? 1 : 0; // 1 for Income, 0 for Expense

    const categoryData = {
      name: categoryName,
      isIncome: isIncome, // Send as 1 or 0
      user_id: userId, // Add user_id for the backend
    };

    // Log the data to be sent
    console.log("Data being sent to the server:", categoryData);

    try {
      const response = await protectedRoute.post("/categories/makeCategory", categoryData);
      const { data } = response;

      // Log the response data from the server
      console.log("Response from the server:", data);

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        setCategoryName("");
        setCategoryType(""); // Reset category type on success

        onAddCategory(data); // Pass the new category to parent
      } else {
        setError("Unexpected response from the server. Please try again later.");
        setSuccess(false);
      }
    } catch (err) {
      if (err.response) {
        // Server error (like a 500)
        setError(err.response.data.message || "Server error occurred. Please try again later.");
      } else if (err.request) {
        // Network error (no response from server)
        setError("Network error. Please check your internet connection and try again.");
      } else {
        // Other errors (like invalid data)
        setError("An error occurred. Please try again.");
      }
      setSuccess(false);
      console.error("Error during request:", err); // Log the error
    }
  };

  return (
    <div>
      <div className="md:ml-[20%] lg:ml-[16.666%]">
        <div className="p-5 pb-0 flex justify-end">
          <button
            onClick={openPopup}
            className="bg-[#9747FF] text-white w-20 h-10 rounded-lg flex items-center justify-center hover:bg-[#7e3adf] transition-all"
          >
            <i className="bi-plus text-white text-xl"></i>
            <div className="p-2">New</div>
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-lg font-bold text-slate-300">
                  ADD A NEW CATEGORY
                </h2>
                <button
                  onClick={closePopup}
                  className="text-gray-500 hover:text-slate-300"
                >
                  ✕
                </button>
              </div>

              <div className="text-white space-y-4">
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                {success && <div className="text-green-500 text-center mb-4">Category added successfully!</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="categoryName" className="block text-white font-bold">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="categoryName"
                      placeholder="Enter category name"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                      className="w-full p-2 mt-2 bg-[#C6D9EA]/20 text-white rounded-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="income"
                        name="categoryType"
                        value="Income"
                        checked={categoryType === "Income"}
                        onChange={() => setCategoryType("Income")}
                        className="text-white"
                      />
                      <label htmlFor="income" className="ml-2 text-white">Income</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="expense"
                        name="categoryType"
                        value="Expense"
                        checked={categoryType === "Expense"}
                        onChange={() => setCategoryType("Expense")}
                        className="text-white"
                      />
                      <label htmlFor="expense" className="ml-2 text-white">Expense</label>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <button type="submit" className="px-10 py-2 bg-[#9747FF] text-white rounded-md">
                      Add Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
