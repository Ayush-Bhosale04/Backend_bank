// server ko start karne ke liye hum is file ka use karenge, yaha pe hum app.js ko import karenge aur server ko listen karwayenge

require("dotenv").config();
const app = require('./src/app');
const connectToDB = require('./src/config/db');

connectToDB();

app.listen(3000,()=>{
    console.log("server is running at port 3000");
})