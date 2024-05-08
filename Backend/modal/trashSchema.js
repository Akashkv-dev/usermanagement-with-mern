const mongoose =require("mongoose")

const trashSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('trashes',trashSchema)