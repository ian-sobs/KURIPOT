const db = require('../../models/index')
const sequelize = db.sequelize
const {User} = sequelize.models
const bcrypt = require('bcrypt')
const makeJWT = require('../utility/makeJWT')

exports.signInUser = async (req, res) => {
    const {password} = req.body
    const email = req.body.email.trim()

    try {    
        const user = await User.findOne({where:{email: email}})
        
        if (!user) {
            // User doesn't exist, return a conflict response
            return res.status(401).json({ message: "User bearing that email does not exist" });
        }

        const match = await bcrypt.compare(password, user.password).catch(err => {
            console.error("Error comparing password:", err);
            return false;
          });

        if(!match){
            // Wrong password inputted
            return res.status(401).json({ message: "Incorrect email or password, sign-in failed" });
        }

        // jwt automatically adds an 'issuedAt' attribute to the token
        const token = makeJWT(user)

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