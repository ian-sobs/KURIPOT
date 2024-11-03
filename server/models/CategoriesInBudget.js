const {DataTypes } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

const CategoriesInBudget = sequelize.define(
  'CategoriesInBudget',
  {
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // implement budget_id foreign key
    // implement category_id foreign key
    categoryLimit:{
        type: DataTypes.DECIMAL(18,2),
        defaultValue: 0,
        allowNull: false,
    }
  },
  {
    // Other model options go here
    tableName: 'categoriesInBudgets',

    // add an option such that when a user is deleted, any record that references a users record, directly or indirectly, is also deleted
  },
);

module.exports = CategoriesInBudget;