export default function AccountCard(props){
    return (
        <>
            <li
            key={props.id}
            className="flex justify-between items-center bg-gradient-to-r from-[#180655]/20 via-[#15172E]/20 to-[#180655]/20 p-4 rounded-badge mb-2"
            >
                <span className="text-white font-semibold">
                    {props.name}
                </span>
                <span className="text-[#9747FF] font-bold">
                    Php {props.amount}
                </span>
            </li>
        </>

      )
}