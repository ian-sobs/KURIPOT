
const jwt = require('jsonwebtoken');
const makeAccessToken = require('../utility/makeAccessToken');

exports.refAccessToken = (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not provided' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function(err, decoded){
        if (err) {
            return res.status(403).json({ message: 'Invalid Token' });
        }

        if (!decoded) {
            return res.status(403).json({ error: 'Invalid refresh token' });
        }
    
        // Generate a new access token only
        const newAccessToken = makeAccessToken({
            id: decoded.usrId,
            username: decoded.usrname,
            email: decoded.email,
        });
    
        res.json({ accessToken: newAccessToken });
    });
}
