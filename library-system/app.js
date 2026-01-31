const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const { checkAuth } = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());
app.use(checkAuth); // Apply auth check to all routes to populate req.user

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Library System API is running');
});

// Error Handler
app.use(errorHandler);

// Database connection and Server Start
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection establishing...');
    
    // Sync models (force: false ensures we don't drop tables in production)
    // alert: For dev, you might want force: true to reset, or alter: true to update
    await sequelize.sync({ alter: true }); 
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
