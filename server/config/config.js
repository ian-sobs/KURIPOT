module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres', // Change this if you're using a different DB
        port: process.env.DB_PORT || 5432,
    },
    // You can also set configurations for production or test environments
};