import express from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/userRouter.js'
import authenticateUser from './middlewares/authenticate.js'
import productRouter from './routes/productRouter.js'
import dotenv from 'dotenv'
import cors from 'cors'
import orderRouter from './routes/orderRouter.js'
dotenv.config()

const mongoUri = process.env.MONGO_URI

mongoose.connect(mongoUri).then(
    ()=>{
        console.log("Connected to MongoDB")
    }
).catch(
    ()=>{
        console.log("Error connecting to MongoDB")
    }
)


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