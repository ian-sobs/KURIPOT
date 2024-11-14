
const jwt = require('jsonwebtoken');

function makeRefreshToken(user){
    // jwt automatically adds an 'issuedAt' attribute to the token
   const token = jwt.sign({
       usrId: user.id,                   // User's unique ID
   }, process.env.REFRESH_TOKEN_JWT_SECRET, {
       expiresIn: '7d' // 7 days
   });

   return token
}

module.exports = makeRefreshToken