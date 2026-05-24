const express = require ("express")
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")
const router = express.Router()

/**
 * POST /api/accounts/ - create a new account 
 * protected route - only authenticated users can create an account
 */

router.post("/",authMiddleware.authMiddleware,accountController.createAccountController) //jab bhi hum / pe post request bhejenge to ye authMiddleware ko call karega, aur authMiddleware me hum user ko authenticate karenge, agar user authenticate ho jata hai to ye createAccountController ko call karega, aur createAccountController me hum account create karenge


module.exports = router