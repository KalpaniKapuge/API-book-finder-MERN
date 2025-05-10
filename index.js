import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './src/routes/userRouter.js';
dotenv.config();

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use(
    (req,res,next) => {
        const tokenString = req.header("Authorization")
        if(tokenString != null){
            const token = tokenString.replace("Bearer ","")

            jwt.verify(token,process.env.JWT_KEY,
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


mongoose.connect(process.env.MONGODB_URL).then(
    () => {
        console.log("Connected to the database");
    }
).catch(
    () => {
        console.log("Database connection failed");
    }
);

app.use("/users",userRouter)




app.listen(3000, () => {
    console.log("Server is running on port 3000");
});



