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

module.exports.genrateToken = async(payload,secrate)=>{
    try {
        return jwt.sign(payload,secrate,{ expiresIn:'10m'});
    }
    catch (err) {
        console.log(err.message)
    }
    
}
module.exports.verifyToken = async (token , secrate) => {
    try {
        return jwt.verify(token,secrate)
    }
    catch (err) {
        return err.message
    }
}
