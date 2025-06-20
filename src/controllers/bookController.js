import axios from 'axios';
import Book from '../models/book.js';

export const searchBooks = async (req, res) => {
  const query = req.query.query;
  const page = parseInt(req.query.page) || 1;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const maxResults = 9;
    const startIndex = (page - 1) * maxResults;

    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}&key=${apiKey}`;
    const response = await axios.get(url);

    const items = response.data.items || [];
    const totalItems = response.data.totalItems || 0; // <-- This is important

    const books = items.map((item) => {
      const volume = item.volumeInfo;
      return {
        bookId: item.id,
        title: volume.title,
        authors: volume.authors || ['Unknown'],
        description: volume.description || 'No description available.',
        thumbnail: volume.imageLinks?.thumbnail || '',
        categories: volume.categories || [],
        publishedDate: volume.publishedDate || 'Unknown',
      };
    });

    // Save to DB only if not already there
    for (const book of books) {
      await Book.updateOne(
        { bookId: book.bookId },
        { $setOnInsert: book },
        { upsert: true }
      );
    }

    res.json({
      books,
      totalBooks: totalItems,
      currentPage: page
    });
  } catch (err) {
    console.error('Google API error:', err.message);
    res.status(500).json({ message: 'Failed to search books' });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findOne({ bookId: id });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error.message);
    res.status(500).json({ message: "Failed to fetch book" });
  }
};
