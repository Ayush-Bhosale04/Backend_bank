const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",// this is the reference to the usermodel.js , it is use to create a relationship between user and account, isme hum user ke id ko store karenge, aur jab hum account ko get karenge to hum user ke data ko bhi get karenge
        required:[true,"Account must be associated with a user"],
        index:true // it is use to create an index on the user field, isse hum account ko user ke basis pe easily find kar sakte hai
    },
    status:{
        type:String,
        enum:{
        values :["ACTIVE","CLOSED","FROZEN",],
        message:"Status must be either ACTIVE, CLOSED or FROZEN",
       
    },
     default:"ACTIVE"
    },
    currency:{
        type:String,
        required:[true,"Currency is required for creating account "],
        default:"INR"
    }
},{
    timestamps:true
})
accountSchema.index({user:1,status:1}) // it is use to create a compound index on the user and status field, isse hum account ko user ke basis pe aur status ke basis pe easily find kar sakte hai

const accountModel = mongoose.model("account",accountSchema)

module.exports = accountModel