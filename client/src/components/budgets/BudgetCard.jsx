export default function BudgetCard(props) {
    return (
      <>
        <li
          key={props.id}
          className="flex justify-between items-center bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 p-4 rounded-badge mb-2"
        >
          <div className="flex flex-col">
            <span className="text-white font-semibold">
              Budget ID: {props.id}
            </span>
            <span className="text-sm text-gray-400">
              Date: {props.date}
            </span>
            <span className="text-sm text-gray-400">
              Type: {props.type}
            </span>
            <div className="text-sm text-gray-400 mt-2">
              Categories:{" "}
              {props.categories && props.categories.length > 0 ? (
                <ul className="list-disc pl-5">
                  {props.categories.map((category, idx) => (
                    <li key={idx}>{category.name}</li>
                  ))}
                </ul>
              ) : (
                <span>No categories assigned</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[#9747FF] font-bold">
              Php {props.budgetLimit}
            </div>
          </div>
        </li>
      </>
    );
  }
  