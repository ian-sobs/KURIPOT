import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

// basically the home page/first viewed upon login
const Dashboard = () => {

    return (
        <div className="flex flex-col h-screen">
            <TaskBar />
            <div className="p-3 md:ml-[20%] lg:ml-[16.666%]">
            <PageHeader />
                <div className="amount-container w-full p-0 ">
                    <div className="amount-container-content w-full flex items-center justify-between p-10 shadow-lg">
                        <div className="balance-container items-start text-left text-lg text-white">
                            Total Balance
                            <div className="amount text-4xl font-bold">
                                Php 2,548
                            </div>
                        </div>
                    </div>
                </div>

                <div className="income-expenses-container items-center flex w-full text-lg text-white p-10 rounded-full">
                    <div className="income-container p-4 flex-1">
                        <i className="fs-4 bi-arrow-down-circle pr-2"></i>
                        Income
                        <div className="income-amount text-md font-bold">
                            Php 2,548.00
                        </div>
                    </div>
                    <div className="expenses-container p-4 flex-1">
                        <i className="fs-4 bi-arrow-up-circle pr-2"></i>
                        Expenses
                        <div className="expenses-amount text-md font-bold">
                            Php 2,548.00
                        </div>
                    </div>
                </div>

                <div className="p-5">
                    <div className="collapse collapse-arrow bg-base-200 mb-4">
                        <input type="radio" name="my-accordion-2" defaultChecked />
                        <div className="collapse-title text-xl font-medium">My Accounts</div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200 mb-4">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">Top Spending</div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Dashboard;
