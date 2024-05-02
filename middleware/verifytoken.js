const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req,res,next) =>{
    const authHeader = req.header('Authorization');
    
    if(!authHeader){
        return res.status(401).json({message:"Unauthorized: Missing Token!"});
    }

    const [bearer,token] = authHeader.split(" ");
    if(!token){
        return res.status(401).json({message: "Unauthorized: Invalid token format!"});
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY , (err,data) => {
        if(err){
            return res.status(403).json({ message: "Forbidden: Invalid token!" });
        }

        req.id = data.id;
        next();
    })

}
 module.exports = verifyToken
