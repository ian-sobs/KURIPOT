const db = require('../../db/models/index')
const sequelize = db.sequelize
const {User} = sequelize.models
const bcrypt = require('bcrypt')
const makeAccessToken = require('../utility/makeAccessToken')
const makeRefreshToken = require('../utility/makeRefreshToken')

exports.signInUser = async (req, res) => {
    const {password} = req.body
    const email = req.body.email.trim()
    let user

    try {    
        user = await User.findOne({where:{email: email}})
        
        if (!user) {
            // User doesn't exist, return a conflict response
            return res.status(401).json({ message: "User bearing that email does not exist" });
        }
    }
    catch(error){
        console.error("Error during user sign-in:", error);
        return res.status(500).json({ error: "Internal server error" });        
    }

    try{
        const match = await bcrypt.compare(password, user.password).catch(err => {
            console.error("Error comparing password:", err);
            return false;
          });

        if(!match){
            // Wrong password inputted
            return res.status(401).json({ message: "Incorrect email or password, sign-in failed" });
        }
    }
    catch(error){
        console.error("Error during user sign-in:", error);
        return res.status(500).json({ error: "Internal server error" });                
    }
        // jwt automatically adds an 'issuedAt' attribute to the token
    const accessToken = makeAccessToken(user)
    const refreshToken = makeRefreshToken(user)

    console.log("User signed-in successfully") 

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json({
        message: "User signed-in successfully",
        accessToken: accessToken // Optional: you can return the newly created token if needed
    });
    
}