const path = require('path');
const dotenv = require('dotenv');
dotenv.config()

const env = process.env.NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: path.resolve(__dirname + "/../../", envFile) });

module.exports = {
    development: {
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB || 'Kuripot_dev',
        host: process.env.POSTGRES_HOST || 'localhost',
        dialect: 'postgres', // Change this if you're using a different DB
        port: process.env.POSTGRES_PORT || 5432,
        timezone: '+08:00',
        logging: false
    },
    // You can also set configurations for production or test environments
    test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres', // Change this if you're using a different DB
        port: process.env.POSTGRES_PORT || 5434,
        timezone: '+00:00'
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres', // Change this if you're using a different DB
        port: process.env.POSTGRES_PORT || 5436,
        timezone: '+00:00'
    },
};