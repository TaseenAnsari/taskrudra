const {verifyToken} = require('../auth/auth')
const config = require('config')
module.exports = async(req , res ,next)=>{
    try{
    if(!req.cookies.token) return res.send({status:401,message:"Access Denied"})
    const payload = await verifyToken(req.cookies.token,config.get('jwtSecrateKey'))
    if(!payload) return res.send({status:401,message:"Access Denied"})
    if(payload=="jwt expired") return res.send({status:401,message:"Access Denied"})
    req.body.payload = payload;
    next()
    }
    catch(err){
        res.send({status:401,message:"Access Denied"})
    }
}