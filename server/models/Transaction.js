const {DataTypes } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

const Transaction = sequelize.define(
  'Transaction',
  {
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(16,2),
      defaultValue: 0,
      allowNull: false,
    },
    // have to implement account_id foreign key
    date:{
        type: DataTypes.DATE,
        allowNull: false
    },
    // have to implement category_id foreign key
    categoryName:{
      type: DataTypes.STRING,
      allowNull: false
    },
    // have to implement from_account_id foreign key
    // have to implement to_account_id foreign key
    note:{
        type: DataTypes.STRING,
    }
    // have to implement recurr_id foreign key
  },
  {
    // Other model options go here
    tableName: 'transactions',
  },
);

module.exports = Transaction;