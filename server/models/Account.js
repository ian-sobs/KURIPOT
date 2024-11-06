const {DataTypes, Model } = require('sequelize');
const {sequelize, connectDB} = require('../config/connection');
const User = require('./User');

class Account extends Model{}

Account.init(
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
    user_id: {
      type: DataTypes.INTEGER,

      references: {
        model: User,
        key: 'id',
        // research if you need Deferrable options
      }
    },
    amount: {
        type: DataTypes.DECIMAL(18,2),
        defaultValue: 0
    }
  },
  {
    // Other model options go here
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
  },
);

module.exports = Account;