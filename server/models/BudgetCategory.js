const {DataTypes, Model } = require('sequelize');
const {sequelize, connectDB} = require('../config/connection');

class BudgetCategory extends Model{}

BudgetCategory.init(
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
        key: 'id'
      }
    }
    ,
    budget_id: {
      type: DataTypes.INTEGER,

      references: {
        model: Budget,
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.INTEGER,

      references: {
        model: Category,
        key: 'id'
      }
    },
    categoryLimit:{
        type: DataTypes.DECIMAL(18,2),
        defaultValue: 0,
        allowNull: false,
    },

  },
  {
    // Other model options go here
    tableName: 'budgetCategories',
    modelName: 'BudgetCategory',
    sequelize

    
  },
);

module.exports = BudgetCategory;