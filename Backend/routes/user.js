const express = require("express");
const router = express.Router();
const{ loginUser,signUp,homePage,adminpage }=require("../controller/user")

router.post("/login",loginUser),
router.post("/signup",signUp),
router.get("/home",homePage),

module.exports=router;