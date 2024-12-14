import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut instead of PolarArea
import {
  Chart as ChartJS,
  ArcElement, // Required for Doughnut charts
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  // State to track the index of the current period
  const [periodIndex, setPeriodIndex] = useState(0);

  // Array of periods and their respective data
  const periods = [
    { label: "Weekly", data: [20, 30, 20, 25, 5] },
    { label: "Monthly", data: [25, 25, 25, 15, 10] },
    // You can add more periods here as needed
  ];

  // Weekly and Monthly data
  const chartData = {
    labels: ["Food", "Shopping", "Entertainment", "Bills", "Others"],
    datasets: [
      {
        data: periods[periodIndex].data,
        backgroundColor: [
          "#AF9ED2",
          "#1b203e",
          "#CECED9",
          "#253462",
          "#030a29",
        ],
        hoverBackgroundColor: [
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
        ],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "white",
          usePointStyle: true,
          pointStyle: "circle",
          padding: 10,
        },
      },
      tooltip: {
        titleColor: "white",
        bodyColor: "white",
        footerColor: "white",
      },
    },
  };

  // Function to cycle through the periods
  const handleCycle = (direction) => {
    setPeriodIndex((prevIndex) => {
      const newIndex =
        (prevIndex + direction + periods.length) % periods.length;
      return newIndex;
    });
  };

  return (
    <div className="overflow-x-auto relative w-full max-w-3xl ">
      <div className="rounded-badge shadow-lg bg-gradient-to-r from-[#180655]/10 via-[#15172E]/10 to-[#180655]/10 p-4 flex flex-col justify-center">
        <div className="doughnut-top flex flex-row justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Expense Breakdown</h2>
          <div className="doughnut-switch flex items-center space-x-2">
            <button onClick={() => handleCycle(-1)}>
              <i className="bi bi-chevron-left text-sm"></i>
            </button>
            <h3 className="text-sm">{periods[periodIndex].label}</h3>
            <button onClick={() => handleCycle(1)}>
              <i className="bi bi-chevron-right text-sm"></i>
            </button>
          </div>
        </div>

        {/* Chart container with padding for the absolute positioned period */}
        <div className="doughnut-container w-full">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
