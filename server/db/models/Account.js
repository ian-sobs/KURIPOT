const {Model } = require('sequelize');
//const {sequelize, connectDB} = require('../config/connection');
//const User = require('./User');

module.exports = (sequelize, DataTypes) =>{
  class Account extends Model{
    static associate(models){
      Account.belongsTo(models.User, {
        foreignKey:{ 
          name: 'user_id',
          allowNull: false
        }
      })
      //One-to-Many relationships between sequelize models defautls to CASCADE ON UPDATE
      // one-to-many relationships in sequelize default to SET NULL ON DELETE
      Account.hasMany(models.Transaction,{
          foreignKey: {
              name: 'from_account_id',
              
              allowNull: true,
          },
          onDelete: 'CASCADE',
      })

      Account.hasMany(models.Transaction,{
        foreignKey: {
            name: 'account_id',
              
            allowNull: true,
        },
        onDelete: 'CASCADE',
      })

      Account.hasMany(models.Transaction,{
          foreignKey: {
              name: 'to_account_id',

              allowNull: true,
          },
          onDelete: 'CASCADE'
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
        autoIncrement: true,

        get() {
          const rawValue = this.getDataValue('id');
          const parsedValue = parseInt(rawValue, 10);
          return parsedValue;
        },

        set(value) {
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          this.setDataValue('id', parseInt(value, 10));
        },
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
        get() {
          const rawValue = this.getDataValue('user_id');
          const parsedValue = parseInt(rawValue, 10);
          return parsedValue;
        },
        set(value) {
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          this.setDataValue('user_id', parseInt(value, 10));
        },
      },
      amount: {
          type: DataTypes.DECIMAL(18,2),
          defaultValue: 0,

          get() {
            const rawValue = this.getDataValue('amount');
            const parsedValue = parseFloat(parseFloat(rawValue).toFixed(2));
            return parsedValue;
          },
          set(value) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            this.setDataValue('amount', parseFloat(parseFloat(value).toFixed(2)));
          },
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