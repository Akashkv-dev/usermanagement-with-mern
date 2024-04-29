const express =require("express");
const bodyParser = require('body-parser');
require('dotenv').config();
const userRouter=require("./routes/user")
const adminRouter=require("./routes/admin")
const app = express();
const port=process.env.PORT
const connect = require("./config/mongoconnect")
const cors = require("cors")




app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/',userRouter);
app.use('/admin',adminRouter);




app.listen(port,()=>{
    console.log(`server running  on port ${port}`)
})

// Error handling
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Gracefully shutdown the server or perform necessary cleanup here
    process.exit(1); // Exit the process with failure code
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    // Handle unhandled promise rejections here
  });