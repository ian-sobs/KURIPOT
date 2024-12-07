import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const Transactions = () => {
  return (
    <div className="flex flex-col h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] page-with-taskbar">
        {/* Add a top margin equal to the height of the navbar */}
        <PageHeader
          title="Transactions"
          subtitle="View and Manage All Your Financial Activities"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white">Test Transactions</h1>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
