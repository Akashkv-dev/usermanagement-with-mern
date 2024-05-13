const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const userH = require("../helpers/userH");
const {token} = require("../utils/jwt")

module.exports = {
  loginUser:async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
      const user= await userH.findUser(email)
      console.log(user);
      
      if( !user){
        res.status(404).json({message:"invalid user"})
      }
      else{
            const matched=await bcrypt.compare(password, user.password)
            if (matched) {
              const Token=token(email,user.role)
              res.status(200).json({ message: "user loggedIn",token:Token });
            }
            else{
                res.status(400).json({message:"invalid password"})
            } 
      } 
    } catch (error) {
      res.status(404).json({ message: "login error" });
    }
  },
  signUp: async (req, res) => {

    try {
        console.log(req.body);
      const { name, email, password, age } = req.body ;
      const datas= req.body
      const user = await userH.findUser(email);
      if (!user) {
        const insertdata = await userH.insert(datas);
        // const role='user'
        // const Token=token(email,role)
        // console.log(Token);
            res.status(200).json({ message: "successfully inserted user data"});
        }
        else{
            console.log("existing email");
            res.status(400).json({message:"email Exist"})

        }
        
    } catch (error) {
      res.status(400).json({ error: "error inserting controller" });
    }
  },
  homePage: (req,res)=>{
    const token =req.headers.authorization
    // console.log(token);
    jwt.verify(token, process.env.secret_key,async (err, user) => {
        if (err) return res.sendStatus(403);
    
        req.user = user;
        console.log(req.user);

        if(req.user.mail && req.user.role ==='user'){

            const userData=await userH.findUser(req.user.mail)
            // console.log(userData);
            res.status(200).json({message:"valid user",username:userData.name})

        }

  })


  }
};
