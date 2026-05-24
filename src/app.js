// use of this folder is to create the server instincs and to config the server(middleware and api) (kon kon se middle ware hum use kar rahe hai,kitne type ke api hoge etc)


const express = require('express');//express ko import karenge, express ek framework hai jo hume server banane me help karta hai
const cookieParser = require('cookie-parser');//cookie-parser ko import karenge, cookie-parser ek middleware hai jo hume cookies ko parse karne me help karta hai

/**
 * routes required
 */

const authRouter = require('./routes/auth.routes');//auth.routes ko import karenge, auth.routes me hum authentication se related api banayenge, jaise ki register, login, logout etc
const accountRouter = require('./routes/account.routes');//account.routes ko import karenge, account.routes me hum account se related api banayenge, jaise ki create account, get account details, update account etc

const transactionRouter = require('./routes/transaction.routes');//transaction.routes ko import karenge, transaction.routes me hum transaction se related api banayenge, jaise ki create transaction, get transaction details, update transaction etc



const app = express();//express ka instance banayenge, jise hum app variable me store karenge, iske through hi hum apne server ko configure karenge, jaise ki middleware use karna, routes define karna etc

// 1. ALWAYS PARSE THE BODY AND COOKIES FIRST 
app.use(express.json());//express.json() middleware ko use karenge, isse hum json format me data ko parse kar sakte hai, jab bhi hum client se data bhejenge to wo json format me hoga, isliye hume is middleware ki jarurat padegi
app.use(express.urlencoded({ extended: true })); // Good practice to handle form data too
app.use(cookieParser());//cookieParser() middleware ko use karenge, isse hum cookies ko parse kar sakte hai, jab bhi hum client se cookies bhejenge to wo parse ho jayenge aur hum unhe easily access kar sakte hai

/**use roues */

// 2. DEFINE YOUR ROUTES LAST
app.use("/api/auth", authRouter);//authRouter ko use karenge, isse hum /api/auth ke andar jo bhi routes define karenge wo is router ke through access honge, jaise ki /api/auth/register, /api/auth/login etc
app.use("/api/accounts", accountRouter);//accountRouter ko use karenge, isse hum /api/accounts ke andar jo bhi routes define karenge wo is router ke through access honge, jaise ki /api/accounts/create, /api/accounts/details etc
app.use("/api/transactions", transactionRouter);//transactionRouter ko use karenge, isse hum /api/transactions ke andar jo bhi routes define karenge wo is router ke through access honge, jaise ki /api/transactions/create, /api/transactions/details etc
module.exports = app;