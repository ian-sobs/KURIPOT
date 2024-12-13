import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

//uncomment if taskbar with labels

const TaskBar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const navigate = useNavigate();
  const handleNavigation = (url) => {
    navigate(url); // Navigate to the specified URL
    closePopup(); // Close the popup after navigation
  };
  return (
    <div>
      {/* MOBILE */}
      <div className="taskbar-mobile fixed bottom-0 left-0 w-full p-2 md:hidden rounded-tl-badge rounded-tr-badge bg-[#010827]">
        <div className="flex justify-around items-center text-white">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded ${
              isActive("/dashboard") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`bi-house flex justify-center items-center text-xl ${
                isActive("/dashboard") ? "text-[#9747FF]" : ""
              }`}
            ></i>
          </Link>

          <Link
            to="/dashboard/transactions"
            className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded ${
              isActive("/dashboard/transactions") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`fs-5 bi-arrow-left-right flex justify-center items-center text-xl ${
                isActive("/dashboard/transactions") ? "text-[#9747FF]" : ""
              }`}
            ></i>
          </Link>

          <button
            onClick={openPopup} // Open the popup when clicked
            className="flex flex-col items-center text-gray-400 no-underline p-2 rounded"
          >
            <div className="bg-[#9747FF] rounded-full w-10 h-10 flex justify-center items-center">
              <i className="fs-1 bi-plus text-white text-3xl"></i>
            </div>
          </button>

          <Link
            to="/dashboard/budgets"
            className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded ${
              isActive("/dashboard/budgets") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`fs-5 bi-wallet2 text-xl ${
                isActive("/dashboard/budgets") ? "text-[#9747FF]" : ""
              }`}
            ></i>
          </Link>

          <Link
            to="/dashboard/reports"
            className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded ${
              isActive("/dashboard/profile") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`fs-5 bi-clipboard2-data text-xl ${
                isActive("/dashboard/reports") ? "text-[#9747FF]" : ""
              }`}
            ></i>
          </Link>
        </div>
        <Outlet />
      </div>

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-gray-950 w-11/12 max-w-md p-6 rounded-badge shadow-lg">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-bold text-slate-300">
                Transaction Type
              </h2>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-slate-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleNavigation("/dashboard/addIncome")} // Link to the income route
                className="block w-full px-4 py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
              >
                Income
              </button>

              <button
                onClick={() => handleNavigation("/dashboard/addExpense")} // Link to the expense route
                className="block w-full px-4 py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
              >
                Expense
              </button>

              <button
                onClick={() => handleNavigation("/dashboard/transferMoney")} // Link to the transfer route
                className="block w-full px-4 py-2 bg-[#9747FF] text-white rounded-md hover:bg-blue-600 transition"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP */}
      <div className="fixed left-0 top-0 h-full p-5 w-16 md:w-1/5 lg:w-1/6 hidden md:block bg-[#010827]">
        <div className="flex flex-col items-start text-white space-y-2">
          <div className="nav-start flex items-center justify-center w-full">
            <img src="/images/logo-kuripot.png" alt="" className="w-20" />
          </div>

          <Link
            to="/dashboard"
            className={`flex items-center text-gray-400 no-underline p-2 rounded ${
              isActive("/dashboard") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`fs-5 bi-house ${
                isActive("/dashboard") ? "text-[#9747FF]" : ""
              }`}
            ></i>
            <span
              className={`text-xs ml-2 ${
                isActive("/dashboard") ? "text-[#9747FF]" : ""
              }`}
            >
              Home
            </span>
          </Link>

          <Link
            to="/dashboard/transactions"
            className={`flex items-center text-gray-400 no-underline p-2 rounded ${
              isActive("/dashboard/transactions") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`fs-5 bi-arrow-left-right ${
                isActive("/dashboard/transactions") ? "text-[#9747FF]" : ""
              }`}
            ></i>
            <span
              className={`text-xs ml-2 ${
                isActive("/dashboard/transactions") ? "text-[#9747FF]" : ""
              }`}
            >
              Transactions
            </span>
          </Link>

          <Link
            to="/dashboard/budgets"
            className={`flex items-center text-gray-400 no-underline p-2 rounded ${
              isActive("/dashboard/budgets") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`fs-5 bi-wallet2 ${
                isActive("/dashboard/budgets") ? "text-[#9747FF]" : ""
              }`}
            ></i>
            <span
              className={`text-xs ml-2 ${
                isActive("/dashboard/budgets") ? "text-[#9747FF]" : ""
              }`}
            >
              Budgets
            </span>
          </Link>

          <Link
            to="/dashboard/reports"
            className={`flex items-center text-gray-400 no-underline p-2 rounded ${
              isActive("/dashboard/profile") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`fs-5 bi-clipboard2-data ${
                isActive("/dashboard/reports") ? "text-[#9747FF]" : ""
              }`}
            ></i>
            <span
              className={`text-xs ml-2 ${
                isActive("/dashboard/reports") ? "text-[#9747FF]" : ""
              }`}
            >
              Reports
            </span>
          </Link>
          <button
            onClick={openPopup}
            className={`flex items-center text-gray-400 no-underline pt-10 rounded ${
              isActive("/dashboard/addTransaction") ? "glow-effect" : ""
            }`}
          >
            <i
              className={`fs-5 bi-plus-lg ${
                isActive("/dashboard/addTransaction") ? "text-[#9747FF]" : ""
              }`}
            ></i>
            <span className="text-xs ml-2">New Transaction</span>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default TaskBar;
