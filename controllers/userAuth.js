const { User } = require('../models/users.model')
const { encryption, genrateToken, verifyToken } = require('../auth/auth')
const config = require('config')
const mongoose = require('mongoose')






module.exports.getUser = async (req, res, next) => {
    try {
        let user = await User.find(req.params)
        if(!user[0]){
            user.push({username:"no-data",email:"no-data",status:false})
        }
        res.render('index',{data:user,username:req.body.payload.username,host:config.get('host')})

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.find({_id:req.params.id})
        res.render('update',{
            message:"",email:user[0].email,
            status:user[0].status,id:user[0]._id,
            username:req.body.payload.username,
            usernameu:user[0].username,
            host:config.get('host')})

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}



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
        if(!req.cookies.token) return res.render('forgot', { message: "" , type:'' ,host:config.get('host')})
        if((await verifyToken(req.cookies.token,config.get('jwtSecrateKey')))=="jwt expired") return res.render('forgot', { message: "" ,type:"",host:config.get('host')})
        res.redirect('/')
        

    }
    catch (err) {
        res.render('forgot', { message: err.message ,host:config.get('host')})
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
        res.render('reset', { message: "" ,host:config.get('host')})
    }
    catch (err) {
        res.send("<h2>Invalid Link</h2>")
    }
}


module.exports.loginUser = async (req, res, next) => {
    try {
        if(!req.cookies.token) return res.render('login', { user: "", message: "",type:"" ,host:config.get('host')})
        if((await verifyToken(req.cookies.token,config.get('jwtSecrateKey')))=="jwt expired") return res.render('login', { user: "", message: "session expired" ,type:"danger",host:config.get('host')})
        res.redirect('/')
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports.registerUser = async (req, res, next) => {
    try {
        if(!req.cookies.token) return res.render('register', { message: "" ,host:config.get('host')})
        if((await verifyToken(req.cookies.token,config.get('jwtSecrateKey')))=="jwt expired") return res.render('register', { message: "" ,host:config.get('host')})
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
        res.render('login', { user: '', message: err.message,type:"danger",host:config.get('host') })
    }
}



module.exports.forgotPass = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (!user[0]) return res.render('forgot', { message: "Email doesn't exist",type:"danger" ,host:config.get('host')})
        const link = `${config.get('host')}/reset-password/${user[0]._id}/${await genrateToken({ username: user[0].username }, config.get('jwtSecrateKey') + user[0].password)}`
        req.body.link = link
        next()
    }
    catch (err) {
        res.render('forgot', { message: err.message , type:"danger",host:config.get('host') })
    }
}

