const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be associated with a form account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,// it is use to create a reference to the accountmodel.js, isme hum to account ke id ko store karenge, aur jab hum transaction ko get karenge to hum to account ke data ko bhi get karenge
        ref:"account",
        required:[true,"Transaction must be associated with a to account"],
        index:true
    },
    status:{
        type:String,
        enum:{
        values :["PENDING","COMPLETED","FAILED","REVERSED"],
        message:"Status must be either PENDING, COMPLETED or FAILED",
        },
     default:"PENDING"
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating transaction "],
        min:[0,"Amount must be greater than 0"]
    },
    idempotecyKey:{
        type:String,
        required:[true,"Idempotecy key is required for creating transaction "],
        index:true,
        unique:true // it is use to ensure that the idempotecy key is unique, isse hum duplicate transaction ko prevent kar sakte hai
    }
},{
    timestamps:true
    
})

const transactionModel = mongoose.model("transaction",transactionSchema)

module.exports = transactionModel