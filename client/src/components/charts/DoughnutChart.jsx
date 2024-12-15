import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { protectedRoute } from "../../apiClient/axiosInstance";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [topSpending, setTopSpending] = useState([]);
  const [chartData, setChartData] = useState(null);

  const fetchTopSpending = async (startDate, endDate) => {
    try {
      const query =
        startDate && endDate
          ? `?startDate=${startDate}&endDate=${endDate}`
          : "";

      const response = await protectedRoute.get(
        `/transactions/getTopSpending${query}`
      );
      const { categories } = response.data;

      // Extract data for chart
      const labels = categories.map((category) => category.categoryName);
      const data = categories.map((category) => Math.abs(category.spent)); // Convert negatives to positives
      const backgroundColor = [
        "#AF9ED2",
        "#1b203e",
        "#CECED9",
        "#253462",
        "#030a29",
      ];

      setTopSpending(categories);
      setChartData({
        labels,
        datasets: [
          {
            data,
            backgroundColor,
            hoverBackgroundColor: [
              "#000000",
              "#000000",
              "#000000",
              "#000000",
              "#000000",
            ],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching top spending data:", error);
    }
  };

  useEffect(() => {
    // Fetch data for initial load without date range
    fetchTopSpending();
  }, []);

  const handleFilter = () => {
    // Validate date inputs before fetching
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    // Fetch filtered data
    fetchTopSpending(startDate, endDate);
  };

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

  return (
    <div className="overflow-x-auto relative w-full max-w-3xl">
      <div className="rounded-badge shadow-lg bg-gradient-to-r from-[#180655]/10 via-[#15172E]/10 to-[#180655]/10 p-4 flex flex-col justify-center">
        <div className="doughnut-top flex flex-row justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Expense Breakdown</h2>
        </div>

        {/* Doughnut Chart */}
        <div className="doughnut-container w-full pt-10">
          {chartData ? (
            <Doughnut data={chartData} options={options} />
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/* Date Range Inputs */}
        <div className="date-range-filter pt-10 flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
          <div className="flex flex-col">
            <label htmlFor="start-date" className="block text-slate-300 text-sm">
              Start Date:
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-950/75 text-gray-500 focus:outline-none focus:ring focus:ring-blue-600"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="end-date" className="block text-slate-300 text-sm">
              End Date:
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-950/75 text-gray-500 focus:outline-none focus:ring focus:ring-blue-600"
            
            />
          </div>

          <button
            onClick={handleFilter}
            className="self-end sm:self-center px-4 py-2 bg-[#9747FF] text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
