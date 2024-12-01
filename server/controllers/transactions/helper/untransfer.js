
const db = require('../../../models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Account} = sequelize.models

exports.untransfer = async (toUntransfer, usrId) => {
    if(toUntransfer.type !== 'transfer'){
        return null
    }

    toUntransfer.amount = Math.abs(toUntransfer.amount)

    const [affectedToAccountsNum, affectedToAccounts] = await Account.update(
        {
            amount: Sequelize.literal(`amount - ${toUntransfer.amount}`)
        },
        {
            where: {
                id: toUntransfer.to_account_id,
                user_id: usrId
            }
        }
    );

    const [affectedToAccount] = affectedToAccounts

    const [affectedFromAccountsNum, affectedFromAccounts] = await Account.update(
        {
            amount: Sequelize.literal(`amount + ${toUntransfer.amount}`)
        },
        {
            where: {
                id: toUntransfer.from_account_id,
                user_id: usrId
            }
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