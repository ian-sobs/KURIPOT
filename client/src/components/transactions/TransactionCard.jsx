export default function TransactionCard(props) {
  console.log(props);

  // Helper to extract the day and month
  const getDayAndMonth = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthAbbreviations = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthAbbreviations[date.getMonth()];
    return { day, month };
  };

  const { day, month } = getDayAndMonth(props.date);

  return (
    <>
      <li
        key={props.id}
        className="p-2 border-t-2 border-white border-opacity-20"
      >
        <div className="flex justify-between">
          <div className="left-container flex flex-row justify-center items-center space-x-4">
            <div className="trans-left flex flex-col items-center">
              <h2 className="text-xl font-semibold">{day}</h2>
              <h2>{month}</h2>
            </div>
            <div className="trans-details max-w-28">
              <p className="font-medium text-sm">{props.note}</p>
              <p className="text-xs text-gray-300 font-extralight">
                from: Account (frontend)
              </p>
            </div>
          </div>

          <span
            className={`font-bold text-left w-32 flex justify-left items-center ${
              props.type === "income"
                ? "text-green-500"
                : props.type === "expense"
                ? "text-red-500"
                : "text-white"
            }`}
          >
            {props.amount > 0
              ? `Php ${props.amount}`
              : `- Php ${-props.amount}`}
          </span>
        </div>
      </li>
    </>
  );
}
