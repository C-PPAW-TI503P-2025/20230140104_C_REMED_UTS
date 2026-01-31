const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BorrowLog = sequelize.define('BorrowLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Generic User ID from header'
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id'
    }
  },
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -90,
      max: 90
    }
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -180,
      max: 180
    }
  }
}, {
  timestamps: true,
  updatedAt: false, // Borrow log record usually doesn't change
  tableName: 'borrow_logs'
});

module.exports = BorrowLog;
