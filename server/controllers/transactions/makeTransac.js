const db = require('../../models/index')
const {sequelize} = db
const {Transaction, Account, Category} = sequelize.models

async function makeIncome(req, res){
    let {date, amount, accountId, categoryId, note, recurrId} = req.body
    const {usrId} = req.user

    if(amount < 0){
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
            date: date,
            category_id: categoryInfo.id,
            categoryName: categoryInfo.name,
            from_account_id: null,
            from_accountName: null,
            to_accountId: null,
            to_accountName: null,
            note: note,
            recurrId: recurrId
        })

        // Change everyone without a last name to "Doe"
        await Account.update(
            { amount: accountInfo.amount + transacInfo.amount },
            {
                where: {
                    id: accountInfo.id,
                },
            },
        );

        return res.status(201).json({
            type: 'income', 
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
        console.error('Error creating the income transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to create income transaction' });
    }
}

async function makeExpense(req, res){
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
            date: date,
            category_id: categoryInfo.id,
            categoryName: categoryInfo.name,
            from_account_id: null,
            from_accountName: null,
            to_accountId: null,
            to_accountName: null,
            note: note,
            recurrId: recurrId
        })

        // Change everyone without a last name to "Doe"
        await Account.update(
            { amount: accountInfo.amount + transacInfo.amount },
            {
                where: {
                    id: accountInfo.id,
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

async function makeTransfer(req, res){
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
        console.error('Error creating the transfer transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to create transfer transaction' });
    }
}

exports.makeTransac = async (req, res) => {
    let {type} = req.body

    switch(type){
        case 'income':
            return makeIncome(req, res);
        case 'expense':
            return makeExpense(req, res);
        case 'transfer':
            return makeTransfer(req, res);
        default:
            return res.status(400).json({ error: 'Invalid type' });
    }

}