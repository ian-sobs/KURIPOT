const db = require('../../db/models/index');
const { Sequelize } = require('sequelize');
const { sequelize } = db;
const { Transaction, Account } = sequelize.models;

exports.deleteTransac = async (req, res) => {
    const { usrId } = req.user;
    let { id, type } = req.body; // id is the ID of the transaction to be deleted

    id = parseInt(id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid transaction ID was given' });
    }

    // Start a transaction to ensure atomicity
    const t = await sequelize.transaction();

    try {
        // Find the transaction to delete
        let oldTransacInfo = await Transaction.findOne({
            where: {
                user_id: usrId,
                id: id,
            },
            transaction: t,
        });

        if (!oldTransacInfo) {
            await t.rollback();
            return res.status(400).json({ message: 'Transaction with the given ID does not exist' });
        }

        if(type == 'income' || type == 'expense'){
            let oldTransacInfoAmount = oldTransacInfo.amount

            // Determine the account affected by this transaction
            const account = await Account.findOne({
                where: {
                    id: oldTransacInfo.account_id,
                    user_id: usrId,
                },
                transaction: t,
            });

            if (!account) {
                await t.rollback();
                return res.status(400).json({ message: 'Account associated with the transaction does not exist' });
            }

            // Update balances based on transaction type

            //console.log('Before Update:', account.amount, 'Transaction Amount:', oldTransacInfo.amount);
            
            // let parsedOldTransacAmount = parseFloat(oldTransacInfo.amount)
            // let parsedAccountAmount = parseFloat(account.amount)

            if((oldTransacInfo.type === 'income' && oldTransacInfoAmount < 0) || (oldTransacInfo.type === 'expense' && oldTransacInfoAmount > 0)){
                oldTransacInfoAmount = -oldTransacInfoAmount
            }

            account.amount = parseFloat((parseFloat(account.amount) - oldTransacInfoAmount).toFixed(2));

            // if (oldTransacInfo.type === 'income') {
            //     console.log('After Income Update:', account.amount);
            // } else if (oldTransacInfo.type === 'expense') {
            //     console.log('After Expense Update:', account.amount);
            // }

            console.log('Updated Account Amount:', account.amount);

            // Ensure the amount is valid (not NaN or invalid value)
            if (isNaN(account.amount)) {
                await t.rollback();
                return res.status(500).json({ message: 'Error calculating the new account balance' });
            }

            // Save the updated account amount
            await account.save({ transaction: t });

            // Delete the transaction
            const numRowsDeleted = await Transaction.destroy({
                where: {
                    user_id: usrId,
                    id: id,
                },
                transaction: t,
            });

            if (numRowsDeleted <= 0) {
                await t.rollback();
                return res.status(400).json({ message: 'Transaction with the given ID does not exist' });
            }
        }
        else if(type == 'transfer'){
            let oldTransacInfoAmount = oldTransacInfo.amount

            // Determine the account affected by this transaction
            const toAccount = await Account.findOne({
                where: {
                    id: oldTransacInfo.to_account_id,
                    user_id: usrId,
                },
                transaction: t,
            });

            const fromAccount = await Account.findOne({
                where: {
                    id: oldTransacInfo.from_account_id,
                    user_id: usrId,
                },
                transaction: t,
            });

            if (!toAccount || !fromAccount) {
                await t.rollback();
                return res.status(400).json({ message: 'Transfer has no source or destination account' });
            }

            // Update balances based on transaction type

            //console.log('Before Update:', account.amount, 'Transaction Amount:', oldTransacInfo.amount);
            
            // let parsedOldTransacAmount = parseFloat(oldTransacInfo.amount)
            // let parsedAccountAmount = parseFloat(account.amount)

            oldTransacInfoAmount = Math.abs(oldTransacInfoAmount)

            toAccount.amount = parseFloat((parseFloat(toAccount.amount) - oldTransacInfoAmount).toFixed(2));
            fromAccount.amount = parseFloat((parseFloat(fromAccount.amount) + oldTransacInfoAmount).toFixed(2));
            // if (oldTransacInfo.type === 'income') {
            //     console.log('After Income Update:', account.amount);
            // } else if (oldTransacInfo.type === 'expense') {
            //     console.log('After Expense Update:', account.amount);
            // }

            console.log('Updated destination account amount:', toAccount.amount);
            console.log('Updated source account amount:', fromAccount.amount);

            // Ensure the amount is valid (not NaN or invalid value)
            if (isNaN(toAccount.amount) || isNaN(fromAccount.amount)) {
                await t.rollback();
                return res.status(500).json({ message: 'Error calculating the new account balance' });
            }

            // Save the updated account amount
            await toAccount.save({ transaction: t });
            await fromAccount.save({ transaction: t });

            // Delete the transaction
            const numRowsDeleted = await Transaction.destroy({
                where: {
                    user_id: usrId,
                    id: id,
                },
                transaction: t,
            });

            if (numRowsDeleted <= 0) {
                await t.rollback();
                return res.status(400).json({ message: 'Transaction with the given ID does not exist' });
            }
        }
        // Commit the transaction
        await t.commit();

        // Return success response
        return res.status(200).json({ message: 'Transaction with the given ID was deleted successfully' });
    } catch (error) {
        // Rollback the transaction in case of an error
        await t.rollback();
        console.error('Failed to delete the transaction', error);
        return res.status(500).json({ message: `Failed to delete the transaction with id ${id}` });
    }
};
