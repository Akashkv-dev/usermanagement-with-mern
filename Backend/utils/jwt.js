const express = require('express');
const jwt = require('jsonwebtoken');
module.exports={
     token : (mail,role)=>{
        const token = jwt.sign({ mail:mail,role:role }, process.env.secret_key, { expiresIn: '30d' });
        return token
     }
}
