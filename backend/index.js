import express from "express"
import dotenv from "dotenv"
const app = express();

dotenv.config({
    path: ".env",
})


app.listen(process.env.PORT || 4000,() => {
    console.log("server listening at this port : ", process.env.PORT);
}) 


app.get('/',(req,res) => {
    res.send("serveing running");
})

app.get('/login',(req,res) => {
    res.send("Hey you are on the login page");
})