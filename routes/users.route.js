const express=require('express')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
require('dotenv').config()
const{userModel}=require("../model/user.model")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    try {
        let {name,email,password}=req.body
        let findEmail=await userModel.findOne({email})
        if(findEmail){
            res.status(201).send({"Message":"Aleready Registerd with same emailID"})
        }else{
            bcrypt.hash(password,5,async function(err, hash) {
                if(hash){
                    let user=new userModel({
                        name:name,
                        email:email,
                        password:hash
                    })
                    await user.save()
                    res.status(201).send({"Message":"Successfully registerd"})
                }else{
                    console.log(err)
                    res.status(201).send({"Message":"Server Error"})
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({"message":"Server Error"})
    }
})

userRouter.post("/login",async(req,res)=>{
   try {
    const{email,password}=req.body
    let data=await userModel.findOne({email})
    if(data){
        let hashPass=data.password
        bcrypt.compare(password,hashPass,async(err,result)=>{
            if(err){
                res.status(201).send({"message":"Please Enter valid Information"})
            }else if(result){
                let token=jwt.sign({userID:data._id},process.env.seckey)
                res.status(201).send({"message":"Please Enter valid Information","token":token})
            }else{
                res.status(201).send({"message":"Please Enter valid Information"})
            }
        })
    }else{
        res.status(201).send({"message":"Please Register First"})
    }
   } catch (error) {
    console.log(error)
    res.status(401).send({"message":"Server Error"})
   }
})

module.exports={
    userRouter
}