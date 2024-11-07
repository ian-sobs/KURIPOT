module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres', // Change this if you're using a different DB
        port: process.env.POSTGRES_PORT || 5432,
    },
    // You can also set configurations for production or test environments
    test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres', // Change this if you're using a different DB
        port: process.env.POSTGRES_PORT || 5434,
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres', // Change this if you're using a different DB
        port: process.env.POSTGRES_PORT || 5436,
    },
};