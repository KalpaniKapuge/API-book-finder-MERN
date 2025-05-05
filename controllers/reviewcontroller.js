import Review from "../models/review.js";
import { request, response } from "express";

//get all review 
export async function getAllReview(req,res){
    try{
        const productId = request.query.productId;

        const filter = productId ? {productId : productId} : {};
        const reviews = await Review.find(filter);

        res.json(reviews);


    }catch(err){
        res.status(500).json({
            message : "Failed to fetch reviews",
            error : err.message
        })
    }
}

//single review by id
export async function getReviewById(req, res) {
    const reviewId = req.params.reviewId;

    try {
        const review = await Review.findOne({ reviewId: reviewId }); // fixed typo

        if (!review) {
            return res.status(404).json({
                message: "Review not found"
            });
        }
        res.json(review);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch review",
            error: err.message
        });
    }
}

//add review
export async function addReview(req, res) {
    try {
        const { reviewId, productId, rating, comment } = req.body;
        const userId = req.user?.userId; // ✅ get userId from token
        const username = req.user?.firstName + " " + req.user?.lastName;

        const newReview = new Review({
            reviewId: reviewId,
            productId: productId,
            userId: userId, // 🔥 Store userId
            username: username,
            rating: rating,
            comment: comment
        });

        await newReview.save();

        res.json({
            message: "Review added successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to add review",
            error: err.message
        });
    }
}

//update review
export async function updateReview(req, res) {
    const reviewId = req.params.reviewId;

    try {
        const existingReview = await Review.findOne({ reviewId: reviewId }); // 🔥 Get existing review

        if (!existingReview) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        const isSameUser = req.user && req.user.userId == existingReview.userId;

        if (!isSameUser && !isAdmin(req)) {
            return res.status(403).json({
                message: "Unauthorized access"
            });
        }

        await Review.updateOne({ reviewId: reviewId }, req.body);

        res.json({
            message: "Review updated successfully"
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update review",
            error: err.message
        });
    }
}
