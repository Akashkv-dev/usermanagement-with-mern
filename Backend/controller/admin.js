const { json } = require("body-parser");
const { token } = require("../utils/jwt");
const Admin = require("../modal/adminSchema");
const userH = require("../helpers/userH");
const { query } = require("express");
const adminH = require("../helpers/adminH");

module.exports = {
  adminLogin: async (req, res) => {
    const { email, password } = req.body;
    // console.log(email);
    const adminData = await adminH.findAdmin(email)
    // console.log(adminData);

    if (!adminData) {
      res.status(404).json({ message: "no admin" });
    } else {
      const Email = adminData.email;
      const Password = adminData.password;
      if (Email == email) {
        if (Password == password) {
          const Token = token(Email,'admin');
          res.status(200).json({ message: "admin loggedIn", token: Token, role:'admin' });
        } else {
          res.status(400).json({ message: "invalid password" });
        }
      } else {
        res.status(400).json({ message: "invalid email" });
      }
    }
  },
  dashboard: async (req, res) => {
    const users = await adminH.allUser();
    // console.log(users);
    if (users) {
      res.status(200).json({ message: "fetched users", users: users });
    } else {
      res.status(400).json({ message: "data not fetched" });
    }
  },
  editUser: async (req, res) => {
    // console.log(req.body);
    const { name, id, value } = req.body;
    const update = await userH.updateUser(id, value);
    // console.log(update);
    const users = await adminH.allUser();

    res.status(200).json({ message: "edit successful", users: users });
  },
  deleteUser: async (req, res) => {
    // console.log(req.body);
    const id = req.body.deleteUserId;
    try {
      const unactive = await adminH.unActive(id)
        const users = await adminH.allUser();
        res.status(200).json({ message: "deleted", users: users });
    } catch (error) {
      console.error(error);
    }
  },
  addUser: async (req, res) => {
    // console.log(req.body);
    const { name, email, age } = req.body;
    const emailPrefix = email.substring(0, 4);
    const password = emailPrefix + age;
    const data = { name, email, password, age };

    const emailExist =await userH.findUser(email);
    // console.log(emailExist);
    if (!emailExist) {
      await userH.insert(data);
      res.status(200).json({ message: "user data inserted" });
    } else {
      res.status(401).json({ message: "email exist" });
    }
  },
  search:async (req,res)=>{
    // console.log(req.query);
    try {
      const {search} =req.query
      if(search){

        const data =await adminH.searchingUser(search)
        res.json({data:data})
      }
      else{
        const users = await adminH.allUser();
        res.json({data:users})

      }
    } catch (error) {
      console.error(error);
      res.status(500).json({error:'searching user error'})
    }
  }
};
