const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction, Account, Category} = sequelize.models


exports.makeTransfer = async function makeTransfer(req, res){
    let {amount, fromAccountId, toAccountId, note, date} = req.body
    const {usrId} = req.user

    amount = parseFloat(amount).toFixed(2)
    fromAccountId = parseInt(fromAccountId, 10)
    toAccountId = parseInt(toAccountId, 10)
    date = new Date(date).toISOString()
    date = new Date(date)

    date = new Date(date).toISOString()

    if(amount < 0){
        amount = -amount
    }

    try{
        let fromAccountInfo = await Account.findOne({
            where: {
                id: fromAccountId,
                user_id: usrId
            },
            attributes: ['id', 'name', 'amount']
        })

        let toAccountInfo = await Account.findOne({
            where: {
                id: toAccountId,
                user_id: usrId
            },
            attributes: ['id', 'name', 'amount'],
            
        })

        console.log("toAccountInfo.id", toAccountInfo.id)
        console.log("toAccountInfo.name", toAccountInfo.name)
        console.log("toAccountInfo.amount", toAccountInfo.amount)

        if(!fromAccountInfo || !toAccountInfo){
            return res.status(400).json({message: 'no such account exists'})
        }


        let transacInfo = await Transaction.create({
            user_id: parseInt(usrId, 10),
            amount: amount,
            account_id: null,
            accountName: null,
            date: date,
            category_id: null,
            categoryName: null,
            from_account_id: fromAccountInfo.id,
            from_accountName: fromAccountInfo.name,
            to_account_id: toAccountInfo.id,
            to_accountName: toAccountInfo.name,
            note: note,
            recurrId: null,
            type: 'transfer'
        })

        await Account.update(
            { amount: (parseFloat(fromAccountInfo.amount) - parseFloat(transacInfo.amount)).toFixed(2) },
            {
                where: {
                    id: parseInt(fromAccountInfo.id, 10),
                    user_id: parseInt(usrId, 10)
                },
            },
        );

        await Account.update(
            { amount: (parseFloat(toAccountInfo.amount) + parseFloat(transacInfo.amount)).toFixed(2) },
            {
                where: {
                    id: parseInt(toAccountInfo.id, 10),
                    user_id: parseInt(usrId, 10)
                },
            },
        );

        return res.status(201).json({
            type: 'transfer',
            id: parseInt(transacInfo.id, 10),
            date: new Date(transacInfo.date),
            amount: parseFloat(transacInfo.amount).toFixed(2),
            fromAccount: {
                id: parseInt(transacInfo.from_account_id, 10),
                name: transacInfo.from_accountName
            },
            toAccount: {
                id: parseInt(transacInfo.to_account_id, 10),
                name: transacInfo.to_accountName
            },
            note: transacInfo.note
        })
    } catch(err){
        console.error('Error creating the transfer transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to create transfer transaction' });
    }
}