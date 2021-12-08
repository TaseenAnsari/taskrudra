const {userValidate} = require('../models/users.model')


module.exports = async(req ,res ,next)=>{
    try{
        await userValidate.validateAsync(req.body);
        next()
    }
    catch(err){
        console.log(err.message)
        if(err.message==='"username" length must be at least 3 characters long') return res.send({status:404,message:err.message})
        if(err.message==='"username" is not allowed to be empty') return res.send({status:404,message:err.message})
        if(err.message==='"email" is not allowed to be empty') return res.send({status:404,message:err.message})
        if(err.message==='"password" is not allowed to be empty') return res.send({status:404,message:err.message})
        if(err.message==='"email" must be a valid email') return res.send({status:404,message:err.message})
        if(err.message==='"password" length must be at least 8 characters long') return res.send({status:404,message:err.message})
        if(err.message==='"username" must only contain alpha-numeric characters') return res.send({status:404,message:err.message})
        res.send({status:403})
    }    
    
}

