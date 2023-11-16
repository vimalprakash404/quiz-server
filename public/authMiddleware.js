// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const secretKey = 'key';

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, secretKey);
    
    // Find the user in the database using the decoded email
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(401).send('User not found');
    }

    // Attach the user object to the request for further use
    req.user = user;
    
    next();
  } catch (err) {

    return res.status(403).json({"message" : "Invalid token", token : false});
  }
};

module.exports = authenticateToken;
