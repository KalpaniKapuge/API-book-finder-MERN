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


app.use(cors({
  origin: [
    'https://api-book-finder-frontend.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error(" Database connection failed:", err));


app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use("/api/wishlist", authenticateToken, wishlistRouter);


app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
