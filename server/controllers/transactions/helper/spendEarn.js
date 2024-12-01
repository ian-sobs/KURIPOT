
const db = require('../../../models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Account} = sequelize.models
const {retTransac} = require('./helper/retTransac')

exports.spendEarn = async (toSpendEarn, usrId) => {
    if(toSpendEarn.type !== 'income' && toSpendEarn !== 'expense'){
        return null
    }
    if((toSpendEarn.amount > 0 && toSpendEarn.type === 'expense') || (toSpendEarn.amount < 0 && toSpendEarn.type === 'income')){
        toSpendEarn.amount = -toSpendEarn.amount
}

    const [affectedAccountsNum, affectedAccounts] = await Account.update(
        {
            amount: Sequelize.literal(`amount + ${toSpendEarn.amount}`)
        },
        {
            where: {
                id: toSpendEarn.account_id,
                user_id: usrId
            }
        }
    );

    const [affectedAccount] = affectedAccounts

    return {
        affectedAccountsNum: affectedAccountsNum,
        affectedAccount: affectedAccount
    }
}