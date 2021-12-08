const { Mongoose } = require('mongoose')
const { User ,updateUserValidate} = require('../models/users.model')
const {encryption} = require('../auth/auth')
const mongoose = require('mongoose')



module.exports.getUsers = async (req, res, next) => { //Get All users
    try {
        let user = await User.find({})
        res.send(user)

    }
    catch (err) {
        res.send({status:404,message:"Not Found"})
    }
}


module.exports.deleteUser = async (req, res, next) => { //delete user
    try {
        const user = await User.deleteOne({_id:req.params.id})
        res.send({status:200,message:"succesfully deleted"})
        
    }
    catch (err) {
        res.send({status:403,message:"something went wrong"})
    }
}


module.exports.update = async (req, res, next) => { //update user
    try {
        if(!req.body.status) statusone = false
        else statusone = true
        await updateUserValidate.validateAsync({
            username:req.body.username,
            email:req.body.email,
            status:statusone
        });
        const user = await User.updateOne({_id:req.params.id},{$set:{
            username:req.body.username,
            email:req.body.email,
            status:statusone
        }})
        res.send({status:200,message:"succesfully updated"})

    }
    catch (err) {
        if(err.message==='"username" length must be at least 3 characters long') return res.send({status:400,message:err.message})
        if(err.message==='"username" is not allowed to be empty') return res.send({status:400,message:err.message})
        if(err.message==='"email" is not allowed to be empty') return res.send({status:400,message:err.message})
        if(err.message==='"email" must be a valid email') return res.send({status:400,message:err.message})
       res.send({status:403,message:err.message})
    }
}

module.exports.resetPass = async (req, res, next) => { //change password
    try {
        
        const id = req.cookies.id
        result = await User.updateOne({ _id: mongoose.Types.ObjectId(id) }, {
            $set: {
                password: req.body.password
            }
        })
        res.cookie("id","")
        res.cookie("linktoken","")
        res.send({status:200 , message:"successfully password reset"})
    }
    catch (err) {
        return res.send({status:401,message:err.message})
    }
}


module.exports.register = async (req, res, next) => { //create user
    try {
        req.body.password = await encryption(req.body.password)
        const user = new User(req.body);
        result = await user.save();

        res.send({status:200 , message:"successfully registered"})

    }
    catch (err) {
       res.status(200).send({status:403})
    }
}
