import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    authors: [{
         type: String, 
         required: true 
    }],
    description: {
         type: String,
         required: true 
    },
    bookId: { 
        type: String, 
        required: true,
        unique: true 
    },
    thumbnail: { 
        type: String,
        required: true
    },
    categories: [{ 
        type: String, 
        required: true 
    }],
    publishedDate: { 
        type: Date, 
        required: true
     } 
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
