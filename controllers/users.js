const { Mongoose } = require('mongoose')
const { User } = require('../models/users.model')


module.exports.getUser = async (req, res, next) => {
    try {
        let user = await User.find(req.params)
        if(!user[0]){
            user.push({username:"no-data",email:"no-data",status:false})
        }
        res.render('index',{data:user,username:req.body.payload.username})

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.deleteOne({_id:req.params.id})
        res.redirect('/')

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.find({_id:req.params.id})
        res.render('update',{message:"",email:user[0].email,status:user[0].status,id:user[0]._id,username:req.body.payload.username})

    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.update = async (req, res, next) => {
    try {
        if(!req.body.status) statusone = false
        else statusone = true
        const user = await User.updateOne({_id:req.params.id},{$set:{
            email:req.body.email,
            status:statusone
        }})
        res.redirect('/')

    }
    catch (err) {
        const users = await User.find({_id:req.params.id})
        return res.render('update',{message:"Email Already Used",email:users[0].email,status:users[0].status,id:users[0]._id,username:req.body.payload.username})
    }
}