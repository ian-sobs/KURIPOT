const db = require('../../db/models/index')
const {sequelize} = db
const {Transaction, Account, Category} = sequelize.models

exports.makeIncome = async function makeIncome(req, res){
    let {date, amount, accountId, categoryId, note, recurrId} = req.body
    const {usrId} = req.user
    amount = parseFloat(amount)

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
            date: new Date(new Date(date).toISOString()),
            category_id: categoryInfo.id,
            categoryName: categoryInfo.name,
            from_account_id: null,
            from_accountName: null,
            to_accountId: null,
            to_accountName: null,
            note: note,
            recurrId: recurrId,
            type: 'income'
        })

      //  console.log("accountInfo.amount:", accountInfo.amount); // Should log the current account amount
      //  console.log("transacInfo.amount:", transacInfo.amount);

        // Change everyone without a last name to "Doe"
        await Account.update(
            { amount: parseFloat((parseFloat(accountInfo.amount) + parseFloat(transacInfo.amount)).toFixed(2)) },
            {
                where: {
                    id: accountInfo.id,
                    user_id: parseInt(usrId, 10)
                },
            },
        );

        return res.status(201).json({
            type: 'income', 
            id: parseInt(transacInfo.id, 10),
            date: new Date(transacInfo.date),
            amount: parseFloat(transacInfo.amount).toFixed(2),
            account: {
                id: parseInt(transacInfo.account_id, 10),
                name: transacInfo.accountName
            },
            category: {
                id: parseInt(transacInfo.category_id, 10),
                name: transacInfo.categoryName
            },
            note: transacInfo.note,
            recurrId: parseInt(transacInfo.recurrId, 10)
        })
    } catch(err){
      //  console.error('Error creating the income transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to create income transaction' });
    }
}