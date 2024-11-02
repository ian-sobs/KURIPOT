//just to start things up

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('Kuripot', 'postgres', 'falgor123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres' 
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();

