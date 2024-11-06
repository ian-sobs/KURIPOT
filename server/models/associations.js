const sequelize = require('../config/connection')


    const { Account, Budget, BudgetCategory, Category, RecurrTransacGrp, Transaction, User } = sequelize.models;
  
    //One-to-Many relationships between sequelize models defautls to CASCADE ON UPDATE
    User.hasMany(Account, {
        foreignKey: {
            name: 'user_id',
            
            allowNull: false
        },
        onDelete: 'CASCADE',
    });
 
    User.hasMany(Budget, {
        foreignKey: {
            name: 'user_id',
            
            allowNull: false
        },
        onDelete: 'CASCADE',
    });

    User.hasMany(RecurrTransacGrp, {
        foreignKey: {
            name: 'user_id',
            
            allowNull: false
        },
        onDelete: 'CASCADE',
    });

    User.hasMany(Category, {
        foreignKey: {
            name: 'user_id',
            
            allowNull: false
        },
        onDelete: 'CASCADE',
    });

    User.hasMany(Transaction, {
        foreignKey: {
            name: 'user_id',
            
            allowNull: false
        },
        onDelete: 'CASCADE',
    });

    User.hasMany(BudgetCategory, {
        foreignKey: {
            name: 'user_id',
            
            allowNull: false
        },
        onDelete: 'CASCADE',
    });

// one-to-many relationships in sequelize default to SET NULL ON DELETE
    Transaction.belongsTo(Account, {
        foreignKey: {
            name: 'account_id',

            allowNull: true,
        }
    })

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

    RecurrTransacGrp.hasMany(Transaction,{
        foreignKey: {
            name: 'recurr_id',

            allowNull: true
        }
    })

    Category.hasMany(Transaction,{
        foreignKey: {
            name: 'category_id',

            allowNull: true
        }
    })

    Category.hasMany(BudgetCategory,{
        foreignKey: {
            name: 'category_id',

            allowNull: false
        },
        onDelete: 'CASCADE'
    })

    Budget.hasMany(BudgetCategory, {
        foreignKey: {
            name: 'budget_id',

            allowNull: false
        },
        onDelete: 'CASCADE'      
    })

