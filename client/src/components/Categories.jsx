import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const Categories = () => {
  // Dummy category data
  const category = [
    { name: "Health" },
    { name: "Education" },
    { name: "Emergency Fund" },
    { name: "Entertainment" },
    { name: "Shopping" },
    { name: "Games" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="page-with-taskbar flex-1 md:ml-[20%] lg:ml-[16.666%]">
        <PageHeader
          title="Categories"
          subtitle="Manage Your Personal Information and Preferences"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead p-5 pl-5 pr-5">
          <div className="p-5">
            <ul>
              {category.map((category, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 mb-2 border-b border-gray transition duration-200"
                >
                  <span className="text-white font-semibold">{category.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
