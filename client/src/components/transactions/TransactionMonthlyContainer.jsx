// import TransactionDaily from "./TransactionDaily";
import { useState, useEffect } from "react";
import { protectedRoute } from "../../apiClient/axiosInstance";
import TransactionMonthly from "./TransactionMonthly";

export default function TransactionMonthlyContainer({date}){
    const [aggrMonthlyTransac, setAggrMonthlyTransac] = useState([])
    console.log("params date", date)
    useEffect(() => {
        protectedRoute.get("/transactions/getAggrMonthTransactions", {
            params: {
                year: parseInt(date.year, 10)
            }
        })
            .then((response) => {
                const {data} = response
                console.log("aggr monthly transac ", data)
                setAggrMonthlyTransac(data)

            })
            .catch((error) => {
                console.log(error)
            })
    }, [date])

    return <>
        {
            (aggrMonthlyTransac.length !== 0) ? aggrMonthlyTransac.map((data, index) => <TransactionMonthly
                key={index}
                month={data.month}
                year={data.year}
                netIncome={data.net}
                totalIncome={data.income}
                totalExpense={data.expense}
                
                />)
                : 
                <div className="no-transactions">
                    <p>No transactions available for the selected period.</p>
                </div>
            
        }
    </>

}