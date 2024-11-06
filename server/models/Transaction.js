const {DataTypes, Model } = require('sequelize');
const {sequelize, connectDB} = require('../config/connection');
const Account = require('./Account');
const RecurrTransacGrp = require('./RecurrTransacGrp');

class Transaction extends Model{}

Transaction.init(
  {
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: User,
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(16,2),
      defaultValue: 0,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: Account,
        key: 'id'
      }
    },
    accountName: DataTypes.STRING,
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,

      references: {
        model: Category,
        key: 'id'
      }
    },
    categoryName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    from_account_id: {
      type: DataTypes.INTEGER,

      references: {
        model: Account,
        key: 'id'
      }
    },
    from_accountName: DataTypes.STRING,
    to_account_id: {
      type: DataTypes.INTEGER,

      references: {
        model: Account,
        key: 'id'
      }
    },
    to_accountName: DataTypes.STRING,
    note: DataTypes.STRING,
  
    recurr_id: {
      type: DataTypes.INTEGER,

      references: {
        model: RecurrTransacGrp,
        key: 'id'
      }
    }
  },
  {
    // Other model options go here
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
  },
);

module.exports = Transaction;