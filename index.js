import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';

const app = express();

app.use(bodyParser.json());

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

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
