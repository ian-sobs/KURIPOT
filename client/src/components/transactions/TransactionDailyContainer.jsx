import TransactionDaily from "./TransactionDaily";
import { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";

export default function TransactionDailyContainer({date}){
    const [aggrDailyTransac, setAggrDailyTransac] = useState([])
    console.log("params date", date)
    useEffect(() => {
        protectedRoute.get("/transactions/getAggrDayTransactions", {
            params: {
                year: parseInt(date.year, 10),
                month: parseInt(date.month, 10) + 1
            }
        })
            .then((response) => {
                const {data} = response
                console.log("aggr daily transac ", data)
                setAggrDailyTransac(data)

            })
            .catch((error) => {
                console.log(error)
            })
    }, [date])

    return <>
        {
            (aggrDailyTransac.length !== 0) ? aggrDailyTransac.map((data, index) => <TransactionDaily
                key={index}
                date={new Date(data.year, data.month - 1, data.day).toDateString()}
                day={data.day}
                netIncome={data.net}
                transactions={data.transactions}/>)
                : 
                <div className="no-transactions">
                    <p>No transactions available for the selected period.</p>
                </div>
            
        }
    </>

}