//just to start things up

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const {connectDB } = require("./config/connection");
const db = require("./models/index")
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// Start the server and connect to the database
const startServer = async () => {
  if(process.env.NODE_ENV === "test"){
    try{
      await db.sequelize.sync()
      console.log("Models have been synchronized to the database")
    } catch (error){
      console.error("Failed to synchronize models:", error)
    }
  }
  try {
    await connectDB(); // Initialize the database connection
    console.log("Started the server");
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }



  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();




