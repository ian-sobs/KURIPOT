import formatNumWithCommas from "../../utility/formatNumWithCommas"
export default function TopSpendingCard(props){
    return (
        <>
            <li key={props.categoryId} className="py-2">
                    <div className="flex justify-between">
                    <span>{props.categoryName}</span>
                    <span className="font-bold">
                        - Php {formatNumWithCommas(-props.spent)} (
                          {props.spentPercentage}%)
                    </span>
                </div>
            </li>
        </>
    )
}