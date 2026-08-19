import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import orderRouter from './routes/orderRouter.js'
import authenticateUser from './middlewares/authenticate.js'
import cors from 'cors'
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const app = express()

app.use(cors())
app.use( express.json() )
app.use(authenticateUser)

app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)
 
app.listen( 3000 ,
    ()=>{
      console.log("Server is running!")  
    }
)