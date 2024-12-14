import React, { useState } from "react";
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
  const [selectedYear, setSelectedYear] = useState("2024");

  const data2024 = [
    500, 200, 400, 800, 650, 900, 750, 1000, 850, 950, 1100, 1050,
  ];
  const data2023 = [
    450, 650, 550, 750, 600, 1050, 300, 950, 800, 900, 1050, 1000,
  ];

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
    ],
    datasets: [
      {
        label: `${selectedYear} Monthly Expenses`, // Add label dynamically
        data: selectedYear === "2024" ? data2024 : data2023,
        borderColor: "#9747FF",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    devicePixelRatio: window.devicePixelRatio > 1 ? window.devicePixelRatio : 1,
    maintainAspectRatio: false, // Disable aspect ratio constraints
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        titleColor: "white",
        bodyColor: "white",
        footerColor: "white",
      },
      title: {
        display: true,
        text: `Data for ${selectedYear}`,
        color: "white",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          color: "white",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        title: {
          display: true,
          color: "white",
        },
        ticks: {
          color: "white",
        },
        beginAtZero: true,
      },
    },
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="w-full max-w-3xl items-center justify-start">
      <div className="rounded-badge shadow-lg bg-gradient-to-r from-[#180655]/10 via-[#15172E]/10 to-[#180655]/10 p-4">
        <div className="line-top flex flex-row justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Your Trends</h2>
          <select
            className="select select-ghost w-full max-w-20 text-white rounded-md p-2"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          {/* Responsive chart container */}
          <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChart;
