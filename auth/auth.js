const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//encrypting password
module.exports.encryption = async (password) => {
    try {
        return await bcrypt.hash(password, 10)
    }
    catch (err) {
        console.log(err.message)
    }
}

//decrypting password and compare 
module.exports.validatePassword = async (password, encrypPassword) => {
    try {
        return await bcrypt.compare(password, encrypPassword)
    }
    catch (err) {
        console.log(err.message)
    }
}

//generate token
module.exports.genrateToken = async(payload,secrate)=>{
    try {
        return jwt.sign(payload,secrate,{ expiresIn:'10s'});
    }
    catch (err) {
        console.log(err.message)
    }
    
}

//verify token
module.exports.verifyToken = async (token , secrate) => {
    try {
        return jwt.verify(token,secrate)
    }
    catch (err) {
        return err.message
    }
}
