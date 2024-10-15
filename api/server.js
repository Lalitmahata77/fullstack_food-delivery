import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import dbConnect from "./config/dbConnect.js";
const app = express()
 dotenv.config({path : "api/config/config.env"})

const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

import userRoute from "./route/userRoute.js"
import categoryRoute from "./route/categoryRoute.js"
app.use("/api/v2", userRoute)
app.use("/api/category", categoryRoute)
app.listen(PORT,()=>{
    dbConnect()
    console.log(`server is listening on port : ${PORT}`);
    
})