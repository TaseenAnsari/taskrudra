const mongoose = require('mongoose')
module.exports = async function(){
    try{
        await mongoose.connect("mongodb://localhost/usersauth");
        console.log("connected to db")
    }
    catch(err){
        console.log(err.message);
    }
}