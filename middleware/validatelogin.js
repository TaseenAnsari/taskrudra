const {loginSchema , User} = require('../models/users.model')
const {validatePassword, genrateToken} = require('../auth/auth')
const config = require('config')


module.exports = async(req ,res ,next)=>{
    try{
        const user = await User.find({ username: req.body.username });
        if (!user[0]) return res.render('login', { user: '', message: "user doesn't exist",type:"danger" })
        await loginSchema.validateAsync(req.body);
        if(!user[0].status) return res.render('login', { user: '', message: "Your Account is De-Activated",type:"danger" })
        if (! await validatePassword(req.body.password, user[0].password)) return res.render('login', 
        { 
            user: '',
            message: "password doesn't match" ,
            type:"danger"
        })
        res.cookie('token', await genrateToken({ username: user[0].username }, config.get('jwtSecrateKey')))
        next()
    }
    catch(err){
        res.render('login',{user:'',message:err.message,type:"danger"})
    }    
}