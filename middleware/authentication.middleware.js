const express=require('express')
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticate=(req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1]
    if(!token){
        res.status(201).send({"message":"Please Login Again"})
    }else{
        const decoded=jwt.verify(token,process.env.seckey)
        if(decoded){
            const userID=decoded.userID
            req.body.userID=userID
            next()
        }else{
            res.status(201).send({"message":"Please Login Again"})
        }
    }
    
}

module.exports={
    authenticate
}