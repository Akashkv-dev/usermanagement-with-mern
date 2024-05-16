const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [3,"Name should be atleast 4 characters long"],
        maxlength: [20, "Name should be atmost 20 characters long"]

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:'user'
    }
})

module.exports= mongoose.model('users',userSchema)