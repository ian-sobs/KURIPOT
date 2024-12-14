const db = require('../../db/models/index')
const {Sequelize} = require('sequelize')
const {sequelize} = db
const {Transaction, Account, Category} = sequelize.models
// const {retTransac} = require('./helper/retTransac')
const {untransfer} = require('./helper/untransfer')
const {unspendUnearn} = require('./helper/unspendUnearn')

exports.deleteTransac = async (req, res) => {
    const {usrId} = req.user
    let {id} = req.body //id is the ID of the transaction to be deleted

    id = parseInt(id, 10)

    if(isNaN(id)){
        return res.status(400).json({message: 'Invalid transaction ID was given'})
    }

    try {
        let oldTransacInfo = await Transaction.findOne({
            where: {
                user_id: usrId,
                id: id
            }
        })

        if(!oldTransacInfo){
            return res.status(400).json({message: 'Transaction with the given ID does not exist'})
        }

        let numRowsDeleted = await Transaction.destroy({
            where: {
                user_id: usrId,
                id: id
            }
        })

        if(numRowsDeleted <= 0){
            return res.status(400).json({message: 'Transaction with the given ID does not exist'})
        }

        if(oldTransacInfo.type === 'transfer'){
            untransfer(oldTransacInfo, usrId)
        }
        else{
            unspendUnearn(oldTransacInfo, usrId)
        }

        return res.status(200).json({message: 'Transaction with the given ID was deleted'})
    } catch (error) {
        console.error('Failed to delete the transaction', error)
        return res.status(500).json({message: `Failed to delete the transaction with id ${id}`})
    }

}