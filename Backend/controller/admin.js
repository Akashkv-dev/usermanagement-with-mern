const { json } = require("body-parser");
const { token } = require("../utils/jwt");
const Admin = require("../modal/adminSchema");
const userH = require("../helpers/userH");
const { query } = require("express");

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
          const Token = token(Email,adminData.role);
          res.status(200).json({ message: "admin loggedIn", token: Token });
        } else {
          res.status(400).json({ message: "invalid password" });
        }
      } else {
        res.status(400).json({ message: "invalid email" });
      }
    }
  },
  dashboard: async (req, res) => {
    const users = await userH.allUser();
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
    console.log(update);
    const users = await userH.allUser();

    res.status(200).json({ message: "edit successful", users: users });
  },
  deleteUser: async (req, res) => {
    console.log(req.body);
    const id = req.body.deleteUserId;
    try {
      const data = await userH.findUserbyId(id);
      const name = data.name;
      const email = data.email;
      const inserted = await userH.insertTrash(name, email);
      console.log(inserted);
      if (inserted == true) {
        const deleteUser = await userH.deleteUser(id);
        const users = await userH.allUser();
        res.status(200).json({ message: "deleted", users: users });
      } else {
        res.status(404).json({ message: "error" });
      }
    } catch (error) {
      console.error(error);
    }
  },
  addUser: async (req, res) => {
    console.log(req.body);
    const { name, email, age } = req.body;
    const emailPrefix = email.substring(0, 4);
    const password = emailPrefix + age;
    const data = { name, email, password, age };

    const emailExist =await userH.findUser(email);
    console.log(emailExist);
    if (!emailExist) {
      await userH.insert(data);
      res.status(200).json({ message: "user data inserted" });
    } else {
      res.status(401).json({ message: "email exist" });
    }
  },
  search:async (req,res)=>{
    console.log(req.query);
    try {
      const {search} =req.query
      if(search){

        const data =await userH.searchingUser(search)
        res.json({data:data})
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({error:'searching user error'})
    }
  }
};
