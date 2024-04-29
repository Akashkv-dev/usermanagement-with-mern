const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
    // console.log("auth",token);
  
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, process.env.secret_key, (err, user) => {
      if (err) 
      return res.sendStatus(403);
  
      req.user = user;
      next();
    });
  }

  module.exports= authenticateToken;