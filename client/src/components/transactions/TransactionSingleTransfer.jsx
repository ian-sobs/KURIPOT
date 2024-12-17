import React from "react";
import formatNumWithCommas from "../../utility/formatNumWithCommas";

const TransactionSingleTransfer = ({
  fromAccount,
  toAccount,
  description,
  amount
}) => {

  return (
    <div className="singletrans-container flex justify-between items-center p-2 pl-8">
      <div className="singletrans-left flex flex-row">
        <div className="category-container flex items-center justify-center flex-col w-0">
          <i className="bi bi-car-front-fill"></i>
          {/* <h3 className="text-xs truncate">fs</h3> */}
        </div>
        <div className="singletrans-text text-sm flex flex-col ml-8">
          <h3 className="font-medium">{description}</h3>
          <h3 className="from-account text-xs text-gray-300 font-extralight">
            From account: {fromAccount}
          </h3>
          <h3 className="from-account text-xs text-gray-300 font-extralight">
            To account: {toAccount}
          </h3>
          {/* <h3 className="text-gray-300 sm:max-w-48 mr-4">{description}</h3> */}
        </div>
      </div>

      <div className="singletrans-right text-gray-500">₱{formatNumWithCommas(amount)}</div>
    </div>
  );
};

export default TransactionSingleTransfer;
