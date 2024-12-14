'use strict';

// const dotenv = require('dotenv')
// dotenv.config();
// const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);


const db = {};

console.log("config", config[process.env.NODE_ENV])
// Initialize Sequelize instance
let sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, config[process.env.NODE_ENV]);
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
//   console.log("if (config.use_env_variable)")
// } else {
//   sequelize = new Sequelize(config);
//   console.log("else")
// }

// Import models and add them to the `db` object
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file !== 'associations.js' &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    const modelName = model.name || model.options.name.singular;
    db[modelName] = model;
  });

// Set up associations if they exist
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
