const {loginValidate} = require('../models/users.model')


module.exports = async(req ,res ,next)=>{
    try{
        await loginValidate.validateAsync(req.body);
        next()
    }
    catch(err){
        res.render('login',{user:'',message:err.message})
    }    
}