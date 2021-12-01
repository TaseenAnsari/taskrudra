const ls = require('localStorage')
const { User } = require('../models/users.model')
const { encryption, validatePassword, genrateToken, verifyToken } = require('../auth/auth')
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
        if(!req.cookies.token) return res.render('forgot', { message: "" })
        if((await verifyToken(req.cookies.token,config.get('jwtSecrateKey')))=="jwt expired") return res.render('forgot', { message: "" })
        res.redirect('/')
        

    }
    catch (err) {
        res.render('forgot', { message: err.message })
    }
}



module.exports.userResetPass = async (req, res, next) => {
    try {
        const user = await User.find({ _id: mongoose.Types.ObjectId(req.params.id) })
        if (!user[0].username) return res.send('invalid link')
        const payload = await verifyToken(req.params.token, config.get("jwtSecrateKey") + user[0].password)
        if(!payload.username) return res.send("invalid link")
        if (payload == "jwt expired") return res.send("invalid link")
        res.cookie("id", user[0].id)
        res.cookie("linktoken", req.params.token)
        res.render('reset', { message: "" })
    }
    catch (err) {
        res.send(err.message)
    }
}
module.exports.loginUser = async (req, res, next) => {
    try {
        if(!req.cookies.token) return res.render('login', { user: "", message: "" })
        if((await verifyToken(req.cookies.token,config.get('jwtSecrateKey')))=="jwt expired") return res.render('login', { user: "", message: "" })
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
        res.render('login', { user: '', message: err.message })
    }
}


module.exports.register = async (req, res, next) => {
    try {
        req.body.password = await encryption(req.body.password)
        const user = new User(req.body);
        result = await user.save();


        res.render('login', { user: result, message: "" })

    }
    catch (err) {
        res.render('register', { message: err.message })
    }
}

module.exports.forgotPass = async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (!user[0]) return res.render('forgot', { message: "Email doesn't exist" })
        const link = `${config.get('host')}/reset-password/${user[0]._id}/${await genrateToken({ username: user[0].username }, config.get('jwtSecrateKey') + user[0].password)}`
        req.body.link = link
        next()
    }
    catch (err) {
        res.render('register', { message: err.message })
    }
}

module.exports.resetPass = async (req, res, next) => {
    try {
        
        const id = req.cookies.id
        const token = req.cookies.linktoken
        const user = await User.find({_id:mongoose.Types.ObjectId(id)})
        console.log()
        if (req.body.password !== req.body.password2) return res.send('password Miss matched')
        req.body.password = await encryption(req.body.password)
        const payload = await verifyToken(token, config.get("jwtSecrateKey") + user[0].password)
        if(payload=="jwt expired") return res.send("Link Expired")
        result = await User.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: {
                password: req.body.password
            }
        })
        res.cookie("id","")
        res.cookie("linktoken","")
        res.render('login',{user:"",message:"password changed"})
    }
    catch (err) {
        res.status(400).send('link has been Already used')
    }
}