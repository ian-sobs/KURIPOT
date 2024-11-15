
const db = require('../../models/index')
const sequelize = db.sequelize
const {User} = sequelize.models
const checkIfUserExists = require('../utility/checkIfUserExists')
const makeAccessToken = require('../utility/makeAccessToken')
const makeRefreshToken = require('../utility/makeRefreshToken')

exports.registerUser = async (req,res) =>{
    const {username, birthDate, password} = req.body
    const email = req.body.email.trim()
    let newUser

    try{
        const userExists = await checkIfUserExists(email)
        if (userExists) {
            // User already exists, return a conflict response
            return res.status(409).json({ message: "User already exists, sign-up failed" });
        }
    }
    catch(error){
        console.error("Error during user registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

    try{
        newUser = await User.create(
            {
                username: username, 
                birthDate: birthDate, 
                email: email, 
                password: password
            })
        console.log("User registered successfully")      
        console.log(newUser) 
    }
    catch(error){
        console.error("Error during user registration:", error);
        return res.status(500).json({ error: "Internal server error" });        
    }

    const accessToken = makeAccessToken(newUser)
    const refreshToken = makeRefreshToken(newUser)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({
        message: "User registered successfully",
        user: newUser, // Optional: you can return the newly created user data if needed
        accessToken: accessToken
    });

}