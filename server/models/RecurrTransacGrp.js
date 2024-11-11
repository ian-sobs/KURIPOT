const {Model } = require('sequelize');
//const {sequelize, connectDB} = require('../config/connection');

module.exports = (sequelize, DataTypes) => {
  class RecurrTransacGrp extends Model{
    static associate(models){
      RecurrTransacGrp.hasMany(models.Transaction,{
        foreignKey: {
            name: 'recurr_id',

            allowNull: true
        }
      })    
      RecurrTransacGrp.belongsTo(models.User,{
        foreignKey:{ 
          name: 'user_id',
          allowNull: false
        }
      })
    }
  }

  RecurrTransacGrp.init(
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
      user_id: {
        type: DataTypes.INTEGER,

        // references: {
        //   model: User,
        //   key: 'id'
        // }
      },
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
      sequelize,
      modelName: 'RecurrTransacGrp',
      tableName: 'recurrTransacGrps',

      // add an option such that when a RecurrTransacGrp is deleted, any future transaction, or all transactions, that references a RecurrTransacGrp record is deleted from the transactions table.
    },
  );
  return RecurrTransacGrp
}