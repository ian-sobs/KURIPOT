import { useState, useEffect } from "react"

export default function BudgetCard(props){
    return (
        <>
            <li
                key={props.id}
                className="bg-[#15172E] p-4 mb-4 rounded-lg flex justify-between"
            >
                    <div>
                      <div className="text-lg font-bold">{props.name}</div>
                      <div className="text-sm text-gray-400">
                        Limit: Php {props.budgetLimit.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400">
                        Spent: Php {props.spent.toFixed(2)}
                      </div>
                      <div
                        className={`text-sm ${
                            props.spent > props.limit
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        Remaining: Php{" "}
                        {(props.limit - props.spent).toFixed(2)}
                      </div>
                    </div>
            </li>
        </>
    )
}