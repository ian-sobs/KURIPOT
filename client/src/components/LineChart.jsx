import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const LineChart = () => {
  // Chart data
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ], // Months of the year
    datasets: [
      {
        data: [500, 700, 600, 800, 650, 900, 750, 1000, 850, 950, 1100, 1050], // Money spent per month
        borderColor: "#9747FF",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4, // Adds smooth curves to the line
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top", // Position of the legend
        labels: {
          color: "white", // Legend text color
        },
      },
      tooltip: {
        titleColor: "white", // Tooltip title color
        bodyColor: "white", // Tooltip body color
        footerColor: "white", // Tooltip footer color (if applicable)
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          color: "white", // X-axis title color
        },
        ticks: {
          color: "white", // X-axis tick color
        },
      },
      y: {
        title: {
          display: true,
          color: "white", // Y-axis title color
        },
        ticks: {
          color: "white", // Y-axis tick color
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-3xl items-center justify-start p-5">
      <div className="bg-gray-950/25 rounded-badge shadow-lg p-6">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className="flex flex-col min-h-screen">
<div className="w-full max-w-3xl mx-auto p-10">
  <div className="bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 text-white rounded-badge shadow-lg border-2 border-white border-opacity-20 p-6">
    <h2 className="text-center text-2xl font-bold mb-6">Line Chart</h2>
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        <Line data={data} options={options} />
      </div>
    </div>
  </div>
</div>
</div> */
}

export default LineChart;
