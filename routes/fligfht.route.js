const express=require('express')
require('dotenv').config()
const{flightModel}=require("../model/flight.model")
const{authenticate}=require("../middleware/authentication.middleware")

const flightRouter=express.Router()

flightRouter.use(authenticate)

flightRouter.get("/",async(req,res)=>{
    try {
        let data= await flightModel.find()
        res.status(200).send({"AllFlights":data})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"message":"Server Error"})
    }
})

flightRouter.get("/:id",async(req,res)=>{
    try {
        let id=req.params.id
        let flightData=await flightModel.findById(id)
        res.status(200).send({"FlightData":flightData})
    } catch (error) {
        console.log(error)
        res.status(401).send({"message":"Server Error"})
    }
})

flightRouter.post("/",async(req,res)=>{
    try {
        let {airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price}=req.body
        if(airline && flightNo && departure && arrival && departureTime && arrivalTime && seats && price){
            let flight=new flightModel({airline,flightNo,departure,arrival,departureTime,arrivalTime,seats,price})
            await flight.save()
            res.status(201).send({"Message":"Successfully Flight Created"})
        }else{
            res.status(201).send({"Message":"Enter all Information"})
        }
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"message":"Server Error"})
    }
})

flightRouter.patch("/:id",async(req,res)=>{
    try {
      let id=req.params.id
      let data=req.body
      await flightModel.findByIdAndUpdate({_id:id},data)  
      res.status(204).send({"Message":"Flight Information updated successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"message":"Server Error"})
    }
})

flightRouter.delete("/:id",async(req,res)=>{
    try {
      let id=req.params.id
      await flightModel.findByIdAndDelete({_id:id})  
      res.status(202).send({"Message":"Flight Deleted Successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(401).send({"message":"Server Error"})
    }
})

module.exports={
    flightRouter
}