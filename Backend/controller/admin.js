const { json } = require("body-parser");
const { token } = require("../utils/jwt");
const Admin = require("../modal/adminSchema");
const userH = require("../helpers/userH")


module.exports = {
  adminLogin: async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    const adminData = await Admin.findOne({ email: email });
    console.log(adminData);

    if (!adminData) {
      res.status(404).json({ message: "no admin" });
    } else {
      const Email = adminData.email;
      const Password = adminData.password;
      if (Email == email) {
        if (Password == password) {
          const Token = token(Email);
          res.status(200).json({ message: "admin loggedIn", token: Token });
        } else {
          res.status(400).json({ message: "invalid password" });
        }
      } else {
        res.status(400).json({ message: "invalid email" });
      }
    }
  },
  dashboard:async (req,res)=>{
    const users=await userH.allUser()
    if(users){
        res.status(200).json({message:"fetched users",users:users})
    }
    else{
        res.status(400).json({message:"data not fetched"})
    }
  },
  editUser:async (req,res)=>{
    // console.log(req.body);
    const {name,id,value} =req.body
    const update =await userH.updateUser(id,value)
    console.log(update);
    const users=await userH.allUser()

    res.status(200).json({message:"edit successful",users:users})    
  },
  deleteUser:async (req,res)=>{
    console.log(req.body);
    const id=req.body.deleteUserId
    const deleteUser =await userH.deleteUser(id)
  }

};
