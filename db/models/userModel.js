const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String},
    mail: {type:String,unique:true},
    username: {type:String,unique:true},
    password: {type:String},
    phone: {type:String},
    category: {type:String,default:"customers"}
});

const userModel = mongoose.model('users', userSchema);
exports.userModel = userModel;
