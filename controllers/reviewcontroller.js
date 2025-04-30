import Review from "../models/review.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import { request, response } from "express";

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