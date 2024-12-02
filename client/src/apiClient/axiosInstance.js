import axios from 'axios';


const unprotectedRoute = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
    ,withCredentials: true 
});

const protectedRoute = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
    ,withCredentials: true 
})

export {unprotectedRoute, protectedRoute}