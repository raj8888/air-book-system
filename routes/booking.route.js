const express=require('express')
require('dotenv').config()
const{bookingModel}=require("../model/booking.model")
const{flightModel}=require("../model/flight.model")
const{userModel}=require("../model/user.model")
const{authenticate}=require("../middleware/authentication.middleware")


const bookingRouter=express.Router()

bookingRouter.use(authenticate)

bookingRouter.post("/",async(req,res)=>{
    try {
        let userID=req.body.userID
    let flightID=req.body.flightID
    
    let findFligh=await flightModel.findById({_id:flightID})
    let seats=findFligh.seats-1
    if(seats==0){
        res.status(201).send({"Message":"The Flight is full"})
    }else{
        await flightModel.findByIdAndUpdate({_id:flightID},{seats})
        let booking=new bookingModel({userID,flightID})
        await booking.save()
        res.status(201).send({"Message":"Successfully flight booked"})
    }
    } catch (error) {
        console.log(error.message)
        res.status(201).send({"Message":"Server Error"})  
    }
})

bookingRouter.get("/dashboard",async(req,res)=>{
    try {
      let Alldata=[]

      let allBooks=await bookingModel.find()
      for(let i=0;i<allBooks.length;i++){
        let obj={
            userData:{}
        }
        let userData=await userModel.findById({_id:allBooks[i].userID})
        let flighData=await flightModel.findById({_id:allBooks[i].flightID})
        obj["userData"]["name"]=userData.name
        obj["userData"]["email"]=userData.email
        obj.flightData=flighData
        Alldata.push(obj)
      }
      res.status(200).send({"Message":Alldata})

    } catch (error) {
        console.log(error.message)
        res.status(201).send({"Message":"Server Error"})  
    }
})

module.exports={
    bookingRouter
}