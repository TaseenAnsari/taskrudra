const mongoose = require('mongoose')
const config = require('config')
module.exports = async function(){
    try{
        await mongoose.connect(config.get('db'));
        console.log("connected to db")
    }
    catch(err){
        console.log(err.message);
    }
}