const {DataTypes, Model } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');
const User = require('./User');

class Budget extends Model{}

Budget.init(
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

      references: {
        model: User, 
        key: 'id',
      }
    },
    date:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    budgetLimit:{
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      defaultValue: 0,
    },
    type:{
      type: DataTypes.ENUM('expense', 'income'),
      allowNull: false,
    }
  },
  {
    // Other model options go here
    sequelize,
    modelName: 'Budget',
    tableName: 'budgets',

    // add an option such that when a budget record is deleted, any record in categoryBudgets table that references a budget record is also deleted
  },
);

module.exports = Budget;