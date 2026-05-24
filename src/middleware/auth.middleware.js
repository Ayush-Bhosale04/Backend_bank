const userModel = require("../models/user.model")

const jwt = require("jsonwebtoken")


async function authMiddleware(req,res,next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1] // we are getting the token from the cookies or from the authorization header, if the token is not present in the cookies then we are getting it from the authorization header, and we are splitting the authorization header to get the token, because the authorization header is in the format "Bearer token"
    if(!token){
        return res.status(401).json({message:"Unauthorized access, token missing"})
    }

    try{
        const decoded = jwt.verify (token,process.env.JWT_SECRET) // we are verifying the token using the jwt.verify method, and we are passing the token and the secret key to it, if the token is valid then it will return the decoded payload, otherwise it will throw an error
        const user = await userModel.findById(decoded.userId) // we are finding the user by the id which is present in the decoded payload, and we are storing the user in the req.user variable, so that we can access it in the next middleware or in the route handler
        req.user = user // we are storing the user in the req.user variable, so that we can access it in the next middleware or in the route handler
        return next() // we are calling the next function to pass the control to the next middleware or to the route handler
    }catch(err){
        return res.status(401).json({message:"Unauthorized access, invalid token"})
    }
}

module.exports = {authMiddleware}