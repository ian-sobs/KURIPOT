
const jwt = require('jsonwebtoken');
const makeAccessToken = require('../utility/makeAccessToken');

exports.refAccessToken = (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not provided' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET, function(err, decoded){
        if (err || !decoded) {
            return res.status(403).json({ message: 'Invalid Token' });
        }

        // Generate a new access token only
        try {
            const newAccessToken = makeAccessToken({
                id: decoded.usrId,
                username: decoded.usrname,
                email: decoded.email,
            });
        
            res.status(200).json({ accessToken: newAccessToken });            
        } catch (error) {
            console.error('Error generating access token:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }

    });
}
