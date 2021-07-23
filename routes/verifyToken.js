const jwt = require('jsonwebtoken');

// Protected routes

module.exports = (req, res, next) => {
  try {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    const verified = jwt.verify(token,'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Invalid Token' });
  }
};
