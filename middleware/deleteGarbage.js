const {User} = require('../models/users.model')
const fs = require('fs')
const path = require('path')
const { contentSecurityPolicy } = require('helmet')
const dir = require('../filename').dir()
module.exports = async()=>{
    try{

        const user = await User.find({})
        const p = path.join(dir,'/resume')
        const files = fs.readdirSync(p)
        for(let j=0; j< files.length;j++){
            for(let i=0; i< user.length;i++){
                if(user[i].resume==files[j]){
                            continue;
                        }
                        console.log(typeof(files[j]))
                        fs.unlinkSync(path.join(p,files[j]))
                    }
                }
    }catch(err){
        console.log(err.message);
    }

}