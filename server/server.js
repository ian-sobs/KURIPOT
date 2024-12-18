//just to start things up
const path = require('path');

const {connectDB } = require("./db/config/connection");
const db = require("./db/models/index")

// const dotenv = require('dotenv');
// dotenv.config();
//const env = process.env.NODE_ENV;
//const envFile = `.env.${env || 'development'}`;  // default to 'development' if NODE_ENV is not set
//dotenv.config({ path: path.resolve(__dirname, envFile) });

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

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
const userRouter = require('./routes/userRouter')

const { Sequelize } = require('sequelize');

const ensureDatabaseExists = async () => {
  const sequelize = new Sequelize('postgres', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    logging: false, // Disable logging for this part
  });

  try {
    // Check if the database exists
    const [results] = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = :dbName`,
      { replacements: { dbName: process.env.POSTGRES_DB } }
    );

    if (results.length === 0) {
      console.log(`Database "${process.env.POSTGRES_DB}" does not exist. Creating...`);
      await sequelize.query(
        `CREATE DATABASE "${process.env.POSTGRES_DB}" WITH OWNER = '${process.env.POSTGRES_USER}' ENCODING = 'UTF8'`
      );
      console.log(`Database "${process.env.POSTGRES_DB}" created successfully.`);
    } else {
      console.log(`Database "${process.env.POSTGRES_DB}" already exists.`);
    }
  } catch (error) {
    console.error('Error ensuring database existence:', error);
    process.exit(1);
  } finally {
    await sequelize.close(); // Close the connection to the `postgres` database
  }
};

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000'
// Start the server and connect to the database
const startServer = async () => {
  app.use(cors({
    origin: corsOrigin, // Allow your frontend's origin
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allow specific methods
    credentials: true // If using cookies or authentication
  }));

  
  try{
    await ensureDatabaseExists(); 
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

  // NODE_ENV=development
  // POSTGRES_HOST=localhost
  // POSTGRES_USER=postgres
  // POSTGRES_PASSWORD=falgor123
  // POSTGRES_DB=Kuripot_dev
  // POSTGRES_PORT=5432
  // SALT_ROUNDS=10
  // PORT=5000
  // ACCESS_TOKEN_JWT_SECRET="8dbur3wwV5RTIbxTACfUlKjVNgoaHM6OWfULTdbBeTA="
  // REFRESH_TOKEN_JWT_SECRET="ljeqw7rcl4V0DCYZ2SzYtPLEJudxCVI+l2J8eVQiCuA="
  // CORS_ORIGIN=http://localhost:3000

  console.log("process.env.NODE_ENV : ", process.env.NODE_ENV)
  console.log("process.env.POSTGRES_HOST : ", process.env.POSTGRES_HOST)
  console.log("process.env.POSTGRES_USER : ", process.env.POSTGRES_USER)
  console.log("process.env.POSTGRES_PASSWORD : ", process.env.POSTGRES_PASSWORD)
  console.log("process.env.POSTGRES_DB : ", process.env.POSTGRES_DB)
  console.log("process.env.POSTGRES_PORT : ", process.env.POSTGRES_PORT)

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
  app.use('/api/user', authAccessToken, userRouter)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();




