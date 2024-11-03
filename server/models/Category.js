const {DataTypes } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

const Category = sequelize.define(
  'Category',
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
    isIncome: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  },
  {
    // Other model options go here
    tableName: 'categories',

    // Deleting a category does not delete transactions assigned to that category.

    // Deleting a category will also delete a record in `categoriesInBudgets` table that references the deleted category record.
  },
);

module.exports = Category;