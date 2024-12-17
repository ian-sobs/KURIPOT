import React, { useState } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import LineChart from "../components/charts/LineChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import LineChartYear from "../components/charts/LineChartYear";

const Reports = () => {
  const [chartType, setChartType] = useState("monthly"); // Default to "monthly"

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] overflow-auto page-with-taskbar">
        <PageHeader
          title="Reports"
          subtitle="Manage Your Personal Information and Preferences"
          onBackClick={() => window.history.back()}
        />

        <div className="page-with-navhead flex flex-col justify-center items-center p-6 space-y-5">
          <DoughnutChart />

          {/* Dropdown for Monthly/Yearly Selection */}
          <div className="chart-selector-container mb-4">
            <label
              htmlFor="chart-type"
              className="block text-slate-300 text-sm mb-2"
            >
              How would you like to view your financial trends?
            </label>
            <select
              id="chart-type"
              value={chartType}
              onChange={handleChartTypeChange}
              className="w-full px-4 py-2 rounded-md bg-gray-950/75 text-gray-500 focus:outline-none focus:ring focus:ring-blue-600"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Conditional Rendering of Charts */}
          <div className="linechart-container w-full flex justify-center">
            {chartType === "monthly" ? <LineChart /> : <LineChartYear />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
