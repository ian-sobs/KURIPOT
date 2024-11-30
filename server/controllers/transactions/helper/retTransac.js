exports.retTransac = (transac) => {
    if(transac.type !== 'transfer'){ //is not a transfer
        return {
            type: transac.type,
            id: transac.id,
            date: transac.date,
            amount: transac.amount,
            account: {
                id: transac.account_id,
                name: transac.accountName
            },
            category: {
                id: transac.category_id,
                name: transac.categoryName
            },
            note: transac.note
        }
    }

    return {
        type: transac.type,
        id: transac.id,
        date: transac.date,
        amount: transac.amount,
        fromAccount: {
            id: transac.from_account_id,
            name: transac.from_accountName
        },
        toAccount: {
            id: transac.to_account_id,
            name: transac.to_accountName
        },
        note: transac.note
    }
}