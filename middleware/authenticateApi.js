const {verifyToken} = require('../auth/auth')
const config = require('config')
module.exports = async(req , res ,next)=>{
    try{
    if(!req.cookies.token) return res.status(200).send({status:400,message:"Access Denied"})
    const payload = await verifyToken(req.cookies.token,config.get('jwtSecrateKey'))
    if(!payload) return res.status(200).send({status:400,message:"Access Denied"})
    if(payload=="jwt expired") res.status(200).send({status:400,message:"Access Denied"})
    req.body.payload = payload;
    next()
    }
    catch(err){
        res.status(200).send({status:400,message:"Access Denied"})
    }
}