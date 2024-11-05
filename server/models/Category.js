const {DataTypes, Model } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

class Category extends Model{}

Category.init(
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
        key: 'id'
      }
    },
    isIncome: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
  },
  {
    // Other model options go here
    modelName: 'Category',
    sequelize,
    tableName: 'categories',

    // Deleting a category does not delete transactions assigned to that category.

    // Deleting a category will also delete a record in `categoriesInBudgets` table that references the deleted category record.
  },
);

module.exports = Category;