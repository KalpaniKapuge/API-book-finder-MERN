import express from 'express';
import { getBookById, searchBooks } from '../controllers/bookController.js';

const bookRouter = express.Router();

bookRouter.get('/search', searchBooks);
bookRouter.get('/:id', getBookById);

export default bookRouter;
