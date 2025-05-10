import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    authors : [{
        type : String,
        required : true
    }],
    description : {
        type : String,
        required : true
    },
    bookId : {
        type : String,
        required : true,
        unique : true
    },
    thumbnail : {
        type : String,
        required : true
    },
    categories : [{
        type : String,
        required: true
    }],
    pusblishDate : {
        type : Date,
        required : true
    }
})

const Book = mongoose.model("books",bookSchema)

export default Book;