

export default function TransactionCard(props){
    console.log(props)
    return (<>
        <li key={props.id} className="py-2">
          <div className="flex justify-between">
            <span>{new Date(props.date).toLocaleString()}</span>
            <span
              className={`font-bold ${
                props.type === "income"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {(props.amount > 0) ? `Php ${props.amount}` : `- Php ${-props.amount}`}
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {props.note}
          </p>
        </li>
    </>)
}