import mongoose from "mongoose";

const wishlistSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User',
        required : true
    },
    book : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Book',
        required : true
    },
    addedAt : {
        type : Date,
        default : Date.now
    }
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

export default Wishlist;