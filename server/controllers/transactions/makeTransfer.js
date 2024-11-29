const db = require('../../models/index')
const {sequelize} = db
const {Transaction, Account, Category} = sequelize.models


exports.makeTransfer = async function makeTransfer(req, res){
    const {amount, fromAccountId, toAccountId, note} = req.body
    const {usrId} = req.user

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
            attributes: ['id', 'name', 'amount']
        })

        if(!fromAccountInfo || !toAccountInfo){
            return res.status(400).json({message: 'no such account exists'})
        }


        let transacInfo = await Transaction.create({
            user_id: usrId,
            amount: amount,
            account_id: null,
            accountName: null,
            date: date,
            category_id: null,
            categoryName: null,
            from_account_id: fromAccountInfo.id,
            from_accountName: fromAccountInfo.name,
            to_accountId: toAccountInfo.id,
            to_accountName: toAccountInfo.name,
            note: note,
            recurrId: null
        })

        await Account.update(
            { amount: fromAccountInfo.amount - transacInfo.amount },
            {
                where: {
                    id: fromAccountInfo.id,
                },
            },
        );

        await Account.update(
            { amount: toAccountInfo.amount + transacInfo.amount },
            {
                where: {
                    id: toAccountInfo.id,
                },
            },
        );

        return res.status(201).json({
            type: 'transfer',
            id: transacInfo.id,
            date: transacInfo.date,
            amount: transacInfo.amount,
            fromAccount: {
                id: transacInfo.from_account_id,
                name: transacInfo.from_accountName
            },
            toAccount: {
                id: transacInfo.to_accountId,
                name: transacInfo.to_accountName
            },
            note: transacInfo.note
        })
    } catch(err){
        console.error('Error creating the transfer transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to create transfer transaction' });
    }
}