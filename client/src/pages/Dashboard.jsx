import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

// basically the home page/first viewed upon login
// static data for now :">

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%]">
        <PageHeader title="Dashboard" />
        <div className="mt-[4rem] amount-container w-full p-0">
          <div className="amount-container-content w-full flex items-center justify-between p-10 pb-5">
            <div className="balance-container items-start text-left text-lg text-white">
              Total Balance
              <div className="amount text-4xl font-bold">Php 2,548</div>
            </div>
          </div>
        </div>

        <div className="income-expenses-container items-center flex w-full text-lg text-white p-10 pt-0 rounded-full">
          <div className="income-container p-4 flex-1 bg-[#9747FF] border border-white rounded-lg">
            <i className="fs-4 bi-arrow-down-circle pr-2"></i>
            Income
            <div className="income-amount text-md font-bold">Php 2,548.00</div>
          </div>
          <div className="expenses-container p-4 flex-1 bg-[#9747FF] border border-white rounded-lg ml-4 ">
            <i className="fs-4 bi-arrow-up-circle pr-2"></i>
            Expenses
            <div className="expenses-amount text-md font-bold">Php 2,548.00</div>
          </div>
        </div>

        <div className="p-10 pb-5 pt-0">
          <div className="collapse collapse-arrow max-w-2xl w-full p-3 rounded-lg shadow- overflow-hidden mb-4 backdrop-blur-md bg-white/10">
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium border-b border-white pb-2">My Accounts</div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-arrow max-w-2xl w-full bg-blue-950 p-3 rounded-lg shadow- overflow-hidden mb-4 backdrop-blur-md bg-white/10">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-medium border-b border-white pb-2">Top Spending</div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
        {/* <div className="amount-container-content w-full flex items-center justify-between p-10 pt-5 pb-5">
          <div className="collapse-title text-xl font-medium">Recent Transactions</div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
