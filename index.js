import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './src/routes/userRouter.js';
import bookRouter from './src/routes/bookRouter.js';
import wishlistRouter from './src/routes/wishlistRouter.js';
import { authenticateToken } from './src/middleware/auth.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(
    () => console.log("Connected to the database")
   )
  .catch(
    (err) => console.error("Database connection failed:", err)
   );


// Public routes
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter); 

// Protected route
app.use("/api/wishlist", authenticateToken, wishlistRouter);
 

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
