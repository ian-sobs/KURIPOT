
const db = require('../../../models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Account} = sequelize.models
const {retTransac} = require('./helper/retTransac')

exports.unspendUnearn = async (toUnspendUnearn, usrId) => {
    if(toUnspendUnearn.type !== 'income' && toUnspendUnearn.type !== 'expense'){
        return null
    }

    if((toUnspendUnearn.amount > 0 && toUnspendUnearn.type === 'expense') || (toUnspendUnearn.amount < 0 && toUnspendUnearn.type === 'income')){
            toUnspendUnearn.amount = -toUnspendUnearn.amount
    }

    const [affectedAccountsNum, affectedAccounts] = await Account.update(
        {
            amount: Sequelize.literal(`amount - ${toUnspendUnearn.amount}`)
        },
        {
            where: {
                id: toUnspendUnearn.account_id,
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