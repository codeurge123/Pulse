import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"


const app = express();

dotenv.config({
    path: ".env",
})

// async-await return promise that why .then and .catch ka through es ko resolve kar raha hai
connectDB().then(() => {
    // .on() is our listener which is provided by the express
    app.on('error',(error)=> {
        console.log(`app is facing error while connecting with db`)
        throw error
    })

    app.listen(process.env.PORT,() => {
        console.log(`Server is running at port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("MongoDB Connection failed !!! ")
})