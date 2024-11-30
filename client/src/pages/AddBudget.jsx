import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const AddBudget = () => {
    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="p-0 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader 
                title="Add Budget"
                subtitle="Manage Your Expenses with Ease — Add a Budget"/>
                <div className="flex items-center justify-center h-screen">
                    <h1 className="text-2xl font-bold text-gray-800">Test Add budget</h1>
                </div>
            </div>
        </div>
    );
};

export default AddBudget;
