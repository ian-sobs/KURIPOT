const axios = require('axios')

const unprotected = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

const protected = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/protected",
});

module.exports = {unprotected, protected}