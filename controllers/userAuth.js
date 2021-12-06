const { User } = require('../models/users.model')
const { encryption, genrateToken, verifyToken } = require('../auth/auth')
const config = require('config')
const mongoose = require('mongoose')



module.exports.logout = async (req, res, next) => { //logout functionality
    try {
        res.cookie("token", "")
        res.redirect('/')

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}



module.exports.userForgotPass = async (req, res, next) => {
    try {
        if(!req.cookies.token) return res.render('forgot', { message: "" , type:'' })
        if((await verifyToken(req.cookies.token,config.get('jwtSecrateKey')))=="jwt expired") return res.render('forgot', { message: "" ,type:""})
        res.redirect('/')
        

    }
    catch (err) {
        res.render('forgot', { message: err.message })
    }
}



module.exports.userResetPass = async (req, res, next) => {
    try {
        const user = await User.find({ _id: mongoose.Types.ObjectId(req.params.id) })
        if (!user[0].username) return res.send("<h2>Invalid Link</h2>")
        const payload = await verifyToken(req.params.token, config.get("jwtSecrateKey") + user[0].password)
        if(!payload.username) return res.send("<h2>Invalid Link</h2>")
        if (payload == "jwt expired") return res.send("<h2>Link Expired</h2>")
        res.cookie("id", user[0].id)
        res.cookie("linktoken", req.params.token)
        res.render('reset', { message: "" })
    }
    catch (err) {
        res.send("<h2>Invalid Link</h2>")
    }
}


module.exports.loginUser = async (req, res, next) => {
    try {
        if(!req.cookies.token) return res.render('login', { user: "", message: "",type:"" })
        if((await verifyToken(req.cookies.token,config.get('jwtSecrateKey')))=="jwt expired") return res.render('login', { user: "", message: "session expired" ,type:"danger"})
        res.redirect('/')
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports.registerUser = async (req, res, next) => {
    try {
        if(!req.cookies.token) return res.render('register', { message: "" })
        if((await verifyToken(req.cookies.token,config.get('jwtSecrateKey')))=="jwt expired") return res.render('register', { message: "" })
        res.redirect('/')
        

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports.login = async (req, res, next) => {
    try {
        res.redirect('/')
    }
    catch (err) {
        res.render('login', { user: '', message: err.message,type:"danger" })
    }
}


module.exports.register = async (req, res, next) => {
    try {
        req.body.password = await encryption(req.body.password)
        const user = new User(req.body);
        result = await user.save();

        res.render('login', { user: result, message: "User Successfuly Registered" ,type:"success"})

    }
    catch (err) {
        if(err.message.indexOf('username_1 dup key')>-1){

            return res.render('register', { message: "Username already exist" });
        }
        else if(err.message.indexOf('email_1 dup key')>-1){

            return res.render('register', { message: "Email already exist" });
        }
        else if(err.message.indexOf('UserAuth validation failed')>-1){
            return res.render('register', { message: "username must be at least 4 charecter" });
        }
        else{
            return res.render('register', { message: "something went wrong!" });
        }
    }
}

module.exports.forgotPass = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (!user[0]) return res.render('forgot', { message: "Email doesn't exist",type:"danger" })
        const link = `${config.get('host')}/reset-password/${user[0]._id}/${await genrateToken({ username: user[0].username }, config.get('jwtSecrateKey') + user[0].password)}`
        req.body.link = link
        next()
    }
    catch (err) {
        res.render('forgot', { message: err.message , type:"danger" })
    }
}

module.exports.resetPass = async (req, res, next) => {
    try {
        
        const id = req.cookies.id
        result = await User.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: {
                password: req.body.password
            }
        })
        res.cookie("id","")
        res.cookie("linktoken","")
        res.render('login',{user:"",message:"password changed",type:"success"})
    }
    catch (err) {
        res.status(400).send('link has been Already used')
    }
}