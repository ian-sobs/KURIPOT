
const db = require('../../../db/models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Account} = sequelize.models

exports.unspendUnearn = async (toUnspendUnearn, usrId) => {
    if(toUnspendUnearn.type !== 'income' && toUnspendUnearn.type !== 'expense'){
        return null
    }

    let deductBy = parseFloat(toUnspendUnearn.amount)

    if((deductBy > 0 && toUnspendUnearn.type === 'expense') || (deductBy < 0 && toUnspendUnearn.type === 'income')){
            deductBy = -deductBy
    }

    let currentAccount = await Account.findByPk(parseInt(toUnspendUnearn.account_id, 10), {
        attributes: ['amount']
    })
    console.log('unspeadEarn curr account balance', currentAccount.amount)
    console.log('deductBy', deductBy)
    let currentAmount = parseFloat(currentAccount.amount)
    let newBalance = currentAmount - deductBy

    console.log('newBalance', newBalance)
    const [affectedAccountsNum, affectedAccounts] = await Account.update(
        {
            amount: newBalance
        },
        {
            where: {
                id: toUnspendUnearn.account_id,
                user_id: usrId
            },
            returning: true
        }
    );

    console.log("affectedAccountsNum", affectedAccountsNum)
    console.log("affectedAccounts", affectedAccounts)
    const [affectedAccount] = affectedAccounts

    return {
        affectedAccountsNum: affectedAccountsNum,
        affectedAccount: affectedAccount
    }
}