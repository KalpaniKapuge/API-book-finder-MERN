import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import orderRouter from './routes/orderRouter.js';
import reviewRouter from './routes/reviewRouter.js';

const app = express();

app.use(bodyParser.json());

app.use(
    (req,res,next) => {
        const tokenString = req.header("Authorization")
        if(tokenString != null){
            const token = tokenString.replace("Bearer ","")

            jwt.verify(token,"cbc-batch-five#@2025",
                (err,decoded) => {
                    if(decoded != null){
                        req.user = decoded
                        next()
                    }else{
                        console.log("Invalid token")
                        res.status(403).json({
                            message : "Invalid token"
                        })
                    }
                }
            )
            
        }else{
            next()
        }
        
       
    }
)


mongoose.connect("mongodb+srv://admin:123@cluster0.bukbozs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(
    () => {
        console.log("Connected to the database");
    }
).catch(
    () => {
        console.log("Database connection failed");
    }
);


app.use("/products",productRouter)

app.use("/users",userRouter)

app.use("/orders",orderRouter)

app.use("/reviews",reviewRouter)

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
