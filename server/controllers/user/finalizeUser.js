
const db = require('../../db/models/index')
const sequelize = db.sequelize
const {User} = sequelize.models

exports.finalizeUser = async (req, res) =>{
    const {username} = req.body
    const {usrId} = req.user
    const id = parseInt(usrId, 10)

    try{
        const [affectedCount, affectedRows] = await User.update(
            { 
                username: username,
                isFirstLogin: false
            },
            {
              where: {
                id: id,
              },
            },)
        console.log("User updated successfully")      
        return res.status(200).json({
            message: (affectedCount > 0) ? "User updated successfully" : "No such user exists",
            affectedCount: affectedCount
        })
    }
    catch(error){
        console.error("Error during user update:", error);
        return res.status(500).json({ error: "Internal server error" });        
    }


}