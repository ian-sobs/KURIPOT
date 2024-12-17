import React, { useState, useEffect } from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";
import TransactionDailyContainer from "../components/transactions/TransactionDailyContainer";
import TransactionMonthlyContainer from "../components/transactions/TransactionMonthlyContainer";
import TransactionWeeklyContainer from "../components/transactions/TransactionsWeeklyContainer";


function getDaysInMonth(year, month) {
  //month of date constructor is 0 based. passing a 1-based month parameter to getDaysInMonth
  //and setting day to 0 causes the date to roll over to the last day of the month we want
  //to find the number of days of
  return new Date(year, month, 0).getDate();
}

// function getWeeksInMonth(year, month) {
//   // Get the first day of the month
//   const firstDayOfMonth = new Date(year, month - 1, 1);
//   const firstDayWeekday = firstDayOfMonth.getDay(); // Day of the week (0 = Sunday)

//   // Get the last day of the month
//   const lastDayOfMonth = new Date(year, month, 0); // Automatically gets the last day
//   const lastDay = lastDayOfMonth.getDate(); // Number of days in the month
//   const lastDayWeekday = lastDayOfMonth.getDay();

//   // Calculate the total number of days spanned by weeks
//   const totalDays = lastDay + firstDayWeekday; // Offset for the first week

//   // Calculate the number of weeks, rounding up for partial weeks
//   const numWeeks = Math.ceil(totalDays / 7);

//   return numWeeks;
// }

const TransactionsPage = () => {
  const [date, setDate] = useState({ month: 11, year: 2024 }); // Default: December 2024 (0-indexed months)
  const [activeTab, setActiveTab] = useState(0); // State to manage active tab
  const [renderJSX, setRenderJSX] = useState([]);

  // useEffect(() => {
  //   setDaysInMonth(getDaysInMonth(date.year, date.month));
  // }, [date]);

  const months = [
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

  // const [daysInMonth, setDaysInMonth] = useState(
  //   getDaysInMonth(date.year, date.month)
  // );
  // const [weeksInMonth, setWeeksInMonth] = useState(
  //   getWeeksInMonth(date.year, date.month)
  // );

  const handlePrevMonth = () => {
    setDate((prev) => {
      const newMonth = prev.month - 1;
      const newYear = newMonth < 0 ? prev.year - 1 : prev.year;
      return {
        month: (newMonth + 12) % 12,
        year: newYear,
      };
    });
  };

  const handleNextMonth = () => {
    setDate((prev) => {
      const newMonth = prev.month + 1;
      const newYear = newMonth > 11 ? prev.year + 1 : prev.year;
      return {
        month: newMonth % 12,
        year: newYear,
      };
    });
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  function renderContent() {
    switch (activeTab) {
      case 0:
        return <TransactionDailyContainer date={date} />;
      case 1:
        return <TransactionWeeklyContainer date={date}/>;
      default:
        return <TransactionMonthlyContainer date={date} />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TaskBar />
      <div className="flex-1 md:ml-[20%] lg:ml-[16.666%] page-with-taskbar">
        <PageHeader
          title="Transactions"
          subtitle="View and Manage All Your Financial Activities"
          onBackClick={() => window.history.back()}
        />
        <div className="page-with-navhead flex items-center justify-center flex-col">
          <div className="month-switch w-full flex justify-center space-x-4 items-center mb-4">
            {(activeTab === 0 || activeTab === 1) ? (
              <>
                <button onClick={handlePrevMonth}>
                  <i className="bi bi-caret-left-fill ml-6"></i>
                </button>
                <h2>{`${months[date.month]} ${date.year}`}</h2>
                <button onClick={handleNextMonth}>
                  <i className="bi bi-caret-right-fill mr-6"></i>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    setDate((prev) => ({ ...prev, year: prev.year - 1 }))
                  }
                >
                  <i className="bi bi-caret-left-fill ml-6"></i>
                </button>
                <h2>{`${date.year}`}</h2>
                <button
                  onClick={() =>
                    setDate((prev) => ({ ...prev, year: prev.year + 1 }))
                  }
                >
                  <i className="bi bi-caret-right-fill mr-6"></i>
                </button>
              </>
            )}
          </div>
          <div className="tab-container w-full px-6">
            <div
              role="tablist"
              className="tab-switch tabs tabs-bordered w-full tabs-lg flex justify-center items-center"
            >
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={`tab text-white ${
                  activeTab === 0 ? "tab-active text-[#9747FF]" : ""
                }`}
                aria-label="DAILY"
                onClick={() => handleTabChange(0)}
                defaultChecked
              />
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={`tab text-white ${
                  activeTab === 1 ? "tab-active text-[#9747FF]" : ""
                }`}
                aria-label="WEEKLY"
                onClick={() => handleTabChange(1)}
              />
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className={`tab text-white ${
                  activeTab === 2 ? "tab-active text-[#9747FF]" : ""
                }`}
                aria-label="MONTHLY"
                onClick={() => handleTabChange(2)}
              />
            </div>

            <div role="tabpanel" className="content-tab">
              {renderContent()}
            </div>

            {/*uncomment below code and comment above code if fetches dont work */}
            {/* <div role="tabpanel" className="content-tab">
              {filteredTransactions().length === 0 ? (
                <div className="no-transactions">
                  <p>No transactions available for the selected period.</p>
                </div>
              ) : (
                filteredTransactions().map((data, index) => {
                  if (activeTab === 0) {
                    return (
                      <TransactionDaily
                        key={index}
                        date={data.date}
                        day={data.day}
                        netIncome={data.netIncome}
                        transactions={data.transactions}
                      />
                    );
                  } else if (activeTab === 1) {
                    return (
                      <TransactionWeekly
                        key={index}
                        date={data.date}
                        netIncome={data.netIncome}
                        totalIncome={data.totalIncome}
                        totalExpense={data.totalExpense}
                      />
                    );
                  } else {
                    return (
                      <TransactionMonthly
                        key={index}
                        date={{ month: data.month, year: data.year }}
                        netIncome={data.netIncome}
                        totalIncome={data.totalIncome}
                        totalExpense={data.totalExpense}
                        transactions={data.transactions}
                      />
                    );
                  }
                })
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
