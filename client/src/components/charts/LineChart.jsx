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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const LineChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [period, setPeriod] = useState("month");
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState(""); // To store no data message

  // Fetches the chart data based on selected period (month/year)
  const fetchChartData = async () => {
    setIsLoading(true);
    setNoDataMessage(""); // Reset message before fetching

    try {
      const updatedData = Array(12).fill(0); // Start with empty data for all 12 months

      if (period === "month") {
        // Fetch data for the selected month
        const response = await protectedRoute.get(
          "/transactions/getTotalExpense",
          {
            params: {
              period,
              month: parseInt(selectedMonth, 10),
              year: parseInt(selectedYear, 10),
            },
          }
        );

        // Parse `totalExpense` to float and take the absolute value
        const totalExpense =
          Math.abs(parseFloat(response.data.totalExpense)) || 0;

        if (totalExpense === 0) {
          setNoDataMessage("You have no transactions for this month.");
        } else {
          updatedData[selectedMonth - 1] = totalExpense; // Populate the selected month
        }

        // Add data for previous and next months
        const prevMonth = selectedMonth === "1" ? 12 : selectedMonth - 1;
        const nextMonth = selectedMonth === "12" ? 1 : parseInt(selectedMonth, 10) + 1;

        // Fetch previous month
        const prevResponse = await protectedRoute.get(
          "/transactions/getTotalExpense",
          {
            params: {
              period,
              month: prevMonth,
              year: parseInt(selectedYear, 10),
            },
          }
        );
        updatedData[prevMonth - 1] = Math.abs(parseFloat(prevResponse.data.totalExpense)) || 0;

        // Fetch next month
        const nextResponse = await protectedRoute.get(
          "/transactions/getTotalExpense",
          {
            params: {
              period,
              month: nextMonth,
              year: parseInt(selectedYear, 10),
            },
          }
        );
        updatedData[nextMonth - 1] = Math.abs(parseFloat(nextResponse.data.totalExpense)) || 0;
      } else {
        // Fetch data for all months of the selected year
        let dataFound = false;
        for (let month = 1; month <= 12; month++) {
          const response = await protectedRoute.get(
            "/transactions/getTotalExpense",
            {
              params: {
                period,
                month,
                year: parseInt(selectedYear, 10),
              },
            }
          );

          // Parse `totalExpense` to float and take the absolute value
          const totalExpense =
            Math.abs(parseFloat(response.data.totalExpense)) || 0;

          if (totalExpense !== 0) {
            dataFound = true;
          }

          updatedData[month - 1] = totalExpense; // Populate each month
        }

        if (!dataFound) {
          setNoDataMessage("You have no transactions made this year.");
        }
      }

      setChartData(updatedData); // Set the data for the chart
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedYear, selectedMonth, period]);

  // Adjust the x-axis labels and data based on the selected period
  const labels =
    period === "month"
      ? [
          new Date(selectedYear, selectedMonth - 2).toLocaleString("default", { month: "long" }), // Previous Month
          new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long" }), // Current Month
          new Date(selectedYear, selectedMonth).toLocaleString("default", { month: "long" }), // Next Month
        ]
      : [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

  const data = {
    labels,
    datasets: [
      {
        label: `Expenses`,
        data: chartData.slice(
          period === "month" ? selectedMonth - 2 : 0,
          period === "month" ? selectedMonth + 1 : 12
        ),
        borderColor: "#9747FF",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
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
          beginAtZero: true,
          stepSize: 200, // Adjusts the interval between ticks (e.g., 0, 200, 400, ...),
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl items-center justify-start">
      <div className="line-top flex flex-row justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Your Trends</h2>
      </div>

      {/* Responsive Chart Container */}
      <div className="doughnut-container w-full pt-5 rounded-badge shadow-lg bg-gradient-to-r from-[#180655]/10 via-[#15172E]/50 to-[#180655]/10 p-4">
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
          {isLoading ? (
            <p className="text-center text-white">Loading...</p>
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </div>

      {/* No data message */}
      {/* {noDataMessage && (
        <div className="text-center text-red-500 text-sm pt-5">{noDataMessage}</div>
      )} */}

      {/* Period and Month Selectors */}
      <div className="flex flex-wrap gap-4 mb-4 pt-5">
        <div className="flex flex-col w-full sm:w-auto">
          <label htmlFor="period" className="block text-slate-300 text-sm">
            Select Period:
          </label>
          <select
            id="period"
            className="w-full px-4 py-2 rounded-md bg-gray-950/75 text-gray-500 focus:outline-none focus:ring focus:ring-blue-600"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        {period === "month" && (
          <div className="flex flex-col w-full sm:w-auto">
            <label htmlFor="month" className="block text-slate-300 text-sm">
              Month:
            </label>
            <select
              id="month"
              className="w-full px-4 py-2 rounded-md bg-gray-950/75 text-gray-500 focus:outline-none focus:ring focus:ring-blue-600"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col w-full sm:w-auto">
          <label htmlFor="year" className="block text-slate-300 text-sm">
            Year:
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
    </div>
  );
};

export default LineChart;
