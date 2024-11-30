import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const AddTransaction = () => {
    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="p-0 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader 
                title="Add Transaction"
                subtitle="Manage Your Cash Flow with Ease — Add a Transaction"/>
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800">Test Add Trans</h1>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
