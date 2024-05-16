const express = require("express");
const router = express.Router();
const UserAuth =require('../middleware/userAuth')
const{ loginUser,signUp,homePage,adminpage }=require("../controller/user")

router.post("/login",loginUser),
router.post("/signup",signUp),
router.get("/home",UserAuth,homePage),

module.exports=router;