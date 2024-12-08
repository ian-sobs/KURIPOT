import React, { useState } from "react";

const HowToBudget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div className="relative">
    
      <button
        onClick={openPopup}
        className="text-gray-400 underline hover:text-blue-700 transition"
      >
        How to use a budget?
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
    
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-bold text-slate-300">
                How to Use the Budget
              </h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-slate-300">
              <p>
                1. Set Your Budget: Determine the total amount you want to
                allocate for specific categories.
              </p>
              <p>
                2. Categorize Expenses: Divide your budget into categories
                like food, transportation, entertainment, etc.
              </p>
              <p>
                3. Track Spending: Regularly update your expenses to ensure
                you stay within your set limits.
              </p>
              <p>
                4. Adjust as Needed: Review your budget periodically and
                make adjustments based on actual spending.
              </p>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={closePopup}
                className="px-6 py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HowToBudget;
