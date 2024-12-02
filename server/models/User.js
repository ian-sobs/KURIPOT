const { Model } = require('sequelize');
const bcrypt = require('bcrypt')
const moment = require('moment')
//const {sequelize, connectDB} = require('../config/connection');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models){
      User.hasMany(models.Account, {
        foreignKey: {
            name: 'user_id',
            
            allowNull: false
        },
        onDelete: 'CASCADE',
      });
 
      User.hasMany(models.Budget, {
          foreignKey: {
              name: 'user_id',
              
              allowNull: false
          },
          onDelete: 'CASCADE',
      });

      User.hasMany(models.RecurrTransacGrp, {
          foreignKey: {
              name: 'user_id',
              
              allowNull: false
          },
          onDelete: 'CASCADE',
      });

      User.hasMany(models.Category, {
          foreignKey: {
              name: 'user_id',
              
              allowNull: false
          },
          onDelete: 'CASCADE',
      });

      User.hasMany(models.Transaction, {
          foreignKey: {
              name: 'user_id',
              
              allowNull: false
          },
          onDelete: 'CASCADE',
      });

      User.hasMany(models.BudgetCategory, {
          foreignKey: {
              name: 'user_id',
              
              allowNull: false
          },
          onDelete: 'CASCADE',
      });

    }
  }

  User.init(
    {
      // Model attributes are defined here
      id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
      },
      birthDate:{
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false
      },
      password:{
        type: DataTypes.STRING(72), //72 characters long to store password hashes
        set(value) {
          const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10; // Adjust the salt rounds as necessary for security and performance
          const hashedPassword = bcrypt.hashSync(value, saltRounds);
          this.setDataValue('password', hashedPassword);
        },

        allowNull: false,
      },
      isFirstLogin:{
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    },
    {
      // Other model options go here
      sequelize,
      modelName: 'User',
      tableName: 'users',

      // add an option such that when a user is deleted, any record that references a users record, directly or indirectly, is also deleted
    },
  );

  return User
}