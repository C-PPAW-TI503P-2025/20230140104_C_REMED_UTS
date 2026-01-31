const express = require('express');
const router = express.Router();
const { Book } = require('../models');
const { requireAdmin } = require('../middleware/authMiddleware');

// Public: Get all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.json({
      status: 'success',
      data: books
    });
  } catch (error) {
    next(error);
  }
});

// Public: Get book by ID
router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }
    res.json({
      status: 'success',
      data: book
    });
  } catch (error) {
    next(error);
  }
});

// Admin: Add new book
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const { title, author, stock } = req.body;
    const newBook = await Book.create({ title, author, stock });
    res.status(201).json({
      status: 'success',
      message: 'Book created successfully',
      data: newBook
    });
  } catch (error) {
    next(error);
  }
});

// Admin: Update book
router.put('/:id', requireAdmin, async (req, res, next) => {
  try {
    const { title, author, stock } = req.body;
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    await book.update({ title, author, stock });
    
    res.json({
      status: 'success',
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    next(error);
  }
});

// Admin: Delete book
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    await book.destroy();
    
    res.json({
      status: 'success',
      message: 'Book deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
