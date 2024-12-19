
const db = require('../../../db/models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Account} = sequelize.models

exports.untransfer = async (toUntransfer, usrId) => {
    if(toUntransfer.type !== 'transfer'){
        return null
    }

    let currToAccount = await Account.findByPk(parseInt(toUntransfer.to_account_id, 10), {
        attributes: ['amount']
    })
    let currToAccountBalance = parseFloat(currToAccount.amount)

    let currUntransferAmount = parseFloat(Math.abs(toUntransfer.amount))
    let newToAccountBalance = currToAccountBalance - currUntransferAmount

    const [affectedToAccountsNum, affectedToAccounts] = await Account.update(
        {
            amount: newToAccountBalance
        },
        {
            where: {
                id: toUntransfer.to_account_id,
                user_id: usrId
            },
            returning: true
        }
    );

    const [affectedToAccount] = affectedToAccounts

    let currFromAccount = await Account.findByPk(parseInt(toUntransfer.from_account_id, 10), {
        attributes: ['amount']
    })
    let currFromAccountBalance = parseFloat(currFromAccount.amount)
    let newFromAccountBalance = currFromAccountBalance + currUntransferAmount

    const [affectedFromAccountsNum, affectedFromAccounts] = await Account.update(
        {
            amount: newFromAccountBalance
        },
        {
            where: {
                id: toUntransfer.from_account_id,
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