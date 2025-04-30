import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    reviewId : {
        type : String,
        required : true,
        unique : true
    },
    productId : {
        type : String,
        required : true,
        ref : "Product"
    },
    userId : {
        type : String,
        required : true,
        ref : "User"
    },
    username : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },
    comment : {
        type : String,
        required : true,
        default : Date.now
    }

})

const Review = mongoose.model("reviews", reviewSchema)

export default Review;