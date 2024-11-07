const {Model } = require('sequelize');
//const {sequelize, connectDB} = require('../config/connection');
//const User = require('./User');

module.exports = (sequelize, DataTypes) =>{
  class Account extends Model{
    static associate(models){
      Account.belongsTo(models.User, {foreignKey: 'user_id'})
      Account.hasMany(Transaction,{
          foreignKey: {
              name: 'from_account_id',

              allowNull: true,
          },
      })

      Account.hasMany(Transaction,{
          foreignKey: {
              name: 'to_account_id',

              allowNull: true,
          },
      })
    }
  }

  Account.init(
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
        allowNull: false,
        // references: {
        //   model: models.User,
        //   key: 'id',
        //   // research if you need Deferrable options
        // }
      },
      amount: {
          type: DataTypes.DECIMAL(18,2),
          defaultValue: 0
      }
    },
    {
      // Other model options go here
      sequelize,
      modelName: 'Account',
      tableName: 'accounts',
    },
  );

  return Account
};
//module.exports = Account;