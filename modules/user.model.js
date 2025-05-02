const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String},
    password:{type:String},

})

const UserModel = mongoose.model("users",userSchema)
module.exports= UserModel