const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
/*
*user register controller
*POST /api/auth/register
*/ 
async function userRegisterController(req, res) {
    const { name, email, password } = req.body; //req.body se hum name, email, password ko get karenge

    const isExists = await userModel.findOne({ email : email }); //email se check karenge ki user already exist karta hai ya nahi
    if (isExists) {
        return res.status(422).json({
            message: "User already exists with this email",
            status: "fail"
        })
    }
    const user = await userModel.create({
        email,password,name 
    }) 

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" }) //jwt sign karenge, isme hum user ka id denge, secret key denge, aur token ka expire time denge

    res.cookie("token", token)

    res.status (201).json({
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
    await emailService.sendRegisterationEmail(user.email, user.name) //user ko registration email bhejenge(node mailer integration)
}
/*
*user login controller
*POST /api/auth/login
*/ 
async function userLoginController(req, res) {
    const { email, password } = req.body; //req.body se hum email, password ko get karenge

    const user = await userModel.findOne({email}).select("+password") //email se user ko find karenge, aur password ko select karenge, kyunki password ko humne select:false kiya hua hai user model me, isliye hume password ko explicitly select karna padega

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password",
            status: "fail"
        })
    }
    const isVaidPassword = await user.comparePassword(password) //password ko compare karenge, agar password match karta hai to true return karega, warna false return karega

    if(!isVaidPassword){
        return res.status(401).json({
            message: "Invalid email or password",
            status: "fail"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" }) //jwt sign karenge, isme hum user ka id denge, secret key denge, aur token ka expire time denge

    res.cookie("token", token)

    res.status (200).json({
        user:{
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })
}

module.exports = {
    userRegisterController,
    userLoginController
}