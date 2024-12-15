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
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState("");

  const fetchChartData = async () => {
    setIsLoading(true);
    setNoDataMessage("");

    try {
      const updatedData = Array(12).fill(0);

      // Fetch data for the selected month
      const response = await protectedRoute.get(
        "/transactions/getTotalExpense",
        {
          params: {
            period: "month",
            month: parseInt(selectedMonth, 10),
            year: parseInt(selectedYear, 10),
          },
        }
      );

      const totalExpense = Math.abs(parseFloat(response.data.totalExpense)) || 0;

      if (totalExpense === 0) {
        setNoDataMessage("You have no transactions for this month.");
      } else {
        updatedData[selectedMonth - 1] = totalExpense;
      }

      // Fetch data for previous and next months
      const prevMonth = selectedMonth === "1" ? 12 : selectedMonth - 1;
      const nextMonth = selectedMonth === "12" ? 1 : parseInt(selectedMonth, 10) + 1;

      const prevResponse = await protectedRoute.get(
        "/transactions/getTotalExpense",
        {
          params: {
            period: "month",
            month: prevMonth,
            year: parseInt(selectedYear, 10),
          },
        }
      );
      updatedData[prevMonth - 1] = Math.abs(parseFloat(prevResponse.data.totalExpense)) || 0;

      const nextResponse = await protectedRoute.get(
        "/transactions/getTotalExpense",
        {
          params: {
            period: "month",
            month: nextMonth,
            year: parseInt(selectedYear, 10),
          },
        }
      );
      updatedData[nextMonth - 1] = Math.abs(parseFloat(nextResponse.data.totalExpense)) || 0;

      setChartData(updatedData);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [selectedYear, selectedMonth]);

  const labels = [
    new Date(selectedYear, selectedMonth - 2).toLocaleString("default", { month: "long" }),
    new Date(selectedYear, selectedMonth - 1).toLocaleString("default", { month: "long" }),
    new Date(selectedYear, selectedMonth).toLocaleString("default", { month: "long" }),
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Expenses",
        data: chartData.slice(selectedMonth - 2, selectedMonth + 1),
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
          stepSize: 200,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl items-center justify-start">
      <div className="line-top flex flex-row justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Your Monthly Trends</h2>
      </div>

      <div className="doughnut-container w-full pt-5 rounded-badge shadow-lg bg-gradient-to-r from-[#180655]/10 via-[#15172E]/50 to-[#180655]/10 p-4">
        <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
          {isLoading ? (
            <p className="text-center text-white">Loading...</p>
          ) : (
            <Line data={data} options={options} />
          )}
        </div>
      </div>

      {noDataMessage && (
        <div className="text-center text-gray-500 text-sm pt-5">{noDataMessage}</div>
      )}

      <div className="flex flex-wrap gap-4 mb-4 pt-5">
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
