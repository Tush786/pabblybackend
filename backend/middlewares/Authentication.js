const jwt = require('jsonwebtoken');
require("dotenv").config()

const Authentication = (req,res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]
   if(!token){
        res.status(400).send("Please Login")
    }else{
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {

            if(err){
                res.send({"message": "Please Login With Correct Crediential"})
            }else{
                const userId = decoded.userId
                req.userId = userId;
                next();
            }
          });
    }
}

module.exports = {Authentication}