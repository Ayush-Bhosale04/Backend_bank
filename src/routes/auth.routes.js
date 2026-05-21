const express = require ("express")
const authController = require("../controllers/auth.controller")

const router = express.Router()

router.post("/register",authController.userRegisterController) //jab bhi hum /register pe post request bhejenge to ye userRegisterController ko call karega, aur userRegisterController me hum user ko register karenge

router.post("/login",authController.userLoginController) //jab bhi hum /login pe post request bhejenge to ye userLoginController ko call karega, aur userLoginController me hum user ko login karenge

module.exports = router