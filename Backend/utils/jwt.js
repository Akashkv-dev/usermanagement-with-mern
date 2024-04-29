const express = require('express');
const jwt = require('jsonwebtoken');
module.exports={
     token : (mail)=>{
        const token = jwt.sign({ mail }, process.env.secret_key, { expiresIn: '30d' });
        return token
     }
}

