const {DataTypes } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

const Account = sequelize.define(
  'Account',
  {
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // have to implement user_id foreign key
    amount: {
        type: DataTypes.DECIMAL(16,2),
    }
  },
  {
    // Other model options go here
    tableName: 'accounts',

  },
);

module.exports = Account;