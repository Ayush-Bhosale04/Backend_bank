const accountModel = require("../models/account.model")

async function createAccountController(req,res){
    const user = req.user._id // we are getting the user id from the req.user variable, which is set in the auth middleware, and we are storing it in the userId variable

    const account = await accountModel.create({user : user._id}) // we are creating a new account by passing the user id to the create method of the account model, and we are storing the created account in the account variable

    res.status(201).json({account}) // we are sending a response with status code 201 and a message and the created account
}

module.exports = {createAccountController}