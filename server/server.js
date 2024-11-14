//just to start things up
require('dotenv').config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const {connectDB } = require("./config/connection");
const db = require("./models/index")
const userRouter = require('./routes/userRouter')
const authenticateToken = require('./authentication/jwtAuth')
const protectedRouter = require('./routes/protectedRouter')

// Start the server and connect to the database
const startServer = async () => {

  try {
    await connectDB(); // Initialize the database connection
    console.log("Started the server");
  
    // Execute this only after the first try-catch block is successful
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development") {
      try {
        await db.sequelize.sync();
        console.log("Models have been synchronized to the database");
      } catch (error) {
        console.error("Failed to synchronize models:", error);
      }
    }
  } catch (error) {
    // This will handle errors from the connectDB or the first block
    console.error("Failed to start server:", error);
    process.exit(1);
  }
  
  
  app.use(express.json());  // Parses JSON body and adds it to req.body
  app.use(express.urlencoded({ extended: true }));  // Parses form data and adds it to req.body

  app.use('/api/user', userRouter)

  app.use('/api/protected', authenticateToken, protectedRouter); // Apply to routes that need protection

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();




