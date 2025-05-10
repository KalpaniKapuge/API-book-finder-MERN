import Wishlist from "../models/wishlist.js";
import Book from "../models/book.js";

//---------------------add to wishlist---------------------------
export const addToWishlist = async (req, res) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findOne({ bookId });

    if (!book) 
        return res.status(404).json({ 
        message: 'Book not found'
     });

    const exists = await Wishlist.findOne({ 
        user: req.user.id, book: book._id
     });

    if (exists) return res.status(400).json({
         message: 'Already in wishlist' 
    });

    const saved = await Wishlist.create({ 
        user: req.user.id, book: book._id 
    });
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ 
        message: 'Error adding to wishlist' 
    });
  }
};

//---------------------get from wishlist--------------------------
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
         user: req.user.id 
        }).populate('book');
         res.json(wishlist);
  } catch (err) {
    res.status(500).json({ 
        message: 'Error getting wishlist' 
    });
  }
};

//-------------------------remove from wishlist------------------------
export const removeFromWishlist = async (req, res) => {
  try {
    const book = await Book.findOne({ 
        bookId: req.params.bookId
     });

    if (!book) return res.status(404).json({
         message: 'Book not found'
     });

    await Wishlist.findOneAndDelete({ 
        user: req.user.id, book: book._id 
    });
    res.json({
         message: 'Removed from wishlist'
     });
  } catch (err) {
    res.status(500).json({ 
        message: 'Error removing from wishlist' 
    });
  }
};