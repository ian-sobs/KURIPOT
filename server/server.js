//just to start things up
const path = require('path');

const dotenv = require('dotenv');
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;  // default to 'development' if NODE_ENV is not set
dotenv.config({ path: path.resolve(__dirname, envFile) });

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const {connectDB } = require("./config/connection");
const db = require("./models/index")
const entryRouter = require('./routes/entryRouter')
const {authAccessToken} = require('./controllers/authentication/authAccessToken')

const cors = require('cors');

const tokenRouter = require('./routes/tokenRouter')
const loggingMiddleware = require('./logging')
const cookieParser = require('cookie-parser');

const accountsRouter = require('./routes/accountsRouter')
const budgetsRouter = require('./routes/budgetsRouter')
const categoriesRouter = require('./routes/categoriesRouter')
const transactionsRouter = require('./routes/transactionsRouter')

// Start the server and connect to the database
const startServer = async () => {
  app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow your frontend's origin
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allow specific methods
    credentials: true // If using cookies or authentication
}));

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
  console.log(process.env.ACCESS_TOKEN_JWT_SECRET)
  app.use(cookieParser())
  app.use(loggingMiddleware);  // Use the logging middleware for all routes
  
  app.use(express.json());  // Parses JSON body and adds it to req.body
  app.use(express.urlencoded({ extended: true }));  // Parses form data and adds it to req.body

  app.use('/api/entry', entryRouter) // signing-in and signing-up API
  app.use('/api/token', tokenRouter) // for getting a new access token if it expires

  app.use('/api/accounts', authAccessToken, accountsRouter)
  app.use('/api/budgets', authAccessToken, budgetsRouter)
  app.use('/api/categories', authAccessToken, categoriesRouter)
  app.use('/api/transactions', authAccessToken, transactionsRouter)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();




