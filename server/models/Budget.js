const {Model } = require('sequelize');
//const {sequelize, connectDB} = require('../config/connection');
//const User = require('./User');

module.exports = (sequelize, DataTypes) => {

  class Budget extends Model{
    static associate(models){
      Budget.belongsTo(models.User, {
        foreignKey:{ 
          name: 'user_id',
          allowNull: false
      }
    })
      Budget.hasMany(models.BudgetCategory, {
        foreignKey: {
            name: 'budget_id',

            allowNull: false
        },
        onDelete: 'CASCADE'      
      }),

      Budget.belongsToMany(models.Category, {
        through: models.BudgetCategory,
        unique: false,
        foreignKey: 'budget_id',
        otherKey: 'category_id'
      })
    }
  }

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
        allowNull: false,
        // references: {
        //   model: User, 
        //   key: 'id',
        // }
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

  return Budget
}