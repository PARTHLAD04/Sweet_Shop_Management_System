const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate user using JWT
const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ message: 'No token provided' });
    }
    // Get token from headers
    const token = req.headers.authorization.split(' ')[1];
    try {
        // Verify token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.error('Error in auth middleware:', error);
        res.status(401).send({ message: 'Unauthorized', error });
    }
};

// Function to sign JWT token
const signToken = (user) => {
    return jwt.sign(
        user,
        process.env.JWT_SECRET
    );
};

// Middleware to check for admin role
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};

module.exports = { authMiddleware, signToken, adminMiddleware };