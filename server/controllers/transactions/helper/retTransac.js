exports.retTransac = (transac) => {
    if(!(transac.from_account_id || transac.to_account_id)){ //is not a transfer
        return {
            isTransfer: false,
            details: {
                id: transac.id,
                date: transac.date,
                amount: transac.amount,
                account: transac.accountName,
                category: transac.categoryName,
                note: transac.note
            }
        }
    }

    return {
        isTransfer: true,
        details: {
            id: transac.id,
            date: transac.date,
            amount: transac.amount,
            fromAccount: transac.from_accountName,
            toAccount: transac.to_accountName,
            note: transac.note
        }
    }
}