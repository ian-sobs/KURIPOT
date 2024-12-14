const db = require("../models/index")

// initialize new sequelize instance with this configuration
// const sequelize = new Sequelize(
//   process.env.POSTGRES_DB,
//   process.env.POSTGRES_USER,
//   process.env.POSTGRES_PASSWORD,
//   {
//     host: process.env.POSTGRES_HOST,
//     dialect: 'postgres',
//   }
// );
// Test the connection
const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connected to the PostgreSQL database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Export both the Sequelize instance and the connection function
module.exports = {connectDB };
