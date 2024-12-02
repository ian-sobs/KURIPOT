import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";

const Budgets = () => {
    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader
                    title="Budgets"
                    subtitle="Set a Budget and Stay on Track" 
                    onBackClick={() => window.history.back()}/>

                <div className="mt-[4rem] flex flex-col items-center justify-center text-center p-10">
                    <img
                        src="/images/budget-box.png"
                        alt=""
                        className="min-h-10"
                    />
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
