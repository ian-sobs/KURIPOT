const db = require('../../../db/models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Account} = sequelize.models

exports.transfer = async (toTransfer, usrId) => {
    if(toTransfer.type !== 'transfer'){
        return null
    }

    let transferAmount = parseFloat(Math.abs(toTransfer.amount))

    let toAccount = await Account.findByPk(toTransfer.to_account_id, {
        attributes: ['amount']
    })
    let toAccountBalance = parseFloat(toAccount.amount)
    let newToAccountBalance = toAccountBalance + transferAmount

    const [affectedToAccountsNum, affectedToAccounts] = await Account.update(
        {
            amount: newToAccountBalance
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

    let fromAccount = await Account.findByPk(toTransfer.from_account_id, {
        attributes: ['amount']
    })
    let fromAccountBalance = parseFloat(fromAccount.amount)
    let newFromAccountBalance = fromAccountBalance - transferAmount

    const [affectedFromAccountsNum, affectedFromAccounts] = await Account.update(
        {
            amount: newFromAccountBalance
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