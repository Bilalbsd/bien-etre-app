// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};
