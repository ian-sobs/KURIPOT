import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { protectedRoute } from "../../apiClient/axiosInstance";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const LineChartYear = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState(""); // To store no data message

  // Fetches the chart data for the selected year
  const fetchChartData = async () => {
    setIsLoading(true);
    setNoDataMessage(""); // Reset message before fetching

    try {
      const updatedExpenseData = Array(12).fill(0); // Initialize data for all 12 months
      const updatedIncomeData = Array(12).fill(0);
      let dataFound = false; // Flag to check if any data is present

      for (let month = 1; month <= 12; month++) {
        // Fetch total expense
        const expenseResponse = await protectedRoute.get(
          "/transactions/getTotalExpense",
          {
            params: {
              period: "month",
              month,
              year: parseInt(selectedYear, 10),
            },
          }
        );

        const totalExpense = Math.abs(parseFloat(expenseResponse.data.totalExpense)) || 0;
        if (totalExpense !== 0) dataFound = true;
        updatedExpenseData[month - 1] = totalExpense;

        // Fetch total income
        const incomeResponse = await protectedRoute.get(
          "/transactions/getTotalIncome",
          {
            params: {
              period: "month",
              month,
              year: parseInt(selectedYear, 10),
            },
          }
        );

        const totalIncome = Math.abs(parseFloat(incomeResponse.data.totalIncome)) || 0;
        if (totalIncome !== 0) dataFound = true;
        updatedIncomeData[month - 1] = totalIncome;
      }

      if (!dataFound) {
        setNoDataMessage("You have no transactions made this year.");
      }

      setExpenseData(updatedExpenseData); // Set the data for the chart
      setIncomeData(updatedIncomeData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedYear]);

  const labels = [
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
  ];

  const data = {
    labels,
    datasets: [
      {
        label: `Expenses in ${selectedYear}`,
        data: expenseData,
        borderColor: "#9747FF",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
      {
        label: `Income in ${selectedYear}`,
        data: incomeData,
        borderColor: "#00FF00", // Green color for income
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    devicePixelRatio: window.devicePixelRatio > 1 ? window.devicePixelRatio : 1,
    maintainAspectRatio: false,
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
        text: `Expenses and Income for ${selectedYear}`,
        color: "white",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: "white",
        },
        ticks: {
          color: "white",
        },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          color: "white",
        },
        ticks: {
          color: "white",
          beginAtZero: true,
          stepSize: 200, // Adjusts the interval between ticks
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl items-center justify-start">
      <div className="line-top flex flex-row justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Your Yearly Trends</h2>
      </div>

      {/* Responsive Chart Container */}
      <div className="linechart-container w-full pt-5 rounded-badge shadow-lg bg-gradient-to-r from-[#180655]/10 via-[#15172E]/50 to-[#180655]/10 p-4">
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
          {isLoading ? (
            <p className="text-center text-white">Loading...</p>
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </div>

      {/* No data message */}
      {noDataMessage && (
        <div className="text-center text-gray-500 text-sm pt-5">{noDataMessage}</div>
      )}

      {/* Year Selector */}
      <div className="flex flex-col w-full sm:w-auto pt-5">
        <label htmlFor="year" className="block text-slate-300 text-sm">
          Select Year:
        </label>
        <input
          id="year"
          type="number"
          className="w-full px-4 py-2 rounded-md bg-gray-950/75 text-gray-500 focus:outline-none focus:ring focus:ring-blue-600"
          placeholder="Year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LineChartYear;