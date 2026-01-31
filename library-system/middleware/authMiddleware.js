/**
 * Middleware to check user role and ID from headers
 */

// Check if specific headers exist and attach to request object
const checkAuth = (req, res, next) => {
  const role = req.headers['x-user-role'];
  const userId = req.headers['x-user-id'];

  req.user = {
    role: role || 'guest',
    id: userId ? parseInt(userId) : null
  };
  
  next();
};

// Middleware to require 'admin' role
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. Admin role required.'
    });
  }
  next();
};

// Middleware to require 'user' role
const requireUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied. User role required.'
    });
  }
  
  if (!req.user.id) {
    return res.status(400).json({
      status: 'error',
      message: 'User ID is required in headers (x-user-id).'
    });
  }
  
  next();
};

module.exports = {
  checkAuth,
  requireAdmin,
  requireUser
};
