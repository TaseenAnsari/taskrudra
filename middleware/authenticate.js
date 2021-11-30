const {verifyToken} = require('../auth/auth')

module.exports = async(req , res ,next)=>{
    try{
    if(!req.cookies.token) return res.redirect('/login')
    const payload = await verifyToken(req.cookies.token,"secrate")
    if(!payload) return res.redirect('/login')
    if(payload=="jwt expired") return res.redirect('/login')
    req.body = payload;
    next()
    }
    catch(err){
        res.status(400).send(err.message)
    }
}