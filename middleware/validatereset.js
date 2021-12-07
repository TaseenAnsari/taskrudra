const { User, resetSchema } = require('../models/users.model')
const { verifyToken, encryption } = require('../auth/auth')
const mongoose = require('mongoose')
const config = require('config')


module.exports = async (req, res, next) => {
    try {

        await resetSchema.validateAsync(req.body);
        const id = req.cookies.id
        const token = req.cookies.linktoken
        const user = await User.find({ _id: mongoose.Types.ObjectId(id) })

        if (req.body.password !== req.body.password2) return res.send({status:401,message:"password miss matched"})
        req.body.password = await encryption(req.body.password)
        const payload = await verifyToken(token, config.get("jwtSecrateKey") + user[0].password)
        if (payload == "jwt expired") return res.send({status:400,message:"Link Expired"})
        next()
    }
    catch (err) {
        if (err.message == 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters') {
            return res.send({status:400,message:err.message})
        }
        return res.send({status:401,message:err.message})
    }
}