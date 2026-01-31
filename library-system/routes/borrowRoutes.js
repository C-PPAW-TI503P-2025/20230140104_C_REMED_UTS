const express = require('express');
const router = express.Router();
const { Book, BorrowLog, sequelize } = require('../models');
const { requireUser } = require('../middleware/authMiddleware');

// User: Borrow book
router.post('/', requireUser, async (req, res, next) => {
  const t = await sequelize.transaction();
  
  try {
    const { bookId, latitude, longitude } = req.body;
    const userId = req.user.id;

    // Validation
    if (!bookId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: bookId, latitude, longitude'
      });
    }

    // Check book existence and stock
    const book = await Book.findByPk(bookId, { transaction: t });
    
    if (!book) {
      await t.rollback();
      return res.status(404).json({
        status: 'error',
        message: 'Book not found'
      });
    }

    if (book.stock <= 0) {
      await t.rollback();
      return res.status(400).json({
        status: 'error',
        message: 'Book is out of stock'
      });
    }

    // Decrement stock
    await book.decrement('stock', { transaction: t });

    // Login borrow transaction
    const borrowLog = await BorrowLog.create({
      userId,
      bookId,
      latitude,
      longitude
    }, { transaction: t });

    await t.commit();

    res.status(201).json({
      status: 'success',
      message: 'Book borrowed successfully',
      data: borrowLog
    });

  } catch (error) {
    await t.rollback();
    next(error);
  }
});

module.exports = router;
