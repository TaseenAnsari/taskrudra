const {verifyToken} = require('../auth/auth')
const config = require('config')
module.exports = async(req , res ,next)=>{
    try{
    if(!req.cookies.token) return res.redirect('/login')
    const payload = await verifyToken(req.cookies.token,config.get('jwtSecrateKey'))
    if(!payload) return res.redirect('/login')
    if(payload=="jwt expired") return res.redirect('/login')
    req.body.payload = payload;
    next()
    }
    catch(err){
        res.status(400).send(err.message)
    }
}