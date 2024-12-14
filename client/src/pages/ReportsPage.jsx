import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import LineChart from "../components/charts/LineChart";
import DoughnutChart from "../components/charts/DoughnutChart";

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

        <div className="page-with-navhead flex flex-col p-6 space-y-5">
          <div className="doughnutchart-container">
            <DoughnutChart />
          </div>
          <div className="linechart-container">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
