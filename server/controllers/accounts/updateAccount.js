const db = require('../../db/models/index');
const sequelize = db.sequelize;
const { Account, Transaction } = sequelize.models;

exports.updateAccount = async (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ message: 'Account ID is required' });
  }

  const { usrId } = req.user;
  let updateObj = {};
  let updatedFields = Object.keys(req.body).filter(
    (field) => field !== 'id' && field !== 'user_id'
  );
  
  updatedFields.forEach(fieldUpdate => {
    updateObj[fieldUpdate] = req.body[fieldUpdate];
  });

  try {
    let oldAccount = await Account.findByPk(req.body.id);

    let [affectedRowsNum, affectedRows] = await Account.update(updateObj, {
      where: {
        id: req.body.id,
        user_id: usrId
      },
      returning: true
    });

    if (affectedRowsNum === 0) {
      return res.status(404).json({ message: 'Account not found or no changes made' });
    }

    let [updatedAccount] = affectedRows;

    let [numTransacAffected, transacAffected] = await Transaction.update(
      { accountName: updatedAccount.name },
      {
        where: {
          account_id: updatedAccount.id,
          user_id: usrId
        }
      }
    );

    let diffTransac;

    // Handle changes in the amount
    if (oldAccount.amount !== updatedAccount.amount) {
      let transacType;
      if (oldAccount.amount > updatedAccount.amount) {
        transacType = 'expense';
      } else {
        transacType = 'income';
      }

      diffTransac = await Transaction.create({
        user_id: usrId,
        amount: (updatedAccount.amount - oldAccount.amount).toFixed(2),
        account_id: updatedAccount.id,
        accountName: updatedAccount.name,
        date: updatedAccount.updatedAt,
        category_id: null,
        categoryName: 'Other',
        from_account_id: null,
        from_accountName: null,
        to_accountId: null,
        to_accountName: null,
        note: req.body.note || 'Amount changed',
        recurrId: null,
        type: transacType
      });
    }

    // Handle changes in the name
    if (oldAccount.name !== updatedAccount.name) {
      let [numTransacAffectedForName, transacAffectedForName] = await Transaction.update(
        { accountName: updatedAccount.name },
        {
          where: {
            account_id: updatedAccount.id,
            user_id: usrId
          }
        }
      );
    }

    res.status(200).json({
      updatedAccount: updatedAccount,
      diffTransac: diffTransac,
      numTransacAffected: numTransacAffected
    });
  } catch (error) {
    console.error('Error updating the account:', error); // Log the error
    return res.status(500).json({ message: 'Failed to update account' }); // Respond with an error        
  }
};
