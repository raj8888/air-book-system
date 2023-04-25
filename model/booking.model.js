const mongoose=require("mongoose")

const bookingSchema=mongoose.Schema({
    userID : String,
    flightID : String
})

const bookingModel=mongoose.model("bookings",bookingSchema)

module.exports={
    bookingModel
}