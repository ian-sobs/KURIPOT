import React from "react";
import { PolarArea } from "react-chartjs-2";  // Import PolarArea instead of Pie
import {
  Chart as ChartJS,
  RadialLinearScale,  // Only import once
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary components
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = () => {
  // Chart data
  const data = {
    labels: ["Food", "Shopping", "Entertainment", "Bills", "Others"], // Expense categories
    datasets: [
      {
        data: [20, 30, 20, 25, 5], // Percentage of expenses for each category
        backgroundColor: [
          "#AF9ED2", // Color for Food
          "#1b203e", // Color for Shopping
          "#CECED9", // Color for Entertainment
          "#253462", // Color for Bills
          "#030a29", // Color for Others
        ],
        hoverBackgroundColor: [
          "#000000", // Hover color for Food
          "#000000", // Hover color for Shopping
          "#000000", // Hover color for Entertainment
          "#000000", // Hover color for Bills
          "#000000", // Hover color for Others
        ],
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      r: {
        grid: {
          color: 'rgba(255, 255, 255, 0.3)', // Set the grid lines to a light off-white color
        },
        ticks: {
          backdropColor: 'rgba(255, 255, 255, 0)', // Set the backdrop color for the ticks (numbers) to off-white
          color: 'rgba(255, 255, 255, 0.5)', // Ticks text color
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom", // Position the legend below the polar chart
        labels: {
          color: "white", // Legend text color
          usePointStyle: true, // Use circular legend markers
          pointStyle: 'circle', // Use a small circle for the legend item
          padding: 10, // Add some space between legend items
        },
      },
      tooltip: {
        titleColor: "white", // Tooltip title color
        bodyColor: "white", // Tooltip body color
        footerColor: "white", // Tooltip footer color (if applicable)
      },
    },
  };

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-950/25 rounded-badge shadow-lg p-6">
        <PolarArea data={data} options={options} />
      </div>
    </div>
  );
};

export default PolarAreaChart;
