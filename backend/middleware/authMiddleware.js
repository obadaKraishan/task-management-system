const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function (roles = []) {
  // roles param can be a single role string (e.g., 'manager') or an array of roles (e.g., ['manager', 'admin'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // Authenticate JWT token and attach user to request object (req.user)
    async (req, res, next) => {
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
    },
    // Authorize based on user role
    async (req, res, next) => {
      const user = await User.findById(req.user.id);
      if (!roles.length || roles.includes(user.role)) {
        // Role is authorized
        return next();
      }
      // User is not authorized
      return res.status(403).json({ msg: 'Forbidden' });
    }
  ];
}
