const {Model } = require('sequelize');
//const {sequelize, connectDB} = require('../config/connection');

module.exports = (sequelize, DataTypes) => {
  class BudgetCategory extends Model{
    static associate(models){
      BudgetCategory.belongsTo(models.Budget, {foreignKey: 'budget_id'})
      BudgetCategory.belongsTo(models.User, {
        foreignKey:{ 
          name: 'user_id',
          allowNull: false
      }
    })
      BudgetCategory.belongsTo(models.Category, {foreignKey: 'category_id'})
    }
  }

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
        allowNull: false,
        // references: {
        //   model: User,
        //   key: 'id'
        // }
      }
      ,
      budget_id: {
        type: DataTypes.INTEGER,

        // references: {
        //   model: Budget,
        //   key: 'id'
        // }
      },
      category_id: {
        type: DataTypes.INTEGER,

        // references: {
        //   model: Category,
        //   key: 'id'
        // }
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
  return BudgetCategory
}