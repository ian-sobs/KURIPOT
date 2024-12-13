import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import Categories from "./Categories";

const HamburgerIcon = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // fetching data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user"); // replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      {/* Hamburger Icon */}
      <button
        className="hamburger-icon fixed right-4 top-4 z-50"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <i className="bi bi-list text-2xl text-white"></i>
      </button>

      {/* Background Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 right-0 h-full bg-[#15172E] text-white shadow-lg transition-transform duration-300 z-50 ${
          isSidebarOpen ? "open" : ""
        }`}
      >
        <div className="p-6 flex flex-col min-h-full">
          {/* Sidebar content */}
          <div className="flex">
            <img
              src="/images/kuripot-logo.png"
              alt="kuripot-logo"
              className="h-10"
            />
            <div className="pl-3 logo-font text-2xl font-extrabold">
              Kuripot
            </div>
          </div>

          {/* User Info */}
          <div className="mt-3">
            <h2 className="text-sm text-slate-400">USER</h2>
            <hr className="border-slate-600" />
            <p className="mt-4">
              Email: {user ? user.email : "Loading..."} {/* Dynamic Email */}
            </p>
          </div>

          {/* Links */}
          <div className="mt-3">
            <h2 className="text-sm text-slate-400 pt-10">OTHERS</h2>
            <hr className="border-slate-600" />
            <ul className="space-y-4 mt-3">
              <li>
                <Link
                  to="/dashboard/categories"
                  className="text-slate-400 hover:text-white transition-all duration-300"
                >
                  My Categories
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-slate-400 hover:text-white transition-all duration-300"
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Logout Button and Footer */}
          <div className="mt-auto">
            <button
              className="mt-8 bg-red-900 p-2 rounded w-full text-white"
              onClick={toggleSidebar}
            >
              Logout
            </button>

            <footer className="footer text-base-content pt-3 block">
              <div className="footer-divider h-1 w-full bg-[#9747FF] rounded-md mt-4 mb-4"></div>
              <div className="text-slate-400 text-center">
                <p>2024. All rights reserved.</p>
                <div className="socials-container flex flex-row justify-center pt-6 space-x-2">
                  <i className="bi bi-facebook text-xl"></i>
                  <i className="bi bi-linkedin text-xl"></i>
                  <i className="bi bi-github text-xl"></i>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerIcon;
