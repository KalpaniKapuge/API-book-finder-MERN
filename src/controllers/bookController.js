import axios from 'axios';
import Book from '../models/book.js';


export const searchBooks = async (req, res) => {
  
  const query = req.query.query;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!query) {
    return res.status(400).json({ message: "Query is required" });
  }

  try {
    const googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10&key=${apiKey}`;

    const response = await axios.get(googleApiUrl);
    const books = response.data.items.map((item) => {
      const volume = item.volumeInfo;
      return {
        bookId: item.id,
        title: volume.title,
        authors: volume.authors,
        description: volume.description,
        thumbnail: volume.imageLinks?.thumbnail,
        categories: volume.categories,
        publishedDate: volume.publishedDate,
      };
    });

    // Optionally cache books to your DB (if not already there)
    for (const book of books) {
      await Book.updateOne(
        { bookId: book.bookId },
        { $setOnInsert: book },
        { upsert: true }
      );
    }

    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Failed to search books' });
  }
};
