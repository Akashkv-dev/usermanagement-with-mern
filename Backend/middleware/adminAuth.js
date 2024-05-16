const jwt = require("jsonwebtoken");

function adminAuthenticate(req, res, next) {
  const token = req.headers.authorization;
  
  if (token == null) return res.status(401);
  
  jwt.verify(token, process.env.secret_key, (err, user) => {
    if (err) return res.status(403).json({ message: "invalid token" });
    
    req.user = user;
    console.log("auth",req.user);
    if (req.user.role == "admin") {
      next();
    } else {
     return res.status(403).json({ message: "not valid admin" });
    }
  });
}

module.exports = adminAuthenticate;
