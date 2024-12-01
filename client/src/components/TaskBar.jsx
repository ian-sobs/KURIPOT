import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const TaskBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div>
            {/* MOBILE */}
            <div
                className="fixed bottom-0 left-0 w-full p-4 md:hidden rounded-tl-xl rounded-tr-xl"
                style={{
                    backgroundColor: '#010827',
                }}
            >
                <div className="flex justify-around items-center text-white">
                    <Link
                        to="/dashboard"
                        className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded ${isActive("/dashboard") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-house ${isActive("/dashboard") ? 'text-[#9747FF]' : ''}`}></i>
                        {/* <span className={`text-md ${isActive("/dashboard") ? 'text-[#9747FF]' : ''}`}>Home</span> */}
                    </Link>

                    <Link
                        to="/dashboard/transactions"
                        className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded ${isActive("/dashboard/transactions") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-arrow-left-right ${isActive("/dashboard/transactions") ? 'text-[#9747FF]' : ''
                            }`}></i>
                        {/* <span className={`text-md ${isActive("/dashboard/transactions") ? 'text-[#9747FF]' : ''
                            }`}>Transactions</span> */}
                    </Link>

                    <Link
                        to="/dashboard/addTransaction"
                        className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded relative -top-10 w-16 h-16 flex justify-center items-center`}
                    >
                        <div className="bg-[#9747FF] rounded-full w-12 h-12 flex justify-center items-center">
                            <i className="fs-1 bi-plus text-white text-4xl"></i>
                        </div>
                    </Link>

                    <Link
                        to="/dashboard/budgets"
                        className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded ${isActive("/dashboard/budgets") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-wallet2 ${isActive("/dashboard/budgets") ? 'text-[#9747FF]' : ''
                            }`}></i>
                        {/* <span className={`text-md ${isActive("/dashboard/budgets") ? 'text-[#9747FF]' : ''
                            }`}>Budgets</span> */}
                    </Link>

                    <Link
                        to="/dashboard/profile"
                        className={`flex flex-col items-center text-gray-400 no-underline p-2 rounded ${isActive("/dashboard/profile") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-person-circle ${isActive("/dashboard/profile") ? 'text-[#9747FF]' : ''
                            }`}></i>
                        {/* <span className={`text-md ${isActive("/dashboard/profile") ? 'text-[#9747FF]' : ''
                            }`}>Profile</span> */}
                    </Link>
                </div>
                <Outlet />
            </div>

            {/* DESKTOP */}
            <div
                className="fixed left-0 top-0 h-full p-5 w-16 md:w-1/5 lg:w-1/6 hidden md:block"
                style={{ backgroundColor: '#010827' }}
            >
                <div className="flex flex-col items-start text-white space-y-2">
                    <div className="nav-start flex items-center justify-center w-full">
                        <img src="/images/logo-kuripot.png" alt="" className="w-20" />
                    </div>

                    <Link
                        to="/dashboard"
                        className={`flex items-center text-gray-400 no-underline p-2 rounded ${isActive("/dashboard") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-house ${isActive("/dashboard") ? 'text-[#9747FF]' : ''}`}></i>
                        <span className={`text-xs ml-2 ${isActive("/dashboard") ? 'text-[#9747FF]' : ''}`}>Home</span>
                    </Link>

                    <Link
                        to="/dashboard/transactions"
                        className={`flex items-center text-gray-400 no-underline p-2 rounded ${isActive("/dashboard/transactions") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-arrow-left-right ${isActive("/dashboard/transactions") ? 'text-[#9747FF]' : ''
                            }`}></i>
                        <span className={`text-xs ml-2 ${isActive("/dashboard/transactions") ? 'text-[#9747FF]' : ''
                            }`}>Transactions</span>
                    </Link>

                    <Link
                        to="/dashboard/budgets"
                        className={`flex items-center text-gray-400 no-underline p-2 rounded ${isActive("/dashboard/budgets") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-wallet2 ${isActive("/dashboard/budgets") ? 'text-[#9747FF]' : ''
                            }`}></i>
                        <span className={`text-xs ml-2 ${isActive("/dashboard/budgets") ? 'text-[#9747FF]' : ''
                            }`}>Budgets</span>
                    </Link>

                    <Link
                        to="/dashboard/profile"
                        className={`flex items-center text-gray-400 no-underline p-2 rounded ${isActive("/dashboard/profile") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-person-circle ${isActive("/dashboard/profile") ? 'text-[#9747FF]' : ''
                            }`}></i>
                        <span className={`text-xs ml-2 ${isActive("/dashboard/profile") ? 'text-[#9747FF]' : ''
                            }`}>Profile</span>
                    </Link>
                    <Link
                        to="/dashboard/addTransaction"
                        className={`flex items-center text-gray-400 no-underline pt-10 rounded ${isActive("/dashboard/addTransaction") ? 'glow-effect' : ''
                            }`}
                    >
                        <i className={`fs-5 bi-plus-lg ${isActive("/dashboard/addTransaction") ? 'text-[#9747FF]' : ''
                            }`}></i>
                        <span className={`text-xs ml-2`}>New Transaction</span>
                    </Link>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default TaskBar;
