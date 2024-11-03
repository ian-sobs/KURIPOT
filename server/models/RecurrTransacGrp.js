const {DataTypes } = require('sequelize');
const {sequelize, connectDB} = require('../config/db');

const RecurrTransacGrp = sequelize.define(
  'RecurrTransacGrp',
  {
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: DataTypes.DECIMAL(16,2),
      defaultValue: 0,
      allowNull: false,
    },
    // have to implement user_id foreign key
    startDate:{
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate:{
      type: DataTypes.DATE,
      allowNull: false
    },
    status:{
      type: DataTypes.ENUM('inactive', 'active'),
      allowNull: false,
    },
    occurDate:{
      type: DataTypes.JSONB,
      allowNull: false,
    }
  },
  {
    // Other model options go here
    tableName: 'recurrTransacGrps',

    // add an option such that when a RecurrTransacGrp is deleted, any future transaction that references a RecurrTransacGrp record is deleted from the transactions table.
  },
);

module.exports = RecurrTransacGrp;