// backend/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from './src/routes/userRouter.js';
import bookRouter from './src/routes/bookRouter.js';
import wishlistRouter from './src/routes/wishlistRouter.js';
import { authenticateToken } from './src/middleware/auth.js';

dotenv.config();

const app = express();

// ✅ Updated CORS setup
app.use(cors({
  origin: 'https://api-book-finder-frontend.vercel.app',
  credentials: true,
}));

// ✅ Use express.json instead of body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection failed:", err));

// Routes
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter); 
app.use("/api/wishlist", authenticateToken, wishlistRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
