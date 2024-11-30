import React from "react";
import TaskBar from "../components/TaskBar";
import PageHeader from "../components/PageHeader";

const Transactions = () => {
    return (
        <div className="flex flex-col h-screen">
            <PageHeader />
            <TaskBar />
            <div className="p-5 md:ml-[20%] lg:ml-[16.666%]">
                <div role="tablist" className="tabs tabs-lifted">
                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab text-white"
                        aria-label="Tab 1"
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                    >
                        Tab content 1
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab text-white"
                        aria-label="Tab 2"
                        defaultChecked
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                    >
                        Tab content 2
                    </div>

                    <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className="tab text-white"
                        aria-label="Tab 3"
                    />
                    <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                    >
                        Tab content 3
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Transactions;
