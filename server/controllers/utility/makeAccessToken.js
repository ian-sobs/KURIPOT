
const jwt = require('jsonwebtoken');

function makeAccessToken(user){
    // Ensure the secret key is available
    if (!process.env.ACCESS_TOKEN_JWT_SECRET) {
        throw new Error('ACCESS_TOKEN_JWT_SECRET is not defined');
    }

    // jwt automatically adds an 'issuedAt' attribute to the token
    const hour = 0;
    const minutes = 10;
    const seconds = 25;
    const token = jwt.sign({
        usrId: user.id,                   // User's unique ID
        usrname: user.username,         // Username
        email: user.email,               // Email (optional)
        fLgn: user.isFirstLogin
    }, process.env.ACCESS_TOKEN_JWT_SECRET, {
        expiresIn: (hour * 60 + minutes) * 60 + seconds//1 hour and 30 minutes
    });

    return token
}

module.exports = makeAccessToken