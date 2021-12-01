const {loginSchema , User} = require('../models/users.model')
const {validatePassword, genrateToken} = require('../auth/auth')
const config = require('config')


module.exports = async(req ,res ,next)=>{
    try{
        await loginSchema.validateAsync(req.body);
        const user = await User.find({ username: req.body.username });
        if (!user[0]) return res.render('login', { user: '', message: "user doesn't exist" })
        if(!user[0].status) return res.render('login', { user: '', message: "Your Account is De-Activated" })
        if (! await validatePassword(req.body.password, user[0].password)) return res.render('login', 
        { 
            user: '',
            message: "password doesn't match" 
        })
        res.cookie('token', await genrateToken({ username: user[0].username }, config.get('jwtSecrateKey')))
        next()
    }
    catch(err){
        res.render('login',{user:'',message:err.message})
    }    
}