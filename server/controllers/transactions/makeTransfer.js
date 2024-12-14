const db = require('../../db/models/index');
const { sequelize } = db;
const { Transaction, Account, Category } = sequelize.models;

exports.makeTransfer = async function makeTransfer(req, res) {
    let { amount, fromAccountId, toAccountId, note } = req.body;
    const { usrId } = req.user;

    if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than zero" });
    }

    const t = await sequelize.transaction(); // Start a transaction

    try {
        // Fetch account details for both fromAccount and toAccount
        let fromAccountInfo = await Account.findOne({
            where: {
                id: fromAccountId,
                user_id: usrId,
            },
            attributes: ['id', 'name', 'amount'],
        });

        let toAccountInfo = await Account.findOne({
            where: {
                id: toAccountId,
                user_id: usrId,
            },
            attributes: ['id', 'name', 'amount'],
        });

        // If either account doesn't exist, return an error
        if (!fromAccountInfo || !toAccountInfo) {
            return res.status(400).json({ message: 'One or both accounts do not exist' });
        }

        // Check if fromAccount has enough balance for the transfer
        if (fromAccountInfo.amount < amount) {
            return res.status(400).json({ message: "Insufficient balance in the 'from account'" });
        }

        // Create the transaction record
        let transacInfo = await Transaction.create({
            user_id: usrId,
            amount: amount,
            account_id: null, // Could be set later if needed
            accountName: null,
            date: new Date(), // Current date if not provided
            category_id: null, // Set later if needed
            categoryName: null,
            from_account_id: fromAccountInfo.id,
            from_accountName: fromAccountInfo.name,
            to_account_id: toAccountInfo.id,
            to_accountName: toAccountInfo.name,
            note: note,
            recurrId: null,
            type: 'transfer',
        }, { transaction: t }); // Use the transaction

        // Debugging: Log before updating
        console.log('Before updating:');
        console.log('From Account Amount:', fromAccountInfo.amount);
        console.log('To Account Amount:', toAccountInfo.amount);

        // Update the balance of the fromAccount (subtract amount)
        const fromUpdate = await Account.update(
            { amount: fromAccountInfo.amount - amount },
            {
                where: {
                    id: fromAccountInfo.id,
                    user_id: usrId,
                },
                transaction: t, // Use the transaction
            }
        );

        // Debugging: Log update result for fromAccount
        console.log('From Account Update Result:', fromUpdate);

        // Refetch toAccountInfo to ensure the most recent data
        toAccountInfo = await Account.findOne({
            where: {
                id: toAccountId,
                user_id: usrId,
            },
            attributes: ['id', 'name', 'amount'],
        });

        // Ensure the target account (`toAccount`) is updated correctly
        const toUpdate = await Account.update(
            { amount: toAccountInfo.amount + amount },
            {
                where: {
                    id: toAccountInfo.id,
                    user_id: usrId,
                },
                transaction: t, // Use the transaction
            }
        );

        // Debugging: Log update result for toAccount
        console.log('To Account Update Result:', toUpdate);

        // Check if the toAccount was successfully updated
        if (toUpdate[0] === 0) {
            console.error('Failed to update the target account');
            await t.rollback();
            return res.status(500).json({ message: 'Failed to update the target account' });
        }

        // Commit the transaction if all operations are successful
        await t.commit();

        // Return the successful response
        return res.status(201).json({
            type: 'transfer',
            id: transacInfo.id,
            date: transacInfo.date,
            amount: transacInfo.amount,
            fromAccount: {
                id: transacInfo.from_account_id,
                name: transacInfo.from_accountName,
            },
            toAccount: {
                id: transacInfo.to_account_id,
                name: transacInfo.to_accountName,
            },
            note: transacInfo.note,
        });
    } catch (err) {
        // Rollback the transaction in case of an error
        await t.rollback();
        console.error('Error creating the transfer transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to create transfer transaction' });
    }
};
