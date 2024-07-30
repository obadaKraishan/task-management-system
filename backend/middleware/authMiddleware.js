const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    auth,
    async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id);
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }

        if (!roles.length || roles.includes(user.role)) {
          return next();
        }

        return res.status(403).json({ msg: 'Forbidden' });
      } catch (err) {
        console.error('Something went wrong with authorization', err);
        return res.status(500).json({ msg: 'Server error' });
      }
    }
  ];
};

module.exports = { auth, authorize };
