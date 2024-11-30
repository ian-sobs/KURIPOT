const { Model } = require('sequelize');



module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model{
    static associate(models){
      Transaction.belongsTo(models.User, {
        foreignKey:{ 
          name: 'user_id',
          allowNull: false
        }
      })

      Transaction.belongsTo(models.Account, {
        foreignKey:{ 
          name: 'account_id',
          allowNull: true
        }
      })     

      Transaction.belongsTo(models.Category, {
        foreignKey:{ 
          name: 'category_id',
          allowNull: true
        }
      })   

      Transaction.belongsTo(models.Account, {
        foreignKey:{ 
          name: 'from_account_id',
          allowNull: true
        }
      })   

      Transaction.belongsTo(models.Account, {
        foreignKey:{ 
          name: 'to_account_id',
          allowNull: true
        }
      })   

      Transaction.belongsTo(models.RecurrTransacGrp, {
        foreignKey:{ 
          name: 'recurr_id',
          allowNull: true
        }
      })   
    }
  }

  Transaction.init(
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
      },
      amount: {
        type: DataTypes.DECIMAL(16,2),
        defaultValue: 0,
        allowNull: false,
      },
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: true,

        // references: {
        //   model: Account,
        //   key: 'id'
        // }
      },
      accountName: DataTypes.STRING,

      date:{
          type: DataTypes.DATE,
          allowNull: false,
          set(dateString){
            const parsedDate = new Date(dateString)
            this.setDataValue('date', parsedDate)
          }
      },
      
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,

        // references: {
        //   model: Category,
        //   key: 'id'
        // }
      },
      categoryName:{
        type: DataTypes.STRING,
        allowNull: true
      },
      from_account_id: {
        type: DataTypes.INTEGER,

        // references: {
        //   model: Account,
        //   key: 'id'
        // }
      },
      from_accountName: DataTypes.STRING,
      to_account_id: {
        type: DataTypes.INTEGER,

        // references: {
        //   model: Account,
        //   key: 'id'
        // }
      },
      to_accountName: DataTypes.STRING,
      note: DataTypes.STRING,
    
      recurr_id: {
        type: DataTypes.INTEGER,

        // references: {
        //   model: RecurrTransacGrp,
        //   key: 'id'
        // }
      },

      type: {
        type: DataTypes.ENUM('income', 'expense', 'transfer')
      }
    },
    {
      // Other model options go here
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
    },
  );
  return Transaction
}