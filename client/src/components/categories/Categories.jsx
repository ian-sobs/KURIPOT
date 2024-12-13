import React, { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";
import CategoryCard from "./CategoryCard"; // Import the CategoryCard component
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";
import AddCategory from "./AddCategory";

const Categories = () => {
  const [category, setCategory] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  // Function to handle the addition of a new category
  const handleAddCategory = (newCategory) => {
    setCategory((prevCategories) => [...prevCategories, newCategory]); // Add the new category to the state
  };

  useEffect(() => {
    protectedRoute
      .get("/categories/getCategories")
      .then((response) => {
        console.log(response); // Log the response to check its structure
        return response; // Ensure the response is passed to the next .then()
      })
      .then((response) => {
        const { data } = response;
        console.log("Fetched categories:", data); // Log the response data
        if (Array.isArray(data)) {
          setCategory(data); // Set the category directly from the array
        } else {
          setCategory([]); // Set as empty array if no categories field is present
        }
        setIsLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setIsLoading(false); // Stop loading in case of error
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="page-with-taskbar flex-1 md:ml-[20%] lg:ml-[16.666%]">
        <PageHeader
          title="Categories"
          subtitle="Browse and manage your categories"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead p-10 pl-5 pr-5">
          <div className="bg-bg-[#010827] p-5 rounded-badge shadow-lg">
            {isLoading ? (
              <p className="text-white">Loading categories...</p> // Show loading state
            ) : category.length > 0 ? (
              <ul>
                {category.map((item) => (
                  <CategoryCard
                    key={item.id} // Provide key for each list item
                    {...item} // Spread all properties of the item to CategoryCard
                  />
                ))}
              </ul>
            ) : (
              <p className="text-white">No categories found.</p> // Show fallback message
            )}
          </div>
          {/* Pass handleAddCategory as a prop to AddCategory */}
          <AddCategory onAddCategory={handleAddCategory} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
