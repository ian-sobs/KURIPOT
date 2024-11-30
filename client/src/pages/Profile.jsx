import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const Profile = () => {
    return (
        <div className="flex flex-col h-screen">
            <PageHeader />
            <TaskBar />
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <h1 className="text-2xl font-bold text-gray-800">test Profile page</h1>
            </div>
        </div>
    );
};

export default Profile;
