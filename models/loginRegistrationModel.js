const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    phone:String,
    email:{type:String,required:true},
    password:{type:String,required:true},
    Address:[{type:String}],
    
})

module.exports =  mongoose.model('loginRegistration',loginSchema)