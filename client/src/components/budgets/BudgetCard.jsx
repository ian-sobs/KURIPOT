import { protectedRoute } from "../../apiClient/axiosInstance";
import { useState, useEffect } from "react";

export default function BudgetCard(props) {
  const [categories, setCategories] = useState([]);
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

  return (
    <li
      key={props.id}
      className="flex justify-between items-center bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 p-6 rounded-badge mb-2"
    >
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
                  {/* Php {category.BudgetCategory.categoryLimit} */}
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
    </li>
  );
}
