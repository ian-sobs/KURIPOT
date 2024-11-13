const db = require('../models/index')
const sequelize = db.sequelize
const {User} = sequelize.models

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
            return res.status(409).json({ message: "User already exists" });
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
    
}