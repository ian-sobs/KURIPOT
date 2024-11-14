
const jwt = require('jsonwebtoken');

function makeAccessToken(user){
    // jwt automatically adds an 'issuedAt' attribute to the token
   const token = jwt.sign({
       usrId: user.id,                   // User's unique ID
       usrname: user.username,         // Username
       email: user.email,               // Email (optional)
   }, process.env.ACCESS_TOKEN_JWT_SECRET, {
       expiresIn: '15m' // 15 minutes
   });

   return token
}

module.exports = makeAccessToken