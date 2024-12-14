const db = require('../../db/models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Transaction, Account, Category} = sequelize.models
const {retTransac} = require('./helper/retTransac')
// const {matchAmountToType} = require('./helper/matchAmountToType')
const {untransfer} = require('./helper/untransfer')
const {transfer} = require('./helper/transfer')
const {unspendUnearn} = require('./helper/unspendUnearn')
const {spendEarn} = require('./helper/spendEarn')

async function getAccountInfo(id, user_id){
    let accountInfo = await Account.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        })


    return accountInfo
}

async function getCategoryInfo(id, user_id){
    let categoryInfo = await Category.findOne({
            where: {
                id: id,
                user_id: user_id
            }
        })


    return categoryInfo
}

async function toIncomeOrExpense(req, res, oldTransacInfo){
    const {usrId} = req.user;
    let {
        id,
        amount,
        account_id,
        date,
        category_id,
        note,
        type
    } = req.body;
    let updateFields = {
        from_account_id: null,
        from_accountName: null,
        to_account_id: null,
        to_accountName: null,
    };

    amount = parseFloat(amount).toFixed(2);
    if(!isNaN(amount)){
        if((amount < 0 && type === 'income') || (amount > 0 && type === 'expense')){
            amount = -amount;
        }
        updateFields['amount'] = amount;
    }
    
    account_id = parseInt(account_id, 10);
    
    if(!isNaN(account_id)){
        let accountInfo = await getAccountInfo(account_id, usrId);

        if(!accountInfo){
            return res.status(400).json({message: 'The account with the given account ID does not exist'});
        }
        updateFields['account_id'] = account_id;
        updateFields['accountName'] = accountInfo.name;
    }

    category_id = parseInt(category_id, 10);

    if(!isNaN(category_id)){
        let categoryInfo = await getCategoryInfo(category_id, usrId);
        if(!categoryInfo){
            return res.status(400).json({message: 'The category with the given category ID does not exist'});
        }
        updateFields['category_id'] = category_id;
        updateFields['categoryName'] = categoryInfo.name;

    }

    if(date){
        date = new Date(date).toISOString();
        updateFields['date'] = date;
    }

    if(note){
        updateFields['note'] = note;
    }

    updateFields['type'] = type;

    try {
        const [affectedCount, affectedRows] = await Transaction.update(
            updateFields,
            {
                where: {
                    id: oldTransacInfo.id,
                    user_id: usrId
                },
                returning: true
            }
        );

        if(affectedCount <= 0){
            return res.status(204).json({message: 'No changes were made'})
        }

        // consider the case when the transaction was initially a transfer
        let [updatedTransacInfo] = affectedRows
        if(oldTransacInfo.type !== 'transfer'){
            // await Account.update(
            //     {
            //         amount: Sequelize.literal(`amount - ${oldTransacInfo.amount}`)
            //     },
            //     {
            //         where: {
            //             id: oldTransacInfo.account_id,
            //             user_id: usrId
            //         }
            //     }
            // );
            unspendUnearn(oldTransacInfo, usrId)
        }
        else{
            // await Account.update(
            //     {
            //         amount: Sequelize.literal(`amount - ${oldTransacInfo.amount}`)
            //     },
            //     {
            //         where: {
            //             id: oldTransacInfo.to_account_id,
            //             user_id: usrId
            //         }
            //     }
            // );
            // await Account.update(
            //     {
            //         amount: Sequelize.literal(`amount + ${oldTransacInfo.amount}`)
            //     },
            //     {
            //         where: {
            //             id: oldTransacInfo.from_account_id,
            //             user_id: usrId
            //         }
            //     }
            // );
            untransfer(oldTransacInfo, usrId)
        }

        spendEarn(updatedTransacInfo, usrId)

        // await Account.update(
        //     {
        //         amount: Sequelize.literal(`amount + ${updatedTransacInfo.amount}`)
        //     },
        //     {
        //         where: {
        //             id: updatedTransacInfo.account_id,
        //             user_id: usrId
        //         }
        //     }
        // );

        return res.status(200).json(retTransac(updatedTransacInfo))
    } catch (error) {
        console.error('Error updating transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to update the transaction' });
    }



}

