const { Sequelize } = require("sequelize");

// Initialize the Sequelize instance with configuration
const sequelize = new Sequelize("Kuripot", "postgres", "falgor123", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

// Test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the PostgreSQL database.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Export both the Sequelize instance and the connection function
module.exports = { sequelize, connectDB };
