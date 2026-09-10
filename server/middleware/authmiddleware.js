const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // Check for Bearer token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Ensure secret exists
      const secret = process.env.JWT_SECRET || 'super_secret_jwt_key_2026';

      // Verify token
      const decoded = jwt.verify(token, secret);

      // Attach decoded user ID to request object
      req.userId = decoded.id || decoded.userId;

      return next();
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Exporting as an object allows destructuring: const { protect } = require('../middleware/authmiddleware')
module.exports = { protect };