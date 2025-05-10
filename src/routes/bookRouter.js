import express from 'express';
import { searchBooks } from '../controllers/bookController.js';

const bookRouter = express.Router();

bookRouter.get('/search', searchBooks);

export default bookRouter;
