const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
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
    },
    access_token:{
        type:String,
        default:"null"
    }
}))




const userValidate = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
    .min(8)
    .required(),

    access_token: [
        Joi.string(),
        Joi.number(),
    ],

    email: Joi.string()
        .email()
        .required(),
    status: Joi.boolean()
})


module.exports.userValidate = userValidate; 
module.exports.User = User;