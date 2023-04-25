const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/users.route")
const {flightRouter}=require("./routes/fligfht.route")
const {bookingRouter}=require("./routes/booking.route")


const app=express()
app.use(express.json())
app.use("/user",userRouter)
app.use("/flights",flightRouter)
app.use("/booking",bookingRouter)

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.listen(4500,async()=>{
try {
    await connection
    console.log("Connected to the db")
} catch (error) {
    console.log("Not Connected to the DB")
    console.log(error)
}
console.log("Listining on port 4500")
})