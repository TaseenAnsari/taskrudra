const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.encryption = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports.validatePassword = async (password, encrypPassword) => {
    try {
        return await bcrypt.compare(password, encrypPassword)
    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports.genrateToken = async(username)=>{
    try {
        return await jwt.sign(username,'secrate',{ expiresIn: 60*10});
    }
    catch (err) {
        console.log(err.message)
    }
    
}
module.exports.verifyToken = async (token) => {
    try {
        return await jwt.verify(token)
    }
    catch (err) {
        console.log(err.message)
    }
}
