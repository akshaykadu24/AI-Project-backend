const mongoose = require("mongoose")

const connectDB =async ()=>{
try {
    await mongoose.connect(process.env.DatabaseURL)
    console.log("Connected To MongoDB Database")
} catch (error) {
    console.log(error.message)
     
}
}
module.exports = connectDB