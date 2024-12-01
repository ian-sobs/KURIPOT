import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const AddTransaction = () => {
    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader 
                    title="Add Transaction"
                    subtitle="Record and Categorize Your Income and Expenses"/>
                <div className="mt-[4rem] flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-white">Test Add transactionssssssszzzz</h1>
                </div>
            </div>
        </div>
    );
};

export default AddTransaction;
