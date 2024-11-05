const {DataTypes, Model } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

class User extends Model {}

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
      allowNull: false,
    },
    birthDate:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false
    },
    password:{
      type: DataTypes.STRING(72),
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
    modelName: User,
    tableName: 'users',

    // add an option such that when a user is deleted, any record that references a users record, directly or indirectly, is also deleted
  },
);

module.exports = User;