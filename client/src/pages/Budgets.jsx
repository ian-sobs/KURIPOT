import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

const Budgets = () => {
    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] pt-[70px]">
                <PageHeader
                    title="Budgets"
                    subtitle="Set a Budget and Stay on Track" />

                <div className="flex flex-col items-center justify-center h-full text-center p-10">
                    <i className="fs-1 bi-inboxes-fill text-white text-7xl mb-4" />
                    <div className="text-white text-xl mb-2">
                        You currently have no budget.
                    </div>
                    <div className="text-gray-400 text-sm">
                        Input a budget and we'll help you manage your daily income and expenses.
                    </div>
                    <Link to="/dashboard/budgets/addBudget">
                        <button className="bg-[#9747FF] text-white py-2 px-10 rounded-lg mt-5 mb-5 hover:bg-[#7e3adf] transition-all">
                            Add a Budget
                        </button>
                    </Link>
                    <div className="text-gray-400 text-sm underline">
                        How to use a budget?
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budgets;
