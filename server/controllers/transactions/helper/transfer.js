const db = require('../../../db/models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Account} = sequelize.models

exports.transfer = async (toTransfer, usrId) => {
    if(toTransfer.type !== 'transfer'){
        return null
    }

    toTransfer.amount = Math.abs(toTransfer.amount)

    const [affectedToAccountsNum, affectedToAccounts] = await Account.update(
        {
            amount: Sequelize.literal(`amount + ${toTransfer.amount}`)
        },
        {
            where: {
                id: toTransfer.to_account_id,
                user_id: usrId
            },
            returning: true
        }
    );

    const [affectedToAccount] = affectedToAccounts

    const [affectedFromAccountsNum, affectedFromAccounts] = await Account.update(
        {
            amount: Sequelize.literal(`amount - ${toTransfer.amount}`)
        },
        {
            where: {
                id: toTransfer.from_account_id,
                user_id: usrId
            },
            returning: true
        }
    );

    const [affectedFromAccount] = affectedFromAccounts

    return {
        toAccount: {
            affectedNum: affectedToAccountsNum,
            affected: affectedToAccount
        },
        fromAccount: {
            affectedNum: affectedFromAccountsNum,
            affected: affectedFromAccount
        }
    }
}