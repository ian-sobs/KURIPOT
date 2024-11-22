const {Model } = require('sequelize');
// const { sequelize } = require('.');
//const {sequelize, connectDB} = require('../config/connection');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model{
    static associate(models){
      Category.belongsTo(models.User, {
          foreignKey:{ 
            name: 'user_id',
            allowNull: false
        }
      })
      Category.hasMany(models.Transaction,{
          foreignKey: {
              name: 'category_id',

              allowNull: true
          }
      })

      Category.hasMany(models.BudgetCategory,{
          foreignKey: {
              name: 'category_id',

              allowNull: false
          },
          onDelete: 'CASCADE'
      })

      Category.belongsToMany(models.Budget, {
        through: models.BudgetCategory,
        unique: false,
        foreignKey: 'category_id',
        otherKey: 'budget_id'       
      })
    }
  }

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

        // references: {
        //   model: User,
        //   key: 'id'
        // }
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
  return Category
}