import Review from "../models/review.js";
import { isAdmin } from "./userController.js"; // Make sure this exists

// Get all reviews
export async function getAllReview(req, res) {
    try {
        const productId = req.query.productId;
        const filter = productId ? { productId: productId } : {};

        const reviews = await Review.find(filter);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({
            message: "Failed to fetch reviews",
            error: err.message
        });
    }
}

// Get single review by reviewId
export async function getReviewById(req, res) {
    const reviewId = req.params.reviewId;

    try {
        const review = await Review.findOne({ reviewId: reviewId });

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

// Add a new review
export async function addReview(req, res) {
    try {
        const { reviewId, productId, username, rating, comment } = req.body;

        const newReview = new Review({
            reviewId,
            productId,
            username,
            rating,
            comment
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

// Update a review
export async function updateReview(req, res) {
    const reviewId = req.params.reviewId;

    try {
        const existingReview = await Review.findOne({ reviewId });

        if (!existingReview) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        // Optionally restrict to admins only
        if (!isAdmin(req)) {
            return res.status(403).json({
                message: "Unauthorized access"
            });
        }

        await Review.updateOne({ reviewId }, req.body);

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
