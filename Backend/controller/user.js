const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userH = require("../helpers/userH");
const { token } = require("../utils/jwt");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      const user = await userH.findUser(email);
      console.log(user);

      if (!user || user.active === false) {
        res.status(404).json({ message: "invalid user" });
      } else {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) {
          const Token = token(email, user.role);
          res
            .status(200)
            .json({ message: "user loggedIn", token: Token, role: "user" });
        } else {
          res.status(400).json({ message: "invalid password" });
        }
      }
    } catch (error) {
      res.status(404).json({ message: "login error" });
    }
  },
  signUp: async (req, res) => {
    try {
      // console.log(req.body);
      const { name, email, password, age } = req.body;
      const pwLength = Object.values(password).length;
      const datas = req.body;
      const user = await userH.findUser(email);
      if (!user) {
        if (pwLength >= 6) {
          const insertdata = await userH.insert(datas);
          res.status(200).json({ message: "successfully inserted user data" });
        } else {
          res
            .status(400)
            .json({ message: "Password should be atleast 6 characters" });
        }
      } else {
        console.log("existing email");
        res.status(400).json({ message: "email Exist" });
      }
    } catch (error) {
      const firstErrorKey = Object.keys(error.errors)[0]; // Get the first error key
      const validationMessage = error.errors[firstErrorKey].message;
      // console.log(validationMessage, "jhfjhgfh");
      res.status(400).json({ error: validationMessage });
    }
  },
  homePage: async (req, res) => {
    const userData = await userH.findUser(req.user.mail);
    // console.log(userData);
    res.status(200).json({ message: "valid user", username: userData.name });
  },
};
