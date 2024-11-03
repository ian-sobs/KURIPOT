const {DataTypes } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

const Budget = sequelize.define(
  'Budget',
  {
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // implement user_id foreign key
    date:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    amount:{
      type: DataTypes.DECIMAL(18,2),
      allowNull: false,
      defaultValue: 0,
    },
    type:{
      type: DataTypes.ENUM('expense', 'income'),
      allowNull: false,
    },
    period:{
      type: DataTypes.ENUM('weekly', 'monthly', 'yearly'),
      allowNull: false,
    }
  },
  {
    // Other model options go here
    tableName: 'budgets',

    // add an option such that when a budget record is deleted, any record in categoriesInBudgets table that references a budget record is also deleted
  },
);

module.exports = Budget;