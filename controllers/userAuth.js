const ls = require('localStorage')
const { User } = require('../models/users.model')
const { encryption, validatePassword, genrateToken, verifyToken } = require('../auth/auth')
const { TokenExpiredError } = require('jsonwebtoken')
const mongoose = require('mongoose')



module.exports.logout = async (req, res, next) => {
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
        res.render('forgot', { message: "" })

    }
    catch (err) {
        res.render('forgot', { message: err.message })
    }
}



module.exports.userResetPass = async (req, res, next) => {
    try {
        const user = await User.find({ _id: mongoose.Types.ObjectId(req.params.id) })
        if (!user[0].username) return res.send('invalid link')
        const payload = await verifyToken(req.params.token, "secrate" + user[0].password)
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
        res.render('login', { user: "", message: "" })

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports.registerUser = async (req, res, next) => {
    try {

        res.render('register', { message: "" })

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}


module.exports.login = async (req, res, next) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (!user[0]) return res.render('login', { user: '', message: "user doesn't exist" })
        if (! await validatePassword(req.body.password, user[0].password)) return res.render('login', { user: '', message: "password doesn't match" })
        res.cookie('token', await genrateToken({ username: user[0].username }, "secrate"))
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
        const link = `http://127.0.0.1:5500/reset-password/${user[0]._id}/${await genrateToken({ username: user[0].username }, 'secrate' + user[0].password)}`
        req.body.link = link
        next()
    }
    catch (err) {
        res.render('register', { message: err.message })
    }
}

module.exports.resetPass = async (req, res, next) => {
    try {
        // const payload = await verifyToken(req.cookies.linktoken, "secrate" + user[0].password)
        // if(!payload.username) return res.send("invalid link")
        // if (payload == "jwt expired") return res.send("invalid link")
        if (req.body.password !== req.body.password2) return res.send('password Miss matched')
        req.body.password = await encryption(req.body.password)
        const id = req.cookies.id
        result = await User.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: {
                password: req.body.password
            }
        })
        res.cookie("id","")
        res.render('login',{user:"",message:"password changed"})
    }
    catch (err) {
        res.send(err.message)
    }
}