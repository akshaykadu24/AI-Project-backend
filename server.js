const express = require("express")
const cors = require("cors")
const userRouter = require("./routes/userRoutes")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to AI Project backend")
})

app.use("/api/user",userRouter)



app.listen(PORT,()=>{
    connectDB()
    console.log(`server is Running on Port http://localhost:${PORT}`)
})