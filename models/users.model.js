const mongoose = require('mongoose');
const Joi = require('joi')

const User = mongoose.model('UserAuth',new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        minlength:4,
        maxlength:30
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    status:{
        type:Boolean,
        default:true
    }
}))




const userSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
    .min(8)
    .required(),

    email: Joi.string()
        .email()
        .required(),
    status: Joi.boolean()
})

const loginSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
    .min(8)
    .required(),
})

const resetSchema = Joi.object({
    password: Joi.string()
    .min(8)
    .required(),
    password2: Joi.string()
    .min(8)
    .required(),
})

module.exports.userValidate = userSchema; 
module.exports.User = User;
module.exports.resetSchema = resetSchema;
module.exports.loginSchema = loginSchema;