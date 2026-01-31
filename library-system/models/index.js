const sequelize = require('../config/database');
const Book = require('./Book');
const BorrowLog = require('./BorrowLog');

// Define associations
Book.hasMany(BorrowLog, { foreignKey: 'bookId' });
BorrowLog.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = {
  sequelize,
  Book,
  BorrowLog
};
