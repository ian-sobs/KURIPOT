import { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";
import TransactionWeekly from "./TransactionWeekly";
import getNumWeeksInMonth from "../../utility/getNumWeeksInMonth";

export default function TransactionWeeklyContainer({ date }) {
    const [aggrMonthlyTransac, setAggrMonthlyTransac] = useState([]);
    const [numWeeks, setNumWeeks] = useState(getNumWeeksInMonth(date.year, date.month));
    const [weekAggrRecordsArr, setWeekAggrRecordsArr] = useState([]);

    // Fetch weekly aggregate records
    useEffect(() => {
        protectedRoute.get("/transactions/getAggrWeekTransaction", {
            params:{
                year: parseInt(date.year, 10),
                month: parseInt(date.month, 10) + 1
            }
        })
            .then((response) => {
                const {data} = response
                console.log("weekAggrRecordsArr", weekAggrRecordsArr)
                setWeekAggrRecordsArr(data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [date]);

    return (
        <>
            {weekAggrRecordsArr.length !== 0 ? (
                weekAggrRecordsArr.map((data, index) => (
                    <TransactionWeekly
                        key={index}
                        date={data.date}
                        netIncome={data.net}
                        totalIncome={data.income}
                        totalExpense={data.expense}
                    />
                ))
            ) : (
                <div className="no-transactions">
                    <p>No transactions available for the selected period.</p>
                </div>
            )}
        </>
    );
}
