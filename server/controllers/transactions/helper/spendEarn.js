
const db = require('../../../db/models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Account} = sequelize.models

exports.spendEarn = async (toSpendEarn, usrId) => {
    let increaseBy = parseFloat(toSpendEarn.amount)
    if(toSpendEarn.type !== 'income' && toSpendEarn.type !== 'expense'){
        return null
    }
    if((increaseBy > 0 && toSpendEarn.type === 'expense') || (increaseBy < 0 && toSpendEarn.type === 'income')){
        increaseBy = -increaseBy
    }

    let currentAccount = await Account.findByPk(parseInt(toSpendEarn.account_id, 10), {
        attributes: ['amount']
    })

   // console.log('spendEarn account curr balance', currentAccount.amount)
  //  console.log('increaseBy', increaseBy)
    let currentAmount = parseFloat(currentAccount.amount)
    let newBalance = currentAmount + increaseBy

  //  console.log('newBalance', newBalance)

    const [affectedAccountsNum, affectedAccounts] = await Account.update(
        {
            amount: newBalance
        },
        {
            where: {
                id: toSpendEarn.account_id,
                user_id: usrId
            },
            returning: true
        }
    );

    const [affectedAccount] = affectedAccounts

    return {
        affectedAccountsNum: affectedAccountsNum,
        affectedAccount: affectedAccount
    }
}