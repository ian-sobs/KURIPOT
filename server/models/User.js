const {DataTypes } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
      defaultValue: 1,
    }
  },
  {
    // Other model options go here
    tableName: 'users',

    // add an option such that when a user is deleted, any record that references a users record, directly or indirectly, is also deleted
  },
);
