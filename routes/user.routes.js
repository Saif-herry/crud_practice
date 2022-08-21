const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const UserModel = require("../models/User.model")

const userController = express.Router();

userController.post("/register",(req,res)=>{
    const {email,password} = req.body
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            res.send("please try again later")
        }
        const user = new UserModel({
            email, 
            password:hash
        })
        await user.save()
        console.log(user)
        res.send("signup successfull")
        
        // Store hash in your password DB.
    });
})

userController.post("/login",async(req,res)=>{
    const {email,password}= req.body;
    const user = await UserModel.findOne({email})
    if(!user){
        return res.send("Invalid credential")
    }
    const hashed_password = user.password
    const userId = user._id
    bcrypt.compare(password, hashed_password, function(err, result) {
        // result == true
        if(err){
            return res.send("Invalid credential")
        }
        else if(result){
            var token = jwt.sign({email,userId}, 'secret');
            return res.send({"message":"Login successfull","token":token})
        }
    });

})

module.exports = userController