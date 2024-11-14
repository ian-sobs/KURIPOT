
const jwt = require('jsonwebtoken');

function makeJWT(user){
    // jwt automatically adds an 'issuedAt' attribute to the token
   const token = jwt.sign({
       usrId: user.id,                   // User's unique ID
       usrname: user.username,         // Username
       email: user.email,               // Email (optional)
   }, process.env.JWT_SECRET, {
       expiresIn: '90m' // 90 minutes
   });

   return token
}

module.exports = makeJWT