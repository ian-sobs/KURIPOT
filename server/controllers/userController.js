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
    if(!userExists){
        const newUser = await User.create(
            {
                username: username, 
                birthDate: birthDate, 
                email: email, 
                password: password
            })
        console.log("User registered successfully")       
    } 
    else{
        console.log("User already exists")
    }
}