
const jwt = require("jsonwebtoken")


const user = require("../routes/user");
const { JWT_USER_PASSWORD } = require("../config");

function usermiddleware(req,res,next){
    const token=req.headers.token;
    const decoded=jwt.verify(token,JWT_USER_PASSWORD)
    if(decoded){
        req.userId=decoded.indexOf;
        next();
    }
    else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports={
    usermiddleware: usermiddleware
}