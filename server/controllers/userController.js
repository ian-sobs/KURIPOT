const db = require('../models/index')
const sequelize = db.sequelize
const {User} = sequelize.models
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

async function checkIfUserExists(email) {
    const user = await User.findOne({ where: { email } });
    return user !== null; // Returns true if user exists, otherwise false
}
  

exports.registerUser = async (req,res) =>{
    const {username, birthDate, password} = req.body
    const email = req.body.email.trim()

    const userExists = await checkIfUserExists(email)

    try {
        if (userExists) {
            // User already exists, return a conflict response
            return res.status(409).json({ message: "User already exists, sign-up failed" });
        }
    
        const newUser = await User.create(
            {
                username: username, 
                birthDate: birthDate, 
                email: email, 
                password: password
            })
        console.log("User registered successfully")      
        console.log(newUser) 

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser // Optional: you can return the newly created user data if needed
        });
    }
    catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

exports.signInUser = async (req, res) => {
    const {password} = req.body
    const email = req.body.email.trim()

    try {    
        const user = await User.findOne({where:{email: email}})
        
        if (!user) {
            // User already exists, return a conflict response
            return res.status(401).json({ message: "Incorrect email or password, sign-in failed" });
        }

        const match = await bcrypt.compare(password, user.password).catch(err => {
            console.error("Error comparing password:", err);
            return false;
          });

        if(!match){
            // User already exists, return a conflict response
            return res.status(401).json({ message: "Incorrect email or password, sign-in failed" });
        }

        // jwt automatically adds an 'issuedAt' attribute to the token
        const token = jwt.sign({
            sub: user.id,                   // User's unique ID
            username: user.username,         // Username
            email: user.email,               // Email (optional)
          }, process.env.JWT_SECRET, {
            expiresIn: '90m' // 90 minutes
          });

        console.log("User signed-in successfully") 

        return res.status(200).json({
            message: "User signed-in successfully",
            jwt: token // Optional: you can return the newly created token if needed
        });
    }
    catch (error) {
        console.error("Error during user sign-in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}