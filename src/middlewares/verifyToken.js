const jwt = require("jsonwebtoken"); 
require("dotenv").config();
//verify token
const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    console.log("token in the middleware", token);
    if (!token) {
      return res.status(401).send({ message: "Unauthorized User" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if(err){
        return res.status(401).send({ message: "Unauthorized Access" });
      }
      req.user = decoded
      next()
    })
}

module.exports = verifyToken