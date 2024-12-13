const db = require('../../models/index')
const {sequelize} = db
const {User} = sequelize.models
const jwt = require('jsonwebtoken');
const makeAccessToken = require('../utility/makeAccessToken');

exports.refAccessToken = (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token not provided' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET);
        if (!decoded) {
            return res.status(403).json({ message: 'Invalid Token' });
        }

        User.findByPk(decoded.usrId, {
            attributes: ['isFirstLogin'], // Specify the field(s) you want to retrieve
        })
            .then((record) => {
                const newAccessToken = makeAccessToken({
                    id: decoded.usrId,
                    username: decoded.usrname,
                    email: decoded.email,
                    isFirstLogin: record.isFirstLogin
                });
                res.status(200).json({ accessToken: newAccessToken });
            })
            .catch((error) => {
                console.error('Error fetching record:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            })
    } catch (error) {
        console.error('Error generating access token:', error);
        return res.status(403).json({ message: 'Invalid Token' });
    }

    return
    // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_JWT_SECRET, function(err, decoded){
    //     if (err || !decoded) {
    //         return res.status(403).json({ message: 'Invalid Token' });
    //     }

    //     // Generate a new access token only
    //     try {
    //         const newAccessToken = makeAccessToken({
    //             id: decoded.usrId,
    //             username: decoded.usrname,
    //             email: decoded.email,
    //             isFirstLogin: isFirstLogin
    //         });
        
    //         res.status(200).json({ accessToken: newAccessToken });            
    //     } catch (error) {
    //         console.error('Error generating access token:', error);
    //         res.status(500).json({ message: 'Internal Server Error' });
    //     }

    // });
}