async function toTransfer(req, res, oldTransacInfo){
    const {usrId} = req.user;
    let {
        id,
        amount,
        from_account_id,
        date,
        to_account_id,
        note,
        type
    } = req.body;
    let updateFields = {
        account_id: null,
        accountName: null,
        category_id: null,
        categoryName: null,
    };

    amount = parseFloat(amount).toFixed(2);
    if(!isNaN(amount)){
        amount = Math.abs(amount)
        updateFields['amount'] = amount;
    }

    from_account_id = parseInt(from_account_id, 10);
    
    if(!isNaN(from_account_id)){
        let fromAccountInfo = await getAccountInfo(from_account_id, usrId);

        if(!fromAccountInfo){
            return res.status(400).json({message: 'The account with the given account ID does not exist'});
        }
        updateFields['from_account_id'] = from_account_id;
        updateFields['from_accountName'] = fromAccountInfo.name;
    }

    to_account_id = parseInt(to_account_id, 10);
    
    if(!isNaN(to_account_id)){
        let toAccountInfo = await getAccountInfo(to_account_id, usrId);

        if(!toAccountInfo){
            return res.status(400).json({message: 'The account with the given account ID does not exist'});
        }
        updateFields['to_account_id'] = to_account_id;
        updateFields['from_accountName'] = toAccountInfo.name;
    }

    if(date){
        date = new Date(date).toISOString();
        updateFields['date'] = date;
    }

    if(note){
        updateFields['note'] = note;
    }

    updateFields['type'] = type;

    try {
        const [affectedCount, affectedRows] = await Transaction.update(
            updateFields,
            {
                where: {
                    id: oldTransacInfo.id,
                    user_id: usrId
                },
                returning: true
            }
        );

        if(affectedCount <= 0){
            return res.status(204).json({message: 'No changes were made'})
        }

        // consider the case when the transaction was initially a transfer
        let [updatedTransacInfo] = affectedRows
        if(oldTransacInfo.type !== 'transfer'){
            // await Account.update(
            //     {
            //         amount: Sequelize.literal(`amount - ${oldTransacInfo.amount}`)
            //     },
            //     {
            //         where: {
            //             id: oldTransacInfo.account_id,
            //             user_id: usrId
            //         }
            //     }
            // );
            unspendUnearn(oldTransacInfo, usrId)
        }
        else{
            // await Account.update(
            //     {
            //         amount: Sequelize.literal(`amount - ${oldTransacInfo.amount}`)
            //     },
            //     {
            //         where: {
            //             id: oldTransacInfo.to_account_id,
            //             user_id: usrId
            //         }
            //     }
            // );
            // await Account.update(
            //     {
            //         amount: Sequelize.literal(`amount + ${oldTransacInfo.amount}`)
            //     },
            //     {
            //         where: {
            //             id: oldTransacInfo.from_account_id,
            //             user_id: usrId
            //         }
            //     }
            // );
            untransfer(oldTransacInfo, usrId)

        }

        transfer(updatedTransacInfo, usrId)
        // await Account.update(
        //     {
        //         amount: Sequelize.literal(`amount + ${updatedTransacInfo.amount}`)
        //     },
        //     {
        //         where: {
        //             id: updatedTransacInfo.to_account_id,
        //             user_id: usrId
        //         }
        //     }
        // );

        // await Account.update(
        //     {
        //         amount: Sequelize.literal(`amount - ${updatedTransacInfo.amount}`)
        //     },
        //     {
        //         where: {
        //             id: updatedTransacInfo.from_account_id,
        //             user_id: usrId
        //         }
        //     }
        // );

        return res.status(200).json(retTransac(updatedTransacInfo))
    } catch (error) {
        console.error('Error updating transaction:', err); // Log the error
        return res.status(500).json({ message: 'Failed to update the transaction' });
    }
}

exports.updateTransac = async (req, res) => {
    const {usrId} = req.user
    let {id, type} = req.body

    if(!id || !type){
        return res.status(400).json({message: 'Provide ID and type of the transaction to update.'})
    }

    let oldTransacInfo = await Transaction.findOne({
        where: {
            id: id,
            user_id: usrId
        }
    })

    if(!oldTransacInfo){
        return res.status(400).json({message: 'Transaction to update does not exist'})
    }

    switch(type){
        case 'income':
            await toIncomeOrExpense(req, res, oldTransacInfo)
            return;
        case 'expense':
            await toIncomeOrExpense(req, res, oldTransacInfo)
            return;
        case 'transfer':
            await toTransfer(req, res, oldTransacInfo)
            return;
        default:
            return res.status(400).json({message: 'Invalid type specified'})
    }

}