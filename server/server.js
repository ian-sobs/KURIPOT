//just to start things up

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { sequelize, connectDB } = require("./config/connection");
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Start the server and connect to the database
const startServer = async () => {
  try {
    await connectDB(); // Initialize the database connection
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }

  try{
    await sequelize.sync({ force: true })
    console.log("Models synchronized successfully")
  } catch(error){
    console.error("Failed to synchronize models: ", error)
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();




