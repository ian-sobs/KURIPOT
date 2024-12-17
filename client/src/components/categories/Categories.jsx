import React, { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";
import CategoryCard from "./CategoryCard"; // Import the CategoryCard component
import TaskBar from "../TaskBar";
import PageHeader from "../PageHeader";
import AddCategory from "./AddCategory";

const Categories = () => {
  const [categories, setCategories] = useState([]); // State to hold categories
  const [isLoading, setIsLoading] = useState(true); // State for loading status

  // Function to handle the addition of a new category
  const handleAddCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await protectedRoute.get("/categories/getCategories");
        console.log("Fetched categories response:", response);

        // Check if the response contains an array of categories
        const fetchedCategories = response.data;
        if (Array.isArray(fetchedCategories)) {
          setCategories(fetchedCategories);
        } else {
          console.warn("Unexpected categories data structure:", fetchedCategories);
          setCategories([]); // Fallback to an empty array if the response isn't as expected
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false); // Stop loading after data fetch attempt
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <TaskBar />
      <div className="page-with-taskbar flex-1 md:ml-[20%] lg:ml-[16.666%]">
        <PageHeader
          title="Categories"
          subtitle="Browse and manage your categories"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead px-10 py-5">
          <div className="bg-bg-[#010827] p-5 rounded-badge shadow-lg">
            {isLoading ? (
              <p className="text-white">Loading categories...</p>
            ) : categories.length > 0 ? (
              <ul>
                {categories.map((category) => (
                  <CategoryCard
                    key={category.id} // Unique key for React's reconciliation
                    id={category.id}
                    name={category.name}
                    setCategories={setCategories} // Pass the setCategories function
                  />
                ))}
              </ul>
            ) : (
              <p className="text-white">No categories found.</p>
            )}
          </div>
          {/* Render AddCategory and pass handleAddCategory */}
          <AddCategory onAddCategory={handleAddCategory} />
        </div>
      </div>
    </div>
  );
};

export default Categories;
