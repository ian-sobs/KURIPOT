
const jwt = require('jsonwebtoken');

exports.verifyAccToken = (req, res) => {
    //const { refreshToken } = req.cookies;
    const accToken = req.header('Authorization')?.split(' ')[1]; // Token from 'Authorization' header

    if (!accToken) {
        return res.status(401).json({ error: 'Access token not provided' });
    }

    jwt.verify(accToken, process.env.ACCESS_TOKEN_JWT_SECRET, function(err, decoded){
        if (err || !decoded) {
            return res.status(403).json({ 
                message: 'Invalid Token',
                isValid: false
            });
        }

        res.status(200).json({
            message: 'Valid Token',
            isValid: true
        });
    });
}
