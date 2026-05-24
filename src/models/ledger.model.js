const mongoose = require("mongoose")

const ledgerSchema = new mongoose.Schema({
    account :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Ledger must be associated with an account"],
        index:true,
        immutable:true // it is use to make the account field immutable, isse hum ledger ke account ko change nahi kar sakte hai
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating ledger "],
        immutable:true
    },
    transaction:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transaction",
        required:[true,"Ledger must be associated with a transaction"],
        index:true,
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["DEBIT","CREDIT"],
            message:"Type must be either DEBIT or CREDIT"
        },
        required:[true,"Type is required for creating ledger "],
        immutable:true
    }
},{
    timestamps:true
})

function preventLedgerModification(){
    throw new Error("Ledger entries cannot be modified or deleted");
}
ledgerSchema.pre('findOneAndUpdate',preventLedgerModification),
ledgerSchema.pre('updateOne',preventLedgerModification),
ledgerSchema.pre('deleteOne',preventLedgerModification),
ledgerSchema.pre('findOneAndDelete',preventLedgerModification),
ledgerSchema.pre('deleteMany',preventLedgerModification),
ledgerSchema.pre('updateMany',preventLedgerModification),
ledgerSchema.pre('findOneAndDelete',preventLedgerModification),
ledgerSchema.pre('findOneAndReplace',preventLedgerModification)


const ledgerModel = mongoose.model("ledger",ledgerSchema)

module.exports = ledgerModel