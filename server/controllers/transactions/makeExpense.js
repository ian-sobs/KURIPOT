const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction, Account, Category} = sequelize.models

exports.makeExpense = async function makeExpense(req, res){
    let {date, amount, accountId, categoryId, note, recurrId} = req.body
    const {usrId} = req.user

    if(amount > 0){
        amount = -amount
    }

    try{
        let accountInfo = await Account.findOne({
            where: {
                id: accountId,
                user_id: usrId
            },
            attributes: ['id', 'name', 'amount']
        })

        if(!accountInfo){
            return res.status(400).json({message: 'no such account exists'})
        }

        let categoryInfo = await Category.findOne({
            where: {
                id: categoryId,
                user_id: usrId
            },
            attributes: ['id', 'name']
        })

        if(!categoryInfo){
            return res.status(400).json({message: 'no such category exists'})
        }

        let transacInfo = await Transaction.create({
            user_id: usrId,
            amount: amount,
            account_id: accountInfo.id,
            accountName: accountInfo.name,
            date: new Date(),
            category_id: categoryInfo.id,
            categoryName: categoryInfo.name,
            from_account_id: null,
            from_accountName: null,
            to_accountId: null,
            to_accountName: null,
            note: note,
            recurrId: recurrId,
            type: 'expense'
        })

        console.log("accountInfo.amount:", accountInfo.amount); // Should log the current account amount
        console.log("transacInfo.amount:", transacInfo.amount); // Should log the transaction amount

        // Change everyone without a last name to "Doe"
        await Account.update(
            { amount: (parseFloat(accountInfo.amount) + parseFloat(transacInfo.amount )).toFixed(2)},
            {
                where: {
                    id: accountInfo.id,
                    user_id: parseInt(usrId, 10)
                },
            },
        );

        return res.status(201).json({
            type: 'expense',
            id: transacInfo.id,
            date: transacInfo.date,
            amount: transacInfo.amount,
            account: {
                id: transacInfo.account_id,
                name: transacInfo.accountName
            },
            category: {
                id: transacInfo.category_id,
                name: transacInfo.categoryName
            },
            note: transacInfo.note,
            recurrId: transacInfo.recurrId
        })
    } catch(err){
        console.error('Error creating the expense transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to create expense transaction' });
    }
}