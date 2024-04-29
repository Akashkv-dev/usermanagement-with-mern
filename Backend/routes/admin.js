const express = require("express");
const router = express.Router();
const adminAuth =require("../middleware/adminAuth")

const {adminLogin,dashboard,editUser,deleteUser} =require('../controller/admin')

router.post("/login",adminLogin);
router.get("/dashboard",adminAuth,dashboard)
router.post("/edituser",adminAuth,editUser)
router.delete("/deleteuser",adminAuth,deleteUser)

module.exports=router;