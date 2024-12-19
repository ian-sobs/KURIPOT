const db = require('../../db/models/index')
const sequelize = db.sequelize
const {User} = sequelize.models

async function checkIfUserExists(email) {
    try {
        const user = await User.findOne({ where: { email } });
        return user !== null; // Returns true if user exists, otherwise false
    } catch (error) {
       // console.error("Error checking if user exists:", error);
        return false; // Return false in case of error
    }
}

module.exports = checkIfUserExists;

