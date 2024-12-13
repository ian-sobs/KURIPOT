import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import LineChart from "../components/LineChart";
import PolarAreaChart from "../components/PolarAreaChart";

const Reports = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] overflow-auto page-with-taskbar">
        <PageHeader
          title="Reports"
          subtitle="Manage Your Personal Information and Preferences"
          onBackClick={() => window.history.back()}
        />

        <div className="page-with-navhead flex flex-col space-y-8">
          {" "}
          {/* Added flex-col and space-y-8 */}
          <div className="pl-5 m-5 mb-0 text-xl font-medium">Expense Breakdown</div>
          <div className="flex flex-col items-center justify-center space-y-8 ">
            <PolarAreaChart />
          </div>
          <div className="pl-5 m-5 mb-0 text-xl font-medium">Monthly Analytics</div>
          <div className="flex flex-col items-center justify-center space-y-8">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
