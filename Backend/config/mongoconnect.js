const mongoose = require("mongoose");
const url = process.env.DB_URL

const connect=mongoose.connect(url)
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{

    console.log('db connection error',err);
})

module.exports=connect;
