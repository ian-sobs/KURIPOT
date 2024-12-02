import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const ViewAccounts = () => {
    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
                <PageHeader
                    title="My Accounts"
                    subtitle="Manage Your Personal Information and Preferences"
                    onBackClick={() => window.history.back()} />
                <div className="mt-[4rem] flex items-center justify-center">
                    <h1 className="text-2xl font-bold text-white">Test View My Accounts</h1>

                </div>
                <div>
                    <p>this page enables user to view accounts and an option to add an account </p>
                </div>
            </div>
        </div>
    );
};



export default ViewAccounts;