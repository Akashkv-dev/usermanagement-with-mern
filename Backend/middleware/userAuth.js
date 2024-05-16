const jwt = require('jsonwebtoken');
function userAuthentication(req,res,next) {
    const token =req.headers.authorization
    // console.log(token);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.secret_key,async (err, user) => {
        if (err) return res.sendStatus(403);
    
        req.user = user;
        if(req.user.role == 'user'){
            next()
        }
        else{
            res.sendStatus(403).json({message:'not valid user'})
 
        }
    })

}


    module.exports=userAuthentication;