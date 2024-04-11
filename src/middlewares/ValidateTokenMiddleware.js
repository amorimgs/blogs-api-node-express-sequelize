const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  
  if (!tokenHeader) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  try {
    const [, token] = tokenHeader.split(' ');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };