const {userValidate} = require('../models/users.model')


module.exports = async(req ,res ,next)=>{
    try{
        await userValidate.validateAsync(req.body);
        next()
    }
    catch(err){
        res.render('register',{message:err.message})
    }    
}

