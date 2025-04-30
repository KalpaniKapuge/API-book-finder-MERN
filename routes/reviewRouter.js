import express from "express";
import { addReview, getAllReview, getReviewById, updateReview } from "../controllers/reviewcontroller.js";

const reviewRouter = express.Router()

reviewRouter.get("/",getAllReview);
reviewRouter.get("/:reviewId",getReviewById);
reviewRouter.post("/",addReview);
reviewRouter.put("/:reviewId",updateReview)

export default reviewRouter;