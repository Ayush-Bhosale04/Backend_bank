const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating user "],
        trim:true,
        unique:[true,"Email already exists"],
        lowercase:true,
        match :[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Invalid email address"] //it is use to check the email is in correct format or not
    },
    name:{
        type:String,
        required:[true,"Name is required for creating user "],
    },
    password:{
        type:String,
        required:[true,"Password is required for creating user "],
        minlength:[6,"Password must be at least 6 characters long"],
        select:false //it is use to hide the password when we get the user data from database
    }

},{
        timestamps:true
    })

    userSchema.pre('save',async function(next){ //jab hum user ko save karenge to ye function call hoga, isme hum password ko hash karenge aur ye pehele chalega save hone se pehele
    if (!this.isModified('password')){ //agar password modify nahi hua hai to next kar do, warna password ko hash kar do
        return next();}
    const hash = await bcrypt.hash(this.password,10); //10 is the salt rounds, it is use to make the hash more secure
    this.password = hash; //password ko hash kar do
    return next(); //next kar do
    
    })

    userSchema.methods.comparePassword = async function(password){ //ye function use hoga jab hum user ko login karenge, isme hum password ko compare karenge
        return await bcrypt.compare(password,this.password); //password ko compare kar do, agar password match karta hai to true return karega, warna false return karega
    }

    const userModel = mongoose.model("user",userSchema)

    module.exports = userModel