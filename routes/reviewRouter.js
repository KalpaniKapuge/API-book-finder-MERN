import express from "express";

const reviewRouter = express.Router()

reviewRouter.post("/",createReview)

export default reviewRouter;